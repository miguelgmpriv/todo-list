import { createTask } from './domfunctions'
import { formatISO } from "date-fns";

const setAddTaskListener = () => {
    const newTaskButton = document.getElementById('new-task-button');
    newTaskButton.addEventListener('click', openAddTaskModal)
}

const setNewProjectListener = () => {
    const newProjectButton = document.getElementById('new-project-button');
    newProjectButton.addEventListener('click', )
}

const openAddTaskModal = () => {
    const addTaskContainer = document.getElementById('add-task-container');
    addTaskContainer.classList.toggle('center-modal');
    addTaskContainer.addEventListener('submit', handleSubmit);
}

const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.parentNode.classList.toggle('center-modal');
    createTask(event.target);
}

const limitDates = () => {
    const today = formatISO(new Date(), { representation: 'date' });
    const addTaskMinDate = document.getElementById('task-date');
    addTaskMinDate.setAttribute('min', today);
}

export { setAddTaskListener, limitDates }