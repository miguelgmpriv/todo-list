import { addTaskInMemory,toDoListCopy } from "./addtask";
import { setTaskListener } from "./userinterface";

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
})();
const createTask = (domInfo) => {
    const taskDetails = getDetailsFromDom(domInfo);
    addTaskInMemory(taskDetails);
    updateTaskList();
};
const updateTaskList = () => {
    const toDoList = toDoListCopy();
    const taskContainer = document.querySelector('.task-list');
    for (const element of toDoList){
        const taskCard = makeTaskInDom(element);
        taskContainer.append(taskCard);
    }
    setTaskListener();
};
const makeCheckBox = (id) => {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.name = `${id}`;
    checkBox.id = `${id}`;
    return checkBox;

};
const makeTaskInDom = (taskDetails) => {
    const mainDetails = taskDetailsForDom(taskDetails);
    const taskDiv = createClone();
    const checkBox = makeCheckBox(taskDetails['id']);
    taskDiv.append(checkBox);
    for (const key in mainDetails) {
        const container = document.createElement('p');
        container.classList.add(key);
        container.textContent = mainDetails[key];
        taskDiv.append(container);
    }
    return taskDiv;    
};
const taskDetailsForDom = (details) => {
    const {title, description, priority, date} = details;
    return {title, description, priority, date}
};
const getDetailsFromDom = (inputInfo) => {
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











export { createTask }