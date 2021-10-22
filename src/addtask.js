import { v4 as uuidv4 } from 'uuid';

const task = ({title, description, priority, date, project = 'Inbox'}) => {
    const id = uuidv4();
    return {
        id,
        title,
        description,
        date,
        priority,
        project,
    }
}
const project = ({title, description}) => {
    return {
        title,
        description,
    }
}
const toDoList = [];

const projects = [];
/* const toDoList = (() => {
    const list = [];
    const getCopy = () => list;
    const addTask = (details) => list.push(task(details))
})() */
const toDoListCopy = () => toDoList;

const projectsCopy = () => projects;

const addTaskInMemory = (details) => {
    return toDoList.push(task(details));
};

const addProjectInMemory = (details) => {
    return projects.push(project(details));
}

addTaskInMemory({'title':'Test','description':'Default task','priority':'Normal','date':'2020-10-20'})

export { addTaskInMemory, toDoListCopy, addProjectInMemory, projectsCopy }