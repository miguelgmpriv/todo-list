import { addTaskContainer, addTaskForm, stringToMatch } from "./domglobals";



const openAddTask = () => {
    addTaskContainer.style.display = 'flex';
    addTaskContainer.addEventListener('submit', submit);
}

const submit = (event) => {
    event.preventDefault();
    getTaskInfo(event.target);
    event.target.parentNode.style.display = 'none';
}

const match = (() => {
    const against = (attribute) => {return stringToMatch.test(attribute)};
    const remove = (attribute) => {return attribute.replace(stringToMatch, '')};
    return {
        against,
        remove,
    };
})()


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

const createTask = ({title, description, priority, date}) => {

    
    return {
        title,
        description,
        date,
        priority,
    }
}

export { openAddTask }