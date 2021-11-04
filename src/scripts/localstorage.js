
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
        defaultTaskList(planner);
        storeToStorage(planner);    
    } else {
        pullFromStorage(planner);
    };
};

const defaultTaskList = (planner) => {
    const taskList = [
        {title: 'Feed the cat!', project: 'Inbox', description:'Cat only likes fancy feast', date: '2021-11-04', priority:'High'},
        {title: 'Click the task to see description', project: 'Inbox', description:'Here it is!', date: '2021-11-04', priority:'Low'},
        {title: 'Checking the task marks it as completed', project:'Inbox', description:'This is a completed task', date: '2021-11-04', priority: 'Normal', checked: true}
    ]
    for (const element of taskList) { planner.storeInfo(element)}
    return planner;
};

export { storeToStorage, pullFromStorage, checkStorage}