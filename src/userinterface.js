import { createTask } from './domfunctions'
import { findNode, findParentNode, limitDates } from "./scripts/helpers";

const toggleHidden = (element) => element.classList.toggle('hidden');

const hideModal = (event) => {
    const containerToClose = findParentNode(event.target, 'modal-container');
    const formToReset = findParentNode(event.target, 'modal-form');
    toggleHidden(containerToClose);
    formToReset.reset();
}

const openModal = (event) => {
    const idToOpen = event.target.value;
    const modal = document.querySelector(`#${idToOpen}`);
    const form = modal.querySelector('.modal-form');
    const close = modal.querySelector('.close');
    toggleHidden(modal);
    limitDates(form);
    modal.addEventListener('submit', handleSubmit);
    close.addEventListener('click', hideModal);
}

const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    createTask(event.target);
    hideModal(event);
}

const toggleTaskDescription = (event) => {
    const target = event.target;
    const taskNodeList = (target.classList.contains('task') ? target.children : target.parentNode.children);
    const descriptionNode = findNode(taskNodeList, 'description');
    toggleHidden(descriptionNode);
}

const setTaskListeners = (nodeList) => {
    const currentTasks = nodeList.querySelectorAll('.task');
    const newTaskButton = nodeList.querySelector('#new-task-button');
    newTaskButton.addEventListener('click', openModal);
    currentTasks.forEach(element => {
        element.addEventListener('click', toggleTaskDescription)
    });
}

const setProjectListeners = (element) => {
    const newProjectButton = element.querySelector('.new-project');
    newProjectButton.addEventListener('click', openModal)
}

export { setTaskListeners, setProjectListeners }