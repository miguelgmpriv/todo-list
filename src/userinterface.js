import { createTask } from './domfunctions'
import { formatISO } from "date-fns";

const addTaskContainer = document.getElementById('add-task-container');
const addTaskForm = document.getElementById('add-task-form');
const tasks = () => document.querySelectorAll('.task');

const addTaskHide = () => {
    toggleHidden(addTaskContainer);
    addTaskForm.reset();
}

const toggleHidden = (element) => element.classList.toggle('hidden');

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

const setTaskListener = () => {
    const currentTasks = tasks();
    currentTasks.forEach(element => {
        element.addEventListener('click', toggleTaskDescription)
    });
}

const setAddTaskListener = () => {
    const newTaskButton = document.getElementById('new-task-button');
    newTaskButton.addEventListener('click', openAddTaskModal)
}

const setCloseTaskListener = () => {
    const addTaskClose = document.querySelector('.task-close');
    addTaskClose.addEventListener('click', addTaskHide);
}

const setNewProjectListener = () => {
    const newProjectButton = document.getElementById('new-project-button');
    newProjectButton.addEventListener('click', )
}

const openAddTaskModal = () => {
    toggleHidden(addTaskContainer);
    addTaskContainer.addEventListener('submit', handleSubmit);
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

export { setAddTaskListener, limitDates, setCloseTaskListener, setTaskListener }