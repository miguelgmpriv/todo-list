import { v4 as uuidv4 } from "uuid";

const taskList = () => {
    const tasks = [];
    const _newTask = ({title, description, priority, date, project = 'Inbox'}) => {
        const id = uuidv4();
        return{ id, title, description, priority, date, project }
    };
    const addToTasks = (details) => {
        return tasks.push(_newTask(details));
    };
    const getCopy = () => {
        return tasks;
    };
    return {
        getCopy,
        addToTasks,
    }
}

export { taskList }