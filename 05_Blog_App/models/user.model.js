import mongoose from "mongoose";
import crypto from "crypto"
import { createTokenForUser } from "../utils/auth.util.js"

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


userSchema.pre("save" , async function (){
    const user = this;
if(!user.isModified("password")) return ; 
const salt = crypto.randomBytes(16).toString();
const hashedPassword = crypto
                .createHmac("sha256" ,salt)
                .update(user.password)
                .digest("hex");

     user.salt = salt;
     this.password = hashedPassword;           
});

// static function --> match password and create token 

userSchema.static("matchPasswordAndGenerateToken" , async function (email , password){
    
const user = await this.findOne({email});

if(!user) {
    throw new Error("User Not Found !");
}

const salt = user.salt; 

// console.log("current Salt : " , salt)

const hashedPassword = user.password ; 

const userProvideHashedPassword = crypto
.createHmac("sha256" ,salt)
.update(password)
.digest("hex");

if ( ! userProvideHashedPassword === hashedPassword) {
     throw new Error ("Incorrect password")
}

const token =createTokenForUser(user);
return token; 


} )


const  User = mongoose.model("user" , userSchema);

export  default User; 