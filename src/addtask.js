import { v4 as uuidv4 } from 'uuid';

const toDoList = [];

const toDoListCopy = () => toDoList;

const addTaskInMemory = (details) => {
    return toDoList.push(task(details));
};

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

export { addTaskInMemory, toDoListCopy }