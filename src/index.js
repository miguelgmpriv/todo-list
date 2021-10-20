import './styles.css';
import { limitDates } from "./userinterface";
import { updateTaskList, updateProjectList } from "./domfunctions";

updateTaskList();
limitDates();
updateProjectList();