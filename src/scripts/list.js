import { v4 as uuidv4 } from "uuid";

const planner = () => {
    const tasks = [];
    const projects = [];
    const _newTask = ({title, description, date, priority, project = `Inbox`}) => {
        const id = uuidv4();
        return{ id, title, description, date, priority, project, }
    };

    const _newProject = ({title, description}) => {
        return {
            title,
            description,
        }
    }

    const _addToTasks = (details) => {
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