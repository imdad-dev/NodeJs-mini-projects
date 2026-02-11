const URL = require("../models/url.model.js");
const shortid = require("shortid");


const GenerateShortURL = async (req , res)=>{
    const body = req.body; 

    if(!body.url) {
      return  res.status(400).send("URL is required");
    }

const shortId = shortid.generate();

await URL.create({
    shortId : shortId , 
    redirectURL : body.url , 
    visitHistory : [] ,
    createdBy : req.user?._id 
})

return res.status(200).redirect("home");

}


module.exports = { GenerateShortURL }