const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const tasks = [];

function welcomeScreen(){
    console.log("\n Welcome to Todo CLI! \n --------------------");
    mainScreen();
}

function mainScreen(){

    rl.question(
        "\n (v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n >", 
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
            console.log("See you soon! 😄 ");
            rl.close();
        }
        else{
            console.log("\n Sorry I did not understand. Please try again.")
            mainScreen();
        }
    })
}

function addTask(){
    rl.question(
        "\n What? \n >",
        function (answer){
            tasks.push({ task : answer , status:  "[   ]"});
            mainScreen();
        }
    )
}

function showTasks(){
    if(tasks.length > 0){
        console.log(" ");
        tasks.forEach(element => {
            console.log(`${tasks.indexOf(element)} ${element.status} ${element.task}` );
        });
    }
    else{
        console.log("\n List is empty...");
    }
    mainScreen();
}

function deleteTask(answer){
    if(tasks.length > 0){
    taskNo = parseInt(answer.charAt(1));
    console.log(`Deleted: ${tasks[taskNo].task}`)
    tasks.splice(taskNo, 1);
    }
    else{
        console.log("\n No tasks to delete");
    }
    mainScreen();
}

function completeTask(answer){
    taskNo = parseInt(answer.charAt(1));
    tasks[taskNo].status = "[ ✓ ]";
    console.log(`\n Completed: ${tasks[taskNo].task}`);
    mainScreen();
}

welcomeScreen();

