import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true,"provide email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "please provide password"]
    },
    id : {  //civilId maybe?
        type : Number,
        required : [true, "please provide Id"]
    },
    role : {
        type : String,
        required : [true, "please provide a role"]
    },
})

const UserModel = mongoose.model('users', userSchema);

export default UserModel;

