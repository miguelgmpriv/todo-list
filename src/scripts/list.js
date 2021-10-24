import { v4 as uuidv4 } from "uuid";
import { findEntry } from "./helpers";

const planner = () => {
    const tasks = [];
    const projects = [{title: 'Inbox', description: ''}];
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
        const { project } = details;
        if (!_findProjectTitle(project)) projects.push(_addProjectFromTask(project));
        return tasks.push(_newTask(details));
    };

    const _addToProjects = (details) =>{
        return projects.push(_newProject(details));
    };

    const storeInfo = (domInfo, size) => {
        if (size === 1){
            return _addToProjects(domInfo);
        }
        return _addToTasks(domInfo);
    };

    const _findProjectTitle = (projectTitle) => {
        for (const element of projects) {
            if (element.title === projectTitle) return true
        }
        return false;
    }
    
    const getCopyTasks = () => tasks;
    const getCopyProjects = () => projects;

    return {
        getCopyTasks,
        getCopyProjects,
        storeInfo,
    }
}

const toDoList = planner();

export { toDoList }