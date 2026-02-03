const fs = require("fs");
const filePath = "./task.json";


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
 
if(id >0 && id <= tasks.length){
    // remove item 
    const removeTask =tasks.splice(id-1,1)[0];
    saveTasks(tasks);
    console.log("Removed Task: " ,removeTask);
} else {
    console.log("tasks Not Found in this Id: " ,id)
}
 
}

 /* ===========check TASKS ============ */

 function checkTask(id){

    const tasks = loadTasks();

    if(id>0 && id<= tasks.length){
    
        tasks[id-1].done= true; 
    saveTasks(tasks);
console.log(`✅ Task ${id} marked as DONE`);
} else {
    console.log("tasks Not Found in this Id: " ,id)
}
 }

  /* ===========unCheck TASKS ============ */

 function unCheckTask(id){

    const tasks = loadTasks();

    if(id>0 && id<= tasks.length){
    
        tasks[id-1].done= false; 
    saveTasks(tasks);
console.log(`✅ Task ${id} uncheck successfully`);
} else {
    console.log("tasks Not Found in this Id: " ,id)
}
 }



 // -----clear All the Task -------//

 function clearTask(){
 
    saveTasks([]);
    console.log("clear all the task");
 }

 
 function  updateTask(id , newTask){
 const tasks = loadTasks();
  console.log(tasks)

 console.log(id , newTask)
 console.log(typeof newTask)

 if(id > 0 && id <= tasks.length ){
      console.log(tasks)
    const  idx= id-1; 
    tasks[id-1].task = newTask; 
    console.log(tasks)
    saveTasks(tasks);
   console.log(`Updated Task successfully! New value: ${newTask}`);
    } else {
        
        console.log("Error: Task ID not found.");
    }
 }

const command = process.argv[2];  // first argument 
const argument = process.argv[3];  // second argument 
const newTaskUpdate = process.argv[4] // 3rd agr--> update 

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
                checkTask(parseInt(argument));
                break; 
            }  
       case 'unCheck':
        case "not-done" : {
                unCheckTask(parseInt(argument));
                break; 
            }  
    
            case 'update' :
                case 'edit' : {
                   updateTask((parseInt(argument)) , newTaskUpdate);
                   break;
            }      


          case 'remove' :
            case 'rm' :
             case 'delete': {
                removedTask(parseInt(argument));
                break;
             }     

                
            case 'clear' :
             case 'clr': {
                clearTask();
                break;
             }     
  

             default : {
                console.log( `
                    
  📋  Todo CLI ::

  Commands:

    todo list or ls        →  list all tasks
    todo add <task>        →  add new task
    todo done <number>     →  toggle done
    todo rm <number>       →  delete task
    todo clear --yes       →  delete everything

  Examples:
    todo add Finish report
    todo done 2

    todo rm 1
    
    `);
             }
    }