
import multer from "multer"
import path from "path"

// use multer for file Uploading 

const storage = multer.diskStorage( {
    destination : function (req , file , cb){
        cb (null , path.resolve("./public/uploads/"));
    } ,

    filename : function (req , file ,cb)  {
const fileName = `${Date.now()}-${file.originalname}`;
console.log(file);
        cb (null , fileName)
    }
})

const upload = multer ({ storage :storage 

})

export default upload;