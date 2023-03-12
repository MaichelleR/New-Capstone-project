const express = require("express");
const cors = require("cors");
const TASKS = require("./{} db.json" );
const { response } = require("express");
let globalId = 3

const PORT = 4004;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/tasks', (req, res) => {
    res.status(200).send(TASKS)
})

 app.get('/api/tasks/:id', (req, res) => { 
    let index = TASKS.findIndex(elem => elem.id === +req.params.id)
    if(index === -1) {
        res.status(404).send("Tasks doesn't exist")
    }
    res.status(200).send(TASKS[index])
})
app.post('/api/tasks',(req, res) => {
    let task = req.body 
    if (!task || !task.taskName){
    res.status(400).send("invalid task name")  
    }else{
    res.status(200).send(createTask(task))  
    }
    
}
)
app.put('/api/tasks/:id', (req, res) => {
    const task = req.body
    let index = TASKS.findIndex(elem => elem.id === +req.params.id)
    if(index === -1){
        res.status(404).send("Task doesnt exist")
    }
    if(task.id !== +req.params.id) {
        res.status(400).send("Id mismatch")
    }
    if(!task.taskName){
        res.status(400).send("Incomplete data")
    }
   TASKS.splice(index, 1)
    TASKS.push(task)
    res.status(200).send(task)
})
app.patch(`/api/tasks/:id`, (req, res) => {
    const task = req.body
    let index = TASKS.findIndex(elem => elem.id === +req.params.id)
    if(index === -1){
        
        res.status(404).send("Task doesnt exist")
        return 
    }else if(task.isDone === undefined || task.isDone === null){
        res.status(400).send("task.isDone is required")
        return 
    }else{
    console.log(TASKS[index])  
    TASKS[index].isDone = task.isDone
    console.log(TASKS[index]);
    res.status(200).send(TASKS[index]) 
    }

     
    }
   
)
app.delete(`/api/tasks/:id`, (req, res) => {
    let index = TASKS.findIndex(elem => elem.id === +req.params.id)
   TASKS.splice(index, 1)
    res.status(200).send(TASKS)
})

function createTask(body){
    
    const task  = {
        id: globalId,
        taskName: body.taskName,
        isDone: false
    }
    
    TASKS.push(task)
    globalId++
    return task 
}
app.listen(PORT, () => {
    console.log(`we are live....${PORT}`);
})


