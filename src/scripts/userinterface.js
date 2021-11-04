import { makeSelect } from './builddom'
import { populateDom, deleteTask, deleteProject } from "./updatedom";
import { findNode, findParentNode, limitDates, getDetailsFromDom, filterByDays } from "./helpers";
import { toDoList } from "./list";
import { storeToStorage } from './localstorage';

let currentProject = 'Inbox';

const toggleHidden = (element) => element.classList.toggle('hidden');

const hideModal = (event) => {
    const containerToHide = findParentNode(event.target, 'modal-container');
    const formToReset = findParentNode(event.target, 'modal-form');
    toggleHidden(containerToHide);
    formToReset.reset();
};

const editTaskModal = (idToFind, form) => {
    const title = form.querySelector('#edit-title');
    const priority = form.querySelector('#edit-priority');
    const date = form.querySelector('#edit-date');
    const description = form.querySelector('#edit-description');
    const task = toDoList.getCopyOfTask(idToFind);
    form.dataset.id = idToFind;
    title.value = task.title;
    priority.value = task.priority;
    date.value = task.date;
    description.value = task.description;
}

const openModal = (event) => {
    const idToOpen = event.target.dataset.target;
    const idOfTask = event.target.dataset.id;
    const modal = document.querySelector(`#${idToOpen}`);
    const form = modal.querySelector('.modal-form');
    const close = modal.querySelectorAll('.close');
    modal.addEventListener('submit', handleFormSubmit);
    close.forEach(element => { element.addEventListener('click', hideModal) }); 
    limitDates(form);
    makeSelect(form);
    if (idToOpen === 'edit-task-container') editTaskModal(idOfTask, form);
    toggleHidden(modal);
};

const validateProjectForm = (projectForm) => {
    const title = projectForm.querySelector('#project-title');
    if (!toDoList.findProjectTitle(title.value)) return true;
    alert('Project already in planner!');
    return false;
};

const editTask = (event) =>{
    const idToEdit = event.target.dataset.id;
    const domInfo = getDetailsFromDom(event.target);
    toDoList.editTask(idToEdit, domInfo);
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    const domInfo = getDetailsFromDom(form)
    if (form.id === 'add-project-form') {
        if (!validateProjectForm(form)) return;
        toDoList.storeInfo(domInfo);
        currentProject = domInfo.title;
    } else if (form.id === 'edit-task-form'){
        editTask(event);
    } else if (form.id === 'add-task-form'){
        toDoList.storeInfo(domInfo);
    }
    hideModal(event);
    populateDom(currentProject);
    storeToStorage(toDoList);
};

const toggleTaskDescription = (event) => {
    const target = event.target;
    const taskNodeList = (target.classList.contains('task') ? target.children : target.parentNode.children);
    const descriptionNode = findNode(taskNodeList, 'description');
    toggleHidden(descriptionNode);
};

const toggleCheckBox = (event) =>{
    const checkedState = event.target.checked;
    const taskId = event.target.dataset.id;
    const taskDiv = findParentNode(event.target, 'task');
    taskDiv.classList.toggle('strike');
    toDoList.editTaskState(taskId, checkedState)
    storeToStorage(toDoList);
};

const handleTaskEvents = (event) => {
    const target = event.target;
    if (target.classList.contains('check-project')){
        return toggleCheckBox(event);
    } else if (target.dataset.type === 'delete'){
        return deleteTask(event);
    } else if (target.dataset.type === 'edit_note'){
        return openModal(event);
    } else {
        return toggleTaskDescription(event);
    };
};

const setTaskListeners = (nodeList) => {
    const currentTasks = nodeList.querySelectorAll('.task');
    const newTaskButton = nodeList.querySelector('#new-task-button');
    newTaskButton.addEventListener('click', openModal);
    if (currentTasks == null) return;
    currentTasks.forEach(element => {
        element.addEventListener('click', handleTaskEvents)
    });
};

const handleProjectClick = (event) => {
    const project = event.target.dataset.id;
    const type = event.target.dataset.type;
    if (type === 'delete') return deleteProject(project);
    currentProject = project;
    populateDom(currentProject);
};

const setProjectListeners = (element) => {
    const newProjectButton = element.querySelector('.new-project');
    const allProjects = element.querySelectorAll('.user-projects');
    newProjectButton.addEventListener('click', openModal);
    if (allProjects == null) return;
    allProjects.forEach(element => { element.addEventListener('click', handleProjectClick) });
};

const handleTopSidebarClick = (event) =>{
    const targetId = event.target.dataset.id;
    const taskList = toDoList.getCopyTasks();
    if (targetId === 'Inbox'){
        currentProject = 'Inbox';
        populateDom(currentProject);
    };
    if (targetId === 'Today'){
        const filteredList = filterByDays(0, taskList);
        return populateDom(targetId, filteredList);
    };
    if (targetId === 'Upcoming'){
        const filteredList = filterByDays(7, taskList);
        return populateDom(targetId, filteredList);
    } 
};

const setTopSidebarListeners = () => {
    const links = document.querySelectorAll("[data-top-sidebar]");
    links.forEach(element => { element.addEventListener('click', handleTopSidebarClick) });
};

export { setTaskListeners, setProjectListeners, setTopSidebarListeners, currentProject}