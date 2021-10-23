import { setTaskListeners,setProjectListeners } from "./userinterface";
import {  } from "./scripts/list";
import { wipeContainer } from "./scripts/helpers";
import { toDoList } from "./scripts/list";

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

const populateDom = () => {
    updateTaskList();
    updateProjectList();
}

const updateTaskList = () => {
    const currentList = toDoList.getCopyTasks();
    const test = toDoList.getCopyProjects();
    console.log(currentList);
    console.log(test);
    const taskContainer = document.querySelector('.task-list');
    wipeContainer(taskContainer);
    const newButton = clone.newTaskButton();
    taskContainer.append(newButton);
    if (currentList.length !== 0){
        for (const element of currentList){
            const taskCard = makeTaskInDom(element);
            taskContainer.append(taskCard);
        };
    };
    setTaskListeners(taskContainer);
};

const updateProjectList = () => {
    const projects = toDoList.getCopyProjects();
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



export { updateTaskList, updateProjectList, populateDom }