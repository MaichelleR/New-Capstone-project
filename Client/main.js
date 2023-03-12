const baseURL = "http://localhost:4004"

const errMsg = document.getElementById("errMesg")
const form = document.querySelector("form")
const list = document.getElementById("ol-list")
const deleteBtn = document.getElementsByTagName("button")

let taskArr = new Array()

const getTasks = () => {
    axios.get(`${baseURL}/api/tasks`)
    .then(({ data }) => {
        taskArr = data
        displayArr()
    })
}
const submitHandler = (e) => {
    e.preventDefault()
    const userInput = document.querySelector("#userInput")
    let body = {
        taskName: userInput.value,
       isDone: false

    }
    createName(body)
    userInput.value = ""
    
}
const createName = (body) => {
    axios.post(`${baseURL}/api/tasks`, body)
        .then(({ data }) => {
            
            taskArr.push(data)
            displayArr()
        })
        
}

const deleteTask = (e, id) => {
    axios.delete(`${baseURL}/api/tasks/${id}`)
    taskArr.splice(taskArr.findIndex(e => id === e.id), 1)
    displayArr()
}
const displayArr = () => {
    list.innerHTML = ""
    console.log("display ",taskArr);
    taskArr.forEach(e => {
        list.innerHTML += makeItem(e)
    });
}
const editTask = (e,id) => {
    let index = taskArr.findIndex(e => id === e.id)
    let body 
    if (taskArr[index].isDone === false){
    body = { isDone: true }
    }else{
    body = { isDone: false }
    }
    
    axios.patch(`${baseURL}/api/tasks/${id}`, body)
    .then(({ data }) =>{
        
        taskArr[index].isDone = data.isDone
        
        displayArr()
    })
}
const makeItem = (task) => {
    let msg
    task.isDone? msg="completed":msg="not completed"
    return `
    <li>
    <p>${task.taskName} </p>
    <button onclick="deleteTask(this,${task.id})">Delete</button>
    <button onclick="editTask(this, ${task.id})">${msg}</button>
    </li>`
}
form.addEventListener('submit', submitHandler)
getTasks()