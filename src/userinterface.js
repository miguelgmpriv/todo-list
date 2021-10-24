import { populateDom } from './domfunctions'
import { findNode, findParentNode, limitDates, getDetailsFromDom } from "./scripts/helpers";
import { toDoList } from "./scripts/list";

const toggleHidden = (element) => element.classList.toggle('hidden');

const hideModal = (event) => {
    const containerToHide = findParentNode(event.target, 'modal-container');
    const formToReset = findParentNode(event.target, 'modal-form');
    toggleHidden(containerToHide);
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
    const domInfo = getDetailsFromDom(event.target)
    const formInfoSize = Object.keys(domInfo).length;
    hideModal(event);
    toDoList.storeInfo(domInfo, formInfoSize);
    populateDom(toDoList.getCurrentProject());
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
    if (currentTasks == null) return;
    currentTasks.forEach(element => {
        element.addEventListener('click', toggleTaskDescription)
    });
}

const setProjectListeners = (element) => {
    const newProjectButton = element.querySelector('.new-project');
    const allProjects = element.querySelectorAll('[data-project]');
    newProjectButton.addEventListener('click', openModal);
    allProjects.forEach(element => {
        element.addEventListener('click', handleProjectChange);
    });
}

const handleProjectChange = (event) => {
    const project = event.target.dataset.project;
    populateDom(project);

}


export { setTaskListeners, setProjectListeners }