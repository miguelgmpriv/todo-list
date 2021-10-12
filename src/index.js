import './styles.css';


const addTaskContainer = document.getElementById('add-task-container')
const addTaskButton = document.getElementById('add-task-button');

const taskForm = document.getElementById('task-form');
addTask.addEventListener('click', () => {
    const taskModal = document.querySelector('template');
    const content = taskModal.content.firstElementChild.cloneNode(true);
    content.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target);
    })
    document.body.append(content);
    console.log(content.elements);
})
