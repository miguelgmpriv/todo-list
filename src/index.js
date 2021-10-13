import './styles.css';
import { newTaskButton, addTaskContainer } from './domglobals';
import { startToAddTask } from './addtask';


newTaskButton.addEventListener('click', startToAddTask)
