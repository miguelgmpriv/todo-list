import './styles.css';
import { populateDom } from "./scripts/updatedom.js";
import 'material-icons/iconfont/material-icons.css';
import { toDoList } from "./scripts/list";
import { checkStorage } from "./scripts/localstorage";

checkStorage(toDoList);
populateDom('Inbox');



