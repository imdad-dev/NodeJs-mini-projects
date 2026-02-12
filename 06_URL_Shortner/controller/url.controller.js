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

return res.status(200).render("home" , {shortId : shortId} );

}


const redirectNewURL = async(req , res)=>{
    const shortId = req.params?.shortId;

    const entry = await URL.findOneAndUpdate( {
           shortId , 
           } ,
    {
    $push : {
        visitHistory : { timestamp : Date.now() }
    }
   })
//    console.log(entry);

if(!entry || !entry.redirectURL){
    return res.status(404).send("Url Not Found!");
}

return res.status(200).redirect(entry.redirectURL);

}

const handleAnalyticesURL = async(req , res)=>{

    const shortId = req.params?.id;

    const urlResult = await URL.findOne(shortId);

    if(!urlResult) {
        return res.status(404).send("No url generate");
    }

    // console.log(urlResult);
    return res.status(200).json({
        totalClick : urlResult.visitHistory.length ,
        visitHistory : urlResult.visitHistory ,
    });
}

module.exports = { GenerateShortURL ,redirectNewURL ,handleAnalyticesURL }