import { getNthFibonacciItemValue } from "../../actions/index";
import "./App.css";
import {SyncAction} from '../sync_actions/SyncAction'
import {AsyncAction} from '../async_actions/AsyncAction'
import { WorkerAction } from "../worker_actions/WorkerAction";



const App = () => {

  const backgroundClick = () => {

    let color = "rgb(236, 234, 230)"
    if (document.body.style.backgroundColor !== `${color}`) {
      document.body.style.backgroundColor = `${color}`;
    } else {
      document.body.style.backgroundColor = '#B4E6F4';
    }
  }

  return (
    <div>
      <h1>App</h1>
      <SyncAction/>
      <AsyncAction/>
      <WorkerAction/>
      <button onClick={backgroundClick} id="backgroundToggle">Change background</button>
    </div>
  );
};

export { App };
