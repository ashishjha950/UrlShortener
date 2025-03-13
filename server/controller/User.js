import userModel from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const verifyUser=async(req,res)=>{
    const {formData} = req.body
    try{
        const {email,password} = formData
        const user = await userModel.findOne({email})
        if(!user) return res.status(404).end("Email or Password is Wrong")
            
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid) return res.status(401).end('Email or Password is Wrong') 

        let token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'})
        
        return res.cookie('token',token).status(200).json({message:'Successfully Login'})
    }
    catch(err){        
        console.error(err)
    }    
}

const addNewUser=async(req,res)=>{
    const {formData} = req.body
    try{
        const {fullName,email,password} = formData
        const duplicateEmail = await userModel.findOne({email})
        if(duplicateEmail) {return res.status(400).end('Email is already exist')}
        
        const hashedPassword = await bcrypt.hash(password,10)
        let user = await userModel.create({
            name:fullName,email,password:hashedPassword
        })

        let token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'})
        
        return res.cookie('token',token).status(200).end('New User Created')
    }
    catch(err){
        console.error(err)
    }
}

export {addNewUser,verifyUser}