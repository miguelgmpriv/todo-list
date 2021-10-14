import { addTaskContainer, addTaskForm, matchTaskString } from "./domglobals";



const startToAddTask = () => {
    addTaskContainer.style.display = 'flex';
    addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        getTaskInfo(e.target);
    }); 
}

const getTaskInfo = (inputInfo) => {
    const infoArray = Array.from(inputInfo);
    const test = infoArray.reduce((taskObject, currentValue) =>{
        const result = matchTaskString.test(currentValue.id);
        if(result) taskObject[currentValue.id] = currentValue.value;
        console.log(taskObject);
        return taskObject;
    }, {})
    console.log(test);
    console.log(infoArray);
}


export { startToAddTask }