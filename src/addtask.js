import { v4 as uuidv4 } from 'uuid';

const toDoList = [];



const createTask = (details)=>{
    return toDoList.push(task(getTaskInfo(details)));
};

const addTasksToDom = (listobject) => {
    const newTask = createClone(taskTemplate);
    listobject.forEach(element => {
        console.log((taskDetailsForDom(element)));
    });

}

const createDomForDetails = (details) => {
    console.log(details);
    const container = document.createElement('p');
    
}

const taskDetailsForDom = (details) => {
    const {title, description, date, priority} = details;
    return {title, description, date, priority}
}



const task = ({title, description, priority, date, project = 'default'}) => {
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

export { createTask }