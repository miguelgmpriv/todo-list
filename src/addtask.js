import { addTaskContainer, addTaskForm, stringToMatch, taskTemplate } from "./domglobals";
import { v4 as uuidv4 } from 'uuid';

const toDoList = [];

const openAddTask = () => {
    addTaskContainer.style.display = 'flex';
    addTaskContainer.addEventListener('submit', submit);
}

const submit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.target.parentNode.style.display = 'none';
    createTask(event.target);
    addTasksToDom(toDoList);
}

const match = (() => {
    const against = (attribute) => {return stringToMatch.test(attribute)};
    const remove = (attribute) => {return attribute.replace(stringToMatch, '')};
    return {
        against,
        remove,
    };
})()

const createTask = (details)=>{
    return toDoList.push(task(getTaskInfo(details)));
};

const createClone = (template) => {
    return template.content.firstElementChild.cloneNode(true)
};


const addTasksToDom = (listobject) => {
    const newTask = createClone(taskTemplate);
    console.log(listobject);
    console.log(newTask);
}
const getTaskInfo = (inputInfo) => {
    const infoArray = Array.from(inputInfo);
    const taskObject = infoArray.reduce((keys, currentValue) =>{
        const id = currentValue.id;
        const value = currentValue.value;
        const result = match.against(id);
        if(result) keys[match.remove(id)] = value;
        return keys;
    }, {});
    return taskObject;
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

export { openAddTask }