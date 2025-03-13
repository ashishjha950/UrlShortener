import mongoose from 'mongoose'

const URLShortnerSchema = new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[{
        timeStamp:{
            type:Number,
        }
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
},{timestamps:true}
)

const ShortUrlModel = mongoose.model('URLmodel',URLShortnerSchema)

export default ShortUrlModel