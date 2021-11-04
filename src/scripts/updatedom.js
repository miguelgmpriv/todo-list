import { setTaskListeners, setProjectListeners, setTopSidebarListeners } from "./userinterface";
import { makeTaskInDom, makeProjectInDom, clone } from "./builddom";
import { wipeContainer } from "./helpers";
import { toDoList } from "./list";

const updateTaskList = (currentList) => {
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

const updateProjectList = () => {
    const projects = toDoList.getUserProjects();
    const sidebarDiv = document.getElementById('user-projects');
    const projectButton = clone.newProjectButton();
    wipeContainer(sidebarDiv);
    makeProjectInDom(projects, sidebarDiv);
    sidebarDiv.append(projectButton);
    setProjectListeners(sidebarDiv);
};

const editCurrentProjectDiv = (textToDisplay) => {
    const projectDiv = document.getElementById('current-user-project');
    projectDiv.firstElementChild.textContent = textToDisplay;
};

const populateDom = (valueToUse, taskList = toDoList.filterTasksByProject(valueToUse)) => {
    editCurrentProjectDiv(valueToUse);
    updateTaskList(taskList);
    updateProjectList();
    setTopSidebarListeners();
}

const deleteTask = (event) => {
    const idToRemove = event.target.dataset.id
    toDoList.deleteTask(idToRemove);
    populateDom(currentProject);
};

const deleteProject = (project) => {
    const result = window.confirm('This will delete all tasks related to this project. Click OK to continue.');
    if (result) {
        toDoList.deleteProject(project);
        populateDom('Inbox');
    };
};

export { populateDom, deleteTask, deleteProject }