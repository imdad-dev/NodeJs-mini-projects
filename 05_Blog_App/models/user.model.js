import mongoose from "mongoose";
import crypto from "crypto"
const userSchema = new mongoose.Schema({
 
    fullName : {
        type : String , 
        required : true , 
    } ,

    email: {
        type : String , 
        required : true , 
        unique : true ,
    } ,

    salt : {
        type : String ,
        required : true ,
    } ,

    password : {
        type : String , 
        required : true , 
    } ,

    profileImageURL : {
        type : String , 
        default : "/images/default.svg" ,
    } ,
    role : {
        type : String , 
        enum : ["USER" , "ADMIN"] ,
        default : "USER" ,
    }
} , { timestamps : true});


mongoose.pre("save" , async function (){
    const user = this;
if(!user.isModified("password")) return ; 
const salt = crypto.randomBytes(16).toString;
const hashedPassword = crypto
                .createHmac("sha256" ,salt)
                .update(user.password)
                .digest("hex");

     this.salt = salt;
     this.password = hashedPassword;           
})

const  User = mongoose.model("user" , userSchema);

export  default User; 