import './styles.css';
import { newTaskButton, addTaskContainer } from './domglobals';
import { openAddTask } from './addtask';


newTaskButton.addEventListener('click', openAddTask)
