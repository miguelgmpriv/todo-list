import { v4 as uuidv4 } from "uuid";

const planner = () => {
    const tasks = [];
    const projects = [{title: 'Inbox', description: 'You can edit this description'}];
    let currentProject = 'Inbox';
    
    const _newTask = ({title, description, date, priority, project = `Inbox`}) => {
        if (project === '') project = 'Inbox';
        const id = uuidv4();
        return{ id, title, description, date, priority, project, }
    };

    const _newProject = ({title, description = ''}) => {
        return {
            title,
            description,
        }
    }
    const _addProjectFromTask = (title, description = '') => {
        return {
            title,
            description,
        }
    }
    const _addToTasks = (details) => {
        let { project } = details;
        if (project === '') project = 'Inbox';
        if (findProjectTitle(project) == false) projects.push(_addProjectFromTask(project));
        return tasks.push(_newTask(details));
    };

    const _addToProjects = (details) =>{
        return projects.push(_newProject(details));
    };
    const _findTaskIndexById = (idToFind) => { return tasks.findIndex(element => element.id == idToFind)};
    const storeInfo = (domInfo, size) => {
        if (size === 2){
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
    const getUserProjects = () => projects.filter((element) => {return (element.title != 'Inbox')})   
    const getAllProjectTitles = () => {
        const result = projects.reduce((arr, property) =>{
            arr.push(property.title);
            return arr;
        },[])
        return result
    }
    const filterTasksByProject = (projectTitle) => {
        const result = tasks.filter((element) => {
            return (element.project === projectTitle);
        });
        return result
    };

    const setCurrentProject = (projectTitle = 'Inbox') => {
        return currentProject = projectTitle;
    };
    const getProjectDetails = (projectTitle = 'Inbox') => {
        return projects.find(element => element.title == projectTitle)
    }
    const getCopyOfTask = (idToFind) => {
        const taskId = _findTaskIndexById(idToFind);
        return tasks[taskId];
    }
    const getCurrentProject = () => currentProject;
    const getCopyTasks = () => tasks;
    const getCopyProjects = () => projects;
    const deleteTask = (idToRemove) => { return tasks.splice(_findTaskIndexById(idToRemove), 1) }
    return {
        getCopyTasks,
        getCopyProjects,
        storeInfo,
        filterTasksByProject,
        getCurrentProject,
        setCurrentProject,
        getProjectDetails,
        getUserProjects,
        getAllProjectTitles,
        findProjectTitle,
        deleteTask,
        getCopyOfTask,
    }
}

const toDoList = planner();

export { toDoList }