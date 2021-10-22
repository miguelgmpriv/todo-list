import { addTaskInMemory,toDoListCopy, addProjectInMemory, projectsCopy } from "./addtask";
import { setTaskListeners,setProjectListeners } from "./userinterface";
import { taskList } from "./list";

const clone = (() => {
    const taskTemplate = document.getElementById('task-template').content;
    const taskContainer = () => taskTemplate.firstElementChild.cloneNode(true);
    const newTaskButton = () => taskTemplate.querySelector('#new-task-button').cloneNode(true);
    const newProjectButton = () => taskTemplate.querySelector('.new-project').cloneNode(true);
    const userProjectButton = () => taskTemplate.querySelector('.user-projects').cloneNode(true);
    return {
        newTaskButton,
        taskContainer,
        newProjectButton,
        userProjectButton,
    }
})();

const match = (() => {
    const stringToMatch = /^task-|^project-/;
    const lookFor = (attribute) => {return stringToMatch.test(attribute)};
    const removeFrom = (attribute) => {return attribute.replace(stringToMatch, '')};
    return {
        lookFor,
        removeFrom,
    };
})();

const wipeContainer = (mainNode) => {
    while (mainNode.firstElementChild){
        mainNode.removeChild(mainNode.firstElementChild);
    }
}

const createTask = (domInfo) => {
    const taskDetails = getDetailsFromDom(domInfo);
    console.log(taskDetails);
    const test = taskList();
    test.addToTasks(taskDetails)
    console.log(test.getCopy());
    addTaskInMemory(taskDetails);
    updateTaskList();
};

const createProject = (domInfo) => {
    const projectDetails = getDetailsFromDom(domInfo);
    addProjectInMemory(projectDetails);
    updateProjectList();
}

const updateTaskList = () => {
    const toDoList = toDoListCopy();
    const taskContainer = document.querySelector('.task-list');
    wipeContainer(taskContainer);
    const newButton = clone.newTaskButton();
    taskContainer.append(newButton);
    for (const element of toDoList){
        const taskCard = makeTaskInDom(element);
        taskContainer.append(taskCard);
    };
    setTaskListeners(taskContainer);
};

const updateProjectList = () => {
    const projects = projectsCopy();
    console.log(projects)
    const projectDiv = document.getElementById('user-projects');
    const projectButton = clone.newProjectButton();
    wipeContainer(projectDiv);
    projectDiv.append(projectButton);
    makeProjectInDom(projects);
    setProjectListeners(projectDiv);
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
    const taskDiv = clone.taskContainer();
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

const makeProjectInDom = (projectDetails) => {
    for (const element of projectDetails) {
        console.log(element);
    }
}

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


export { createTask, updateTaskList, updateProjectList, createProject }