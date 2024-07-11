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
    civilId : { //currently in db is: id
        type : Number,
        required : [true, "please provide Id"]
    },
    role : {
        type : String,
        required : [true, "please provide role"]
    },
})

const UserModel = mongoose.model('users', userSchema);

export default UserModel;

// יצירת מודל של מנהל
// const Manager = mongoose.model("User", {
//     email: String,
//     password: String,
//     id: String
//   });