import { makeDatalist, populateDom } from './domfunctions'
import { findNode, findParentNode, limitDates, getDetailsFromDom } from "./scripts/helpers";
import { toDoList } from "./scripts/list";

const toggleHidden = (element) => element.classList.toggle('hidden');

const hideModal = (event) => {
    const containerToHide = findParentNode(event.target, 'modal-container');
    const formToReset = findParentNode(event.target, 'modal-form');
    toggleHidden(containerToHide);
    formToReset.reset();
};

const openModal = (event) => {
    const idToOpen = event.target.value;
    const modal = document.querySelector(`#${idToOpen}`);
    const form = modal.querySelector('.modal-form');
    const close = modal.querySelector('.close');
    makeDatalist(form);
    toggleHidden(modal);
    limitDates(form);
    modal.addEventListener('submit', handleFormSubmit);
    close.addEventListener('click', hideModal);
};

const validateProjectForm = (projectForm) => {
    const title = projectForm.querySelector('#project-title');
    if (!toDoList.findProjectTitle(title.value)) return true;
    alert('No good');
    return false;
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    if (form.id === 'add-project-form') {
        if (!validateProjectForm(form)) return;
    }
    const domInfo = getDetailsFromDom(form)
    const formInfoSize = Object.keys(domInfo).length;
    hideModal(event);
    toDoList.storeInfo(domInfo, formInfoSize);
    populateDom(toDoList.getCurrentProject());
};

const toggleTaskDescription = (event) => {
    const target = event.target;
    const taskNodeList = (target.classList.contains('task') ? target.children : target.parentNode.children);
    const descriptionNode = findNode(taskNodeList, 'description');
    toggleHidden(descriptionNode);
};
const toggleCheckBox = (event) =>{
    console.log(event);

}
const setTaskListeners = (nodeList) => {
    const currentTasks = nodeList.querySelectorAll('.task');
    const newTaskButton = nodeList.querySelector('#new-task-button');
    newTaskButton.addEventListener('click', openModal);
    if (currentTasks == null) return;
    currentTasks.forEach(element => {
        element.addEventListener('click', (e) => {
            const target = e.target.classList;
            return (target.contains('check-project')) ? toggleCheckBox(e) : 
                (target.contains('material-icons-outlined')) ? deleteTask(e) : toggleTaskDescription(e);
        });
    });
};

const deleteTask = (event) => {
    const idToRemove = event.target.dataset.id
    toDoList.deleteTask(idToRemove);
    console.log(toDoList.getCopyTasks())
    populateDom(toDoList.getCurrentProject());

}

const setProjectListeners = (element) => {
    const newProjectButton = element.querySelector('.new-project');
    const allProjects = element.querySelectorAll('[data-project]');
    newProjectButton.addEventListener('click', openModal);
    allProjects.forEach(element => {
        element.addEventListener('click', handleProjectChange);
    });
};

const setTopSidebarListeners = () => {
    const inbox = document.getElementById('Inbox');
    inbox.addEventListener('click', handleProjectChange);
};

const handleProjectChange = (event) => {
    const project = event.target.dataset.project;
    toDoList.setCurrentProject(project);
    populateDom(project);

};


export { setTaskListeners, setProjectListeners, setTopSidebarListeners }