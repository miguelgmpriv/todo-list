import './styles.css';

const addTask = document.getElementById('add-task');

addTask.addEventListener('click', () => {
    const taskModal = document.querySelector('template');
    const content = taskModal.content.cloneNode(true);
    document.body.append(content);
})