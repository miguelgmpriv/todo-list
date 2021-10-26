import { setTaskListeners, setProjectListeners, setTopSidebarListeners } from "./userinterface";
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
    setTopSidebarListeners();
}

const makeCheckBox = (id) => {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.name = `${id}`;
    checkBox.id = `${id}`;
    checkBox.classList.add('check-project');
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
    const trashIcon = document.createElement('span');
    trashIcon.textContent = 'delete';
    trashIcon.classList.add('material-icons-outlined');
    trashIcon.dataset.id = taskDetails['id'];
    taskDiv.append(trashIcon);
    return taskDiv;    
};

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
};

const makeProjectInDom = (details, mainContainer) => {
    for (const key in details) {
        const container = document.createElement('button');
        container.dataset.project = details[key].title;
        container.textContent = details[key].title;
        mainContainer.append(container);
    };
};

const updateProjectList = (currentProject) => {
    editCurrentProjectDiv(currentProject);
    const projects = toDoList.getUserProjects();
    const sidebarDiv = document.getElementById('user-projects');
    const projectButton = clone.newProjectButton();
    wipeContainer(sidebarDiv);
    sidebarDiv.append(projectButton);
    makeProjectInDom(projects, sidebarDiv);
    setProjectListeners(sidebarDiv);
};

const makeDatalist = (form) => {
    const inputContainer = form.querySelector('#task-project');
    const dataList = form.querySelector('#project');
    if (inputContainer === null) return;
    wipeContainer(dataList);
    const currentProjectList = toDoList.getAllProjectTitles();
    currentProjectList.forEach((element) =>{
        const option = document.createElement('option');
        option.value = element;
        dataList.append(option)
    });
};

const taskDetailsForDom = (details) => {
    const {title, description, priority, date} = details;
    return {title, description, priority, date}
};



export { updateTaskList, updateProjectList, populateDom, makeDatalist }