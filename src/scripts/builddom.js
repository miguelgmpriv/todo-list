import { wipeContainer } from "./helpers";
import { toDoList } from "./list";
import { currentProject } from "./userinterface";

const clone = (() => {
    const taskTemplate = document.getElementById('task-template').content;
    const taskContainer = () => taskTemplate.firstElementChild.cloneNode(true);
    const newTaskButton = () => taskTemplate.querySelector('#new-task-button').cloneNode(true);
    const newProjectButton = () => taskTemplate.querySelector('.new-project').cloneNode(true);
    const userProjectButton = () => taskTemplate.querySelector('.user-projects').cloneNode(true);
    return {
        newTaskButton,
        taskContainer,
        newProjectButton,
        userProjectButton,
    }
})();

const makeCheckBox = (id, checkedState) => {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.name = `${id}`;
    checkBox.dataset.id = `${id}`;
    checkBox.checked = checkedState;
    checkBox.classList.add('check-project');
    return checkBox;
};
const makeIcon = (name, taskId) => {
    const icon = document.createElement('span');
    icon.textContent = name;
    icon.dataset.id = taskId;
    icon.dataset.type = name;
    icon.classList.add('material-icons-outlined');
    return icon;
}
const makeTaskInDom = (taskDetails) => {
    const taskId = taskDetails['id'];
    const checkedState = taskDetails['checked'];
    const detailsForDom = taskDetailsForDom(taskDetails);
    const taskDiv = clone.taskContainer();
    const editIcon = makeIcon('edit_note', taskId);
    const trashIcon = makeIcon('delete', taskId);
    const checkBox = makeCheckBox(taskId, checkedState);
    taskDiv.append(checkBox);
    for (const key in detailsForDom) {
        const container = document.createElement('p');
        container.classList.add(key);
        container.textContent = detailsForDom[key];
        taskDiv.append(container);
    }
    editIcon.dataset.target = 'edit-task-container';
    if (checkedState) taskDiv.classList.toggle('strike');
    taskDiv.append(editIcon);
    taskDiv.append(trashIcon);
    return taskDiv;    
};

const makeProjectInDom = (details, mainContainer) => {
    for (const key in details) {
        const trashIcon = makeIcon('delete', details[key].title);
        const container = document.createElement('li');
        container.dataset.id = details[key].title;
        container.textContent = details[key].title;
        container.classList.add('user-projects');
        container.append(trashIcon);
        mainContainer.append(container);
    };
};

const makeSelect = (form) => {
    const select = form.querySelector("[data-modal='select']");
    if (select == null) return;
    wipeContainer(select);
    const currentProjectList = toDoList.getAllProjectTitles();
    currentProjectList.forEach((element) =>{
        const option = document.createElement('option');
        option.value = element;
        if (option.value === currentProject) option.selected = true;
        option.textContent = element;
        select.append(option)
    });
};

const taskDetailsForDom = (details) => {
    const {title, description, priority, date} = details;
    return {title, description, priority, date}
};



export { makeSelect, clone, makeTaskInDom, makeProjectInDom, currentProject}