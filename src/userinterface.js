import { createTask } from './domfunctions'
import { formatISO } from "date-fns";

const addTaskContainer = document.getElementById('add-task-container');
const addTaskForm = document.getElementById('add-task-form');
const toggleHidden = (element) => element.classList.toggle('hidden');

const addTaskHide = () => {
    toggleHidden(addTaskContainer);
    addTaskForm.reset();
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

const setTaskListeners = (nodeList) => {
    const currentTasks = nodeList.querySelectorAll('.task');
    const newTaskButton = nodeList.querySelector('#new-task-button');
    newTaskButton.addEventListener('click', openAddTaskModal)
    currentTasks.forEach(element => {
        element.addEventListener('click', toggleTaskDescription)
    });
}


const setNewProjectListener = () => {
    const newProjectButton = document.getElementById('new-project-button');
    newProjectButton.addEventListener('click', )
}

const openAddTaskModal = () => {
    toggleHidden(addTaskContainer);
    const addTaskClose = document.querySelector('.task-close');
    addTaskClose.addEventListener('click', addTaskHide);
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

export { limitDates, setTaskListeners }