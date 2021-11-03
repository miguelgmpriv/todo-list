import { setTaskListeners, setProjectListeners, setTopSidebarListeners } from "./userinterface";
import { wipeContainer } from "./scripts/helpers";
import { toDoList } from "./scripts/list";

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

const populateDom = (currentProject) => {
    updateTaskList(currentProject);
    updateProjectList(currentProject);
    setTopSidebarListeners();
}

const makeCheckBox = (id) => {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.name = `${id}`;
    checkBox.id = `${id}`;
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
    const detailsForDom = taskDetailsForDom(taskDetails);
    const taskDiv = clone.taskContainer();
    const editIcon = makeIcon('edit_note', taskId);
    const trashIcon = makeIcon('delete', taskId);
    const checkBox = makeCheckBox(taskId);
    taskDiv.append(checkBox);
    for (const key in detailsForDom) {
        const container = document.createElement('p');
        container.classList.add(key);
        container.textContent = detailsForDom[key];
        taskDiv.append(container);
    }
    taskDiv.append(editIcon);
    taskDiv.append(trashIcon);
    return taskDiv;    
};

const updateTaskList = (currentProject) => {
    const currentList = toDoList.filterTasksByProject(currentProject);
    const taskContainer = document.querySelector('.task-list');
    wipeContainer(taskContainer);
    const newButton = clone.newTaskButton();
    taskContainer.append(newButton);
    if (currentList.length !== 0){
        for (const element of currentList){
            const taskCard = makeTaskInDom(element);
            taskContainer.append(taskCard);
        };
    };
    setTaskListeners(taskContainer);
};

const editCurrentProjectDiv = (currentProject) => {
    const project = toDoList.getProjectDetails(currentProject);
    const projectDiv = document.getElementById('current-user-project');
    projectDiv.firstElementChild.textContent = project.title;
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

const updateProjectList = (currentProject) => {
    editCurrentProjectDiv(currentProject);
    const projects = toDoList.getUserProjects();
    const sidebarDiv = document.getElementById('user-projects');
    const projectButton = clone.newProjectButton();
    wipeContainer(sidebarDiv);
    makeProjectInDom(projects, sidebarDiv);
    sidebarDiv.append(projectButton);
    setProjectListeners(sidebarDiv);
};

const makeSelect = (form) => {
    const select = form.querySelector("[data-modal='select']");
    if (select == null) return;
    wipeContainer(select);
    const currentProjectList = toDoList.getAllProjectTitles();
    currentProjectList.forEach((element) =>{
        const option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        select.append(option)
    });
};

const taskDetailsForDom = (details) => {
    const {title, description, priority, date} = details;
    return {title, description, priority, date}
};



export { updateTaskList, updateProjectList, populateDom, makeSelect }