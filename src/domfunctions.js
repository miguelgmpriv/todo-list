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

const populateDom = (currentProject) => {
    updateTaskList(currentProject);
    updateProjectList(currentProject);
}

const updateTaskList = (currentProject) => {
    const currentList = toDoList.filterTasksByProject(currentProject);
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

const editCurrentProjectDiv = (currentProject) => {
    const project = toDoList.getProjectDetails(currentProject);
    const projectDiv = document.getElementById('current-user-project');
    projectDiv.firstElementChild.textContent = project.title;
    projectDiv.lastElementChild.textContent = project.description;
}

const updateProjectList = (currentProject) => {
    editCurrentProjectDiv(currentProject);
    const projects = toDoList.getCopyProjects();
    const sidebarDiv = document.getElementById('user-projects');
    const projectButton = clone.newProjectButton();
    wipeContainer(sidebarDiv);
    sidebarDiv.append(projectButton);
    makeItemInDom(projects, sidebarDiv);
    setProjectListeners(sidebarDiv);
};

const makeCheckBox = (id) => {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.name = `${id}`;
    checkBox.id = `${id}`;
    return checkBox;
};

const makeTaskInDom = (taskDetails) => {
    const detailsForDom = taskDetailsForDom(taskDetails);
    const taskDiv = clone.taskContainer();
    const checkBox = makeCheckBox(taskDetails['id']);
    taskDiv.append(checkBox);
    for (const key in detailsForDom) {
        const container = document.createElement('p');
        container.classList.add(key);
        container.textContent = detailsForDom[key];
        taskDiv.append(container);
    }
    return taskDiv;    
};


const makeItemInDom = (details, mainContainer) => {
    for (const key in details) {
        const container = document.createElement('button');
        container.dataset.project = details[key].title;
        container.textContent = details[key].title;
        mainContainer.append(container);
    };
}
const taskDetailsForDom = (details) => {
    const {title, description, priority, date} = details;
    return {title, description, priority, date}
};



export { updateTaskList, updateProjectList, populateDom }