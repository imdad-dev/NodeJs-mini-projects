const { isUtf8 } = require('buffer');
const fs = require('fs');
const { throwDeprecation } = require('process');
const { PassThrough } = require('stream');

const userInfo = (fileName)=>{
    return  (req, res , next)=>{
        const logData= `\n${Date.now()} ${req.method} ${req.path}\n `
        console.log(req );

        fs.appendFile(fileName , logData , (err)=>{
           
            next(err)
        })
    }
}

module.exports = userInfo;