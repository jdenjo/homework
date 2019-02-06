const readline = require("readline");
// use the node core "readline" to interact directly 
// with the terminal

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let tasks = [];

function welcomeScreen(){

    console.log("\n Welcome to Todo CLI! \n" +
    "--------------------");
    mainScreen();
}

function mainScreen(){

    rl.question(
        "(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n >", 
        function (answer){
        if (answer === "v"){
            showTasks();
        }
        else if (answer === "n"){
            addTask();
        }
        else if (answer.includes("c")){
            completeTask(answer);
        }
        else if (answer.includes("d")){
            deleteTask(answer);
        }
        else if (answer === "q"){
            console.log("you answered q");
            rl.close();
        }
        else{
            console.log("Sorry I did not understand your input. Please try again.")
            mainScreen();
        }
    })
}

function addTask(){
    rl.question(
        "What? \n >",
        function (answer){
            tasks.push({ task : answer , status:  "[   ]"});
            mainScreen();
        }
    )
}

function showTasks(){

    if(tasks.length > 0){
        tasks.forEach(element => {
            console.log(`${tasks.indexOf(element)} ${element.status} ${element.task}` );
        });
    }
    else{
        console.log("no tasks at the moment");
    }
    mainScreen();
}

function deleteTask(answer){

    if(tasks.length > 0){
    taskNo = parseInt(answer.charAt(1));
    console.log(`Deleted task: ${tasks[taskNo].task}`)
    tasks.splice(taskNo, 1);
    }
    else{
        console.log("No tasks to delete");
    }
    
    mainScreen();
}

function completeTask(answer){
    taskNo = parseInt(answer.charAt(1));
    tasks[taskNo].status = "[ ✓ ]";
    console.log(`Completed task: ${tasks[taskNo].task}`);
    mainScreen();
}

//start it out
welcomeScreen();

