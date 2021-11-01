import { makeDatalist, populateDom } from './domfunctions'
import { findNode, findParentNode, limitDates, getDetailsFromDom } from "./scripts/helpers";
import { toDoList } from "./scripts/list";

const toggleHidden = (element) => element.classList.toggle('hidden');

const hideModal = (event) => {
    const containerToHide = findParentNode(event.target, 'modal-container');
    const formToReset = findParentNode(event.target, 'modal-form');
    toggleHidden(containerToHide);
    formToReset.reset();
};

const openModal = (event) => {
    const idToOpen = event.target.dataset.target;
    const idOfTask = event.target.dataset.id;
    const modal = document.querySelector(`#${idToOpen}`);
    const form = modal.querySelector('.modal-form');
    const close = modal.querySelector('.close');
    limitDates(form);
    makeDatalist(form);
    if (idToOpen === 'edit-task-container') editTaskModal(idOfTask, form);
    toggleHidden(modal);
    modal.addEventListener('submit', handleFormSubmit);
    close.addEventListener('click', hideModal);
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

const validateProjectForm = (projectForm) => {
    const title = projectForm.querySelector('#project-title');
    if (!toDoList.findProjectTitle(title.value)) return true;
    alert('No good');
    return false;
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    const domInfo = getDetailsFromDom(form)
    if (form.id === 'add-project-form') {
        if (!validateProjectForm(form)) return;
        toDoList.storeInfo(domInfo);
    } else if (form.id === 'edit-task-form'){
        editTask(event);
    } else if (form.id === 'add-task-form'){
        toDoList.storeInfo(domInfo);
    }
    hideModal(event);
    populateDom(toDoList.getCurrentProject());
};

const toggleTaskDescription = (event) => {
    const target = event.target;
    const taskNodeList = (target.classList.contains('task') ? target.children : target.parentNode.children);
    const descriptionNode = findNode(taskNodeList, 'description');
    toggleHidden(descriptionNode);
};
const toggleCheckBox = (event) =>{
    console.log(event);

}
const editTask = (event) =>{
    const idToEdit = event.target.dataset.id;
    const domInfo = getDetailsFromDom(event.target);
    toDoList.editTask(idToEdit, domInfo);
};

const deleteTask = (event) => {
    const idToRemove = event.target.dataset.id
    toDoList.deleteTask(idToRemove);
    console.log(toDoList.getCopyTasks())
    populateDom(toDoList.getCurrentProject());
}
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

const handleProjectChange = (event) => {
    const project = event.target.dataset.project;
    toDoList.setCurrentProject(project);
    populateDom(project);

};

const setProjectListeners = (element) => {
    const newProjectButton = element.querySelector('.new-project');
    const allProjects = element.querySelectorAll('[data-project]');
    newProjectButton.addEventListener('click', openModal);
    if (allProjects == null) return;
    allProjects.forEach(element => {
        element.addEventListener('click', handleProjectChange);
    });
};

const setTopSidebarListeners = () => {
    const inbox = document.getElementById('Inbox');
    inbox.addEventListener('click', handleProjectChange);
};

export { setTaskListeners, setProjectListeners, setTopSidebarListeners }