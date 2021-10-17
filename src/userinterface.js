import { createTask } from './domfunctions'

const setAddTaskListener = () => {
    const newTaskButton = document.getElementById('new-task-button');
    newTaskButton.addEventListener('click', openAddTaskModal)
}

const openAddTaskModal = () => {
    const addTaskContainer = document.getElementById('add-task-container');
    addTaskContainer.style.display = 'flex';
    addTaskContainer.addEventListener('submit', handleSubmit);
}

const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.parentNode.style.display = 'none';
    createTask(event.target);
}

export { setAddTaskListener }