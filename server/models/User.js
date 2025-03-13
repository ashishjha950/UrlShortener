import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    url:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'URLmodel',
        }
    ],
},{timestamps:true})

const userModel = mongoose.model('user',userSchema)

export default userModel