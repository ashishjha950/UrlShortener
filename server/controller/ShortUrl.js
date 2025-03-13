import jwt from "jsonwebtoken";
import ShortUrlModel from "../models/ShortUrl.js";
import userModel from "../models/User.js";
import shortid from "shortid";

const getShortendUrl = async (req, res) => {
  try {
    const data = jwt.verify(req.cookies.token,process.env.JWT_SECRET)
    if(data){
      const response = await ShortUrlModel.find({createdBy:data.id})
      return res.json(response);
    }
    else{
      return res.status(401).json({message:'Unauthorized'})
    }

  } catch (error) {
    console.error("error occurred in GET request of URL");
    res.status(500).send("Server Error");
  }
}

const postShortendUrl = async (req, res) => {
  try {

    const { originalUrl } = req.body;
    if (!originalUrl.url)
      return res.status(400).json({ error: "url not found" })

    const shortID = shortid.generate()

    const data = jwt.verify(req.cookies.token,process.env.JWT_SECRET)

    const urls = await ShortUrlModel.create({
      shortID,
      redirectURL: originalUrl.url,
      visitHistory: [],
      createdBy:data.id,
    })

    let user = await userModel.findOne({_id:data.id})
    user.url.push(urls._id)
    user.save()

    res.status(200).json({message:"New URL is added to collection"})
  } 
  catch (err) {
    console.error("error occured on posting of Short Url");
  }
}

const redirectToUrl = async (req, res) => {
  try {
    let shortID = req.params.shortID
    shortID = shortID.replace(/^:/,'')
    const entry = await ShortUrlModel.findOneAndUpdate(
      { shortID },
      { $push: { visitHistory: { timeStamp: Date.now() } } },
      { new: true }
    )

    if (!entry) {
      return res.status(404).send('URL not registered');
    }

    return res.json(entry.redirectURL);
  } 
  catch (err) {
    console.error("Error occurred in redirecting to URL", err);
    res.status(500).json({ error: "An error occurred while redirecting" });
  }
}

export { getShortendUrl,redirectToUrl,postShortendUrl };
