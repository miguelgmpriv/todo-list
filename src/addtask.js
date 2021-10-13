import { addTaskContainer, addTaskForm } from "./domglobals";

const changeDisplay = () => {

};

const startToAddTask = () => {
    addTaskContainer.showModal();
    addTaskForm.addEventListener('submit', (e)=>{console.log(e)} )
}

export { startToAddTask }