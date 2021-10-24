import { formatISO } from "date-fns";

const match = (() => {
    const stringToMatch = /^task-|^project-/;
    const lookFor = (attribute) => {return stringToMatch.test(attribute)};
    const removeFrom = (attribute) => {return attribute.replace(stringToMatch, '')};
    return {
        lookFor,
        removeFrom,
    };
})();

const wipeContainer = (mainNode) => {
    while (mainNode.firstElementChild){
        mainNode.removeChild(mainNode.firstElementChild);
    }
}

const findNode = (nodeList, taskClass) => {
    for (const node in nodeList) {
        if (Object.hasOwnProperty.call(nodeList, node)) {
            const element = nodeList[node];
            if (element.classList.contains(taskClass)) return element;
        }
    }
}

const findEntry = (listArray , valueToFind) => {
    const result = listArray.filter((element)=>{
        console.log(element);
        console.log(element.title);
        return element.title === valueToFind;
    })
/*     for (const [key] of Object.entries(listArray)){
        console.log(listArray[key]);
        if (listArray[key] === valueToFind) return true;
    } */
}

const findParentNode = (element, taskClass) => {
    let parent = element;
    while (!parent.classList.contains(taskClass)){
        parent = parent.parentNode;
    }
    return parent;
}

const getDetailsFromDom = (inputInfo) => {
    const infoArray = Array.from(inputInfo);
    const taskObject = infoArray.reduce((keys, currentValue) =>{
        const id = currentValue.id;
        const value = currentValue.value;
        const found = match.lookFor(id);
        if(found) keys[match.removeFrom(id)] = value;
        return keys;
    }, {});
    return taskObject;
}

const limitDates = (nodeList) => {
    const dateSelector = findNode(nodeList, 'task-date');
    if (dateSelector == null) return;
    const today = formatISO(new Date(), { representation: 'date' });
    dateSelector.setAttribute('value', today)
    dateSelector.setAttribute('min', today);
}

export { findParentNode, findNode, limitDates, wipeContainer, getDetailsFromDom, findEntry }