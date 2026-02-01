const fs = require("fs");
const filePath = require("./task.json");

const loadTaks = ()=>{
    try {
       const dataBuffer = fs.readFileSync(filePath);
       const dataJSON = dataBuffer.toString();
       return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
};


const command = process.argv[2];
const argument = process.argv[3]