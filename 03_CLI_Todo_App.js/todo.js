const fs = require("fs");
const filePath = "./tasks.json";


const loadTasks = ()=>{
    try {
       const dataBuffer = fs.readFileSync(filePath);
       const dataJSON = dataBuffer.toString();
       return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
};

const saveTasks = (tasks)=>{
    const dataJSON =  JSON.stringify(tasks);
    fs.writeFileSync(filePath ,dataJSON);
}

/* ===========ADD ============ */
const addTask =(task)=>{
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log(task,"Task added : Succesfully");
}

/* ===========LIST TASKS ============ */
function listTask (){
    const tasks = loadTasks();

    if (!tasks.length) {
        console.log("📪  Your task list is empty!");
        return;
    }

    console.log("Your 📋 Tasks:");
    tasks.forEach((item ,index) => {
   console.log(`${index+1}. ${item.task}`)        
    });
}

/* ===========Remove TASKS ============ */
function removedTask(id){

    const tasks = loadTasks();
 
  
 
if(id>0 && id<= tasks.length){
    // remove item 
    const removeTask =tasks.splice(id-1,1)[0];
    saveTasks(tasks);
    console.log("Removed Task: " ,removeTask);
} else {
    console.log("tasks Not Found in this Id: " ,id)
}
 
}

const command = process.argv[2];  // first argument 
const argument = process.argv[3];  // second argument 

// use swithc case instand of if-else 
    switch(command){

        case 'add' : 
                  addTask(argument);
                  break; 

      case 'list':        
       case 'ls' :{ listTask();
                  break;
                }

       case 'check':
        case "done" : {
                checkTask(argument);
                break; 
            }  
    
            case 'update' : {
                   updateTask(argument);
            }      


          case 'remove' :
            case 'rm' :
             case 'delete': {
                removedTask(parseInt(argument));
                break;
             }     

             default : {
                console.log("help , write all the command help Later");
             }
    }