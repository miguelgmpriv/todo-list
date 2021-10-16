import { createTask } from "./addtask";

const addTaskForm = document.getElementById('add-task-form');

const createClone = () => {
    const taskTemplate = document.getElementById('task-template');
    return taskTemplate.content.firstElementChild.cloneNode(true)
};

const match = (() => {
    const stringToMatch = /^task-/;
    const lookFor = (attribute) => {return stringToMatch.test(attribute)};
    const removeFrom = (attribute) => {return attribute.replace(stringToMatch, '')};
    return {
        lookFor,
        removeFrom,
    };
})()

const setButtonListener = () => {
    const newTaskButton = document.getElementById('new-task-button');
    newTaskButton.addEventListener('click', openAddTask)
}

const openAddTask = () => {
    const addTaskContainer = document.getElementById('add-task-container')
    addTaskContainer.style.display = 'flex';
    addTaskContainer.addEventListener('submit', submit);
}

const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.parentNode.style.display = 'none';
}

const submit = (event) => {
    handleSubmit(event);
    const taskDetails = getTaskInfo(event.target);
    createTask(taskDetails);
    addTasksToDom(toDoList);
}

const getTaskInfo = (inputInfo) => {
    const infoArray = Array.from(inputInfo);
    const taskObject = infoArray.reduce((keys, currentValue) =>{
        const id = currentValue.id;
        const value = currentValue.value;
        const found = match.lookFor(id);
        if(found) keys[match.removeFrom(id)] = value;
        return keys;
    }, {});
    return taskObject;
}











export { setButtonListener }