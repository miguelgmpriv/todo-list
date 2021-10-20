import { createTask } from './domfunctions'
import { formatISO } from "date-fns";

const addTaskContainer = document.getElementById('add-task-container');
const addTaskForm = document.getElementById('add-task-form');
const toggleHidden = (element) => element.classList.toggle('hidden');

const addTaskHide = () => {
    toggleHidden(addTaskContainer);
    addTaskForm.reset();
}

const hideForm = (event) => {
    const containerToClose = findParentNode(event.target, 'modal-container');
    const formToReset = findParentNode(event.target, 'modal-form');
    toggleHidden(containerToClose);
    formToReset.reset();
}

const toggleTaskDescription = (event) => {
    const target = event.target;
    const taskNodeList = (target.classList.contains('task') ? target.children : target.parentNode.children);
    const descriptionNode = findNode(taskNodeList, 'description');
    toggleHidden(descriptionNode);
}

const findNode = (nodeList, taskClass) => {
    for (const node in nodeList) {
        if (Object.hasOwnProperty.call(nodeList, node)) {
            const element = nodeList[node];
            if (element.classList.contains(taskClass)) return element;
        }
    }
}
const findParentNode = (element, taskClass) => {
    let parent = element;
    while (!parent.classList.contains(taskClass)){
        parent = parent.parentNode;
    }
    return parent;
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

const openModal = (event) => {
    const idToOpen = event.target.value;
    const modal = document.querySelector(`#${idToOpen}`);
    const close = modal.querySelector('.close');
    toggleHidden(modal);
    modal.addEventListener('submit', handleSubmit);
    close.addEventListener('click', hideForm);
}

const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    createTask(event.target);
    addTaskHide();
}

const limitDates = () => {
    const today = formatISO(new Date(), { representation: 'date' });
    const addTaskMinDate = document.getElementById('task-date');
    addTaskMinDate.setAttribute('value', today)
    addTaskMinDate.setAttribute('min', today);
}

export { limitDates, setTaskListeners, setProjectListeners }