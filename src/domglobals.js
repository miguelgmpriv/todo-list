const addTaskContainer = document.getElementById('add-task-container')
const newTaskButton = document.getElementById('new-task-button');
const addTaskForm = document.getElementById('add-task-form');
const taskTemplate = document.getElementById('task-template');
const stringToMatch = /^task-/;

export { newTaskButton, addTaskContainer, addTaskForm, stringToMatch, taskTemplate }