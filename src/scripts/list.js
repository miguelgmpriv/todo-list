import { v4 as uuidv4 } from "uuid";

const planner = () => {

    const tasks = [];
    const projects = [{title: 'Inbox'}];
    
    const _newTask = ({title, description, date, priority, project, checked = false, id = uuidv4()}) => {
        return{ id, title, description, date, priority, project, checked}
    };

    const _newProject = ({title}) => {
        return { title }
    }

    const _addToTasks = (details) => {
        return tasks.push(_newTask(details));
    };

    const _addToProjects = (details) =>{
        return projects.push(_newProject(details));
    };

    const _findTaskIndexById = (idToFind) => { return tasks.findIndex(element => element.id == idToFind)};
    const _findProjectIndexByTitle = (titleToFind) => { return projects.findIndex(element => element.title == titleToFind)};
    
    const storeInfo = (domInfo) => {
        const size = Object.keys(domInfo).length;
        if (size === 1){
            return _addToProjects(domInfo);
        }
        return _addToTasks(domInfo);
    };

    const findProjectTitle = (projectTitle) => {
        for (const element of projects) {
            if (element.title === projectTitle) return true
        }
        return false;
    };

    const editTask = (taskId, details) => {
        const taskToEdit = getCopyOfTask(taskId);
        taskToEdit.description = details.description;
        taskToEdit.date = details.date;
        taskToEdit.priority = details.priority;
        taskToEdit.project = (details.project == '') ? 'Inbox' : details.project;

    };

    const editTaskState = (taskId, checkedState) => {
        const taskToEdit = getCopyOfTask(taskId);
        taskToEdit.checked = checkedState;
    };

    const deleteProject = (projectToDelete) => {
        const projectTasks = getTasksByProject(projectToDelete)
        projectTasks.forEach(element => { deleteTask(element.id) });
        projects.splice(_findProjectIndexByTitle(projectToDelete), 1)
    };

    const deleteTask = (idToRemove) => { return tasks.splice(_findTaskIndexById(idToRemove), 1) }  
    
    const getAllProjectTitles = () => {
        const result = projects.reduce((arr, property) =>{
            arr.push(property.title);
            return arr;
        },[])
        return result
    };

    const getCopyOfTask = (idToFind) => {
        const taskId = _findTaskIndexById(idToFind);
        return tasks[taskId];
    };

    const getCopyTasks = () => tasks;
    
    const getCopyProjects = () => projects;

    const getTasksByProject = (projectTitle) => {
        const result = tasks.filter((element) => {
            return (element.project === projectTitle);
        });
        return result
    };

    const getUserProjects = () => projects.filter((element) => {return (element.title != 'Inbox')}); 

    return {
        storeInfo,
        getCopyTasks,
        getCopyProjects,
        getTasksByProject,
        getUserProjects,
        getAllProjectTitles,
        getCopyOfTask,
        findProjectTitle,
        deleteTask,
        deleteProject,
        editTask,
        editTaskState,
    }
}

const toDoList = planner();

export { toDoList, planner }