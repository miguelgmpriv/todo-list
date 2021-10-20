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

const toDoList = [];

const toDoListCopy = () => toDoList;

const addTaskInMemory = (details) => {
    return toDoList.push(task(details));
};

addTaskInMemory({'title':'Test','description':'Default task','priority':'Normal','date':'2020-10-20'})

export { addTaskInMemory, toDoListCopy }