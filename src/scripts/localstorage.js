
const storeToStorage = (planner) => {
    localStorage.setItem('localTasksList', JSON.stringify(planner.getCopyTasks()));
    localStorage.setItem('localProjectList', JSON.stringify(planner.getCopyProjects()));
};

const pullFromStorage = (planner) => {
    const tasks = JSON.parse(localStorage.getItem('localTasksList'));
    const projects = JSON.parse(localStorage.getItem('localProjectList'));
    for (const element of tasks) { planner.storeInfo(element) }
    for (const element of projects) { planner.storeInfo(element) }
    return planner;
};

const checkStorage = (planner) => {
    if (!localStorage.getItem('localTasksList')){      
        storeToStorage(planner);
    } else {
        pullFromStorage(planner);
    };
};

export { storeToStorage, pullFromStorage, checkStorage}