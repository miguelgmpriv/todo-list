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

const findParentNode = (element, taskClass) => {
    let parent = element;
    while (!parent.classList.contains(taskClass)){
        parent = parent.parentNode;
    }
    return parent;
}

const limitDates = (nodeList) => {
    const dateSelector = findNode(nodeList, 'task-date');
    if (dateSelector == null) return;
    const today = formatISO(new Date(), { representation: 'date' });
    dateSelector.setAttribute('value', today)
    dateSelector.setAttribute('min', today);
}

export { findParentNode, findNode, limitDates, match, wipeContainer }