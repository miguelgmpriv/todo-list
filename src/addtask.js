import { addTaskContainer, addTaskForm, matchTaskString } from "./domglobals";



const openAddTask = () => {
    addTaskContainer.style.display = 'flex';
    addTaskContainer.addEventListener('submit', submit);
}

const submit = (event) => {
    event.preventDefault();
    getTaskInfo(event.target);
    addTaskContainer.style.display = 'none';
}

const getTaskInfo = (inputInfo) => {
    const infoArray = Array.from(inputInfo);
    const sortedArray = infoArray.reduce((taskArray, currentValue) =>{
        const result = matchTaskString.test(currentValue.id);
        if(result) taskArray[currentValue.id.replace(matchTaskString, '')] = currentValue.value;
        return taskArray;
    }, [])
}

const createTask = (details) => {
    const title = details[`title`];
    const description = details[`description`];
    const date = details[`date`];
    const priority = details[`priority`];
    
    return {
        title,
        description,
        date,
        priority,
    }
}

export { openAddTask }