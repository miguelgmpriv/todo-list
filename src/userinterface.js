import { createTask } from './domfunctions'
import { formatISO } from "date-fns";

const addTaskContainer = document.getElementById('add-task-container');
const addTaskHide = () => addTaskContainer.style.display = 'none'
const addTaskShow = () => addTaskContainer.style.display = 'flex'

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
    addTaskShow();
    addTaskContainer.addEventListener('submit', handleSubmit);
}

const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addTaskHide();
    createTask(event.target);
}

const limitDates = () => {
    const today = formatISO(new Date(), { representation: 'date' });
    const addTaskMinDate = document.getElementById('task-date');
    addTaskMinDate.setAttribute('value', today)
    addTaskMinDate.setAttribute('min', today);
}

export { setAddTaskListener, limitDates, setCloseTaskListener }