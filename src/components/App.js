import { useReducer } from "react";
import InputWithLabel from "./InputWithLabel";
import TaskCounter from "./TaskCounter";
import TaskList from "./TaskList";
import './App.scss';

export default function App() {

  const initialTaskList = {
    taskList: [],
    incompleteTasks: document.getElementsByClassName("incomplete").length
  }

  const taskReducer = (state, action) => {
    switch (action.type) {
      case "TASK_ADD_NEW":
        return {
          taskList: [...state.taskList, action.payload.task],
          incompleteTasks: state.incompleteTasks + 1
        }
      case "TASK_COMPLETE":
        return {
          taskList: [...state.taskList.map(task => task.id !== action.payload.id ? task : {...task, completed: action.payload.completed})],
          incompleteTasks: state.incompleteTasks - 1
        }
      case "TASK_INCOMPLETE":
        return {
          taskList: [...state.taskList.map(task => task.id !== action.payload.id ? task : {...task, completed: action.payload.completed})],
          incompleteTasks: state.incompleteTasks + 1
        }
      case "TASK_DELETE":
        let isCompleted;
        state.taskList.forEach(task => {
          if(task.id === action.payload) {
            if(task.completed) {
              isCompleted = true
            } else {
              isCompleted = false
            }
          }
        });
        return {
          taskList: [...state.taskList.filter(task => task.id !== action.payload)],
          incompleteTasks: isCompleted ? state.incompleteTasks : state.incompleteTasks - 1
        }
      case "TASK_DELETE_ALL_COMPLETED":
        return {
          ...state,
          taskList: [...state.taskList.filter(task => !task.completed)]
        }
      default:
        throw new Error("Error");
    }
  }

  /*
      PARA DELETE:
      Borrar 1:
        filtrar (si el dispatch tiene el id encontrado, borrarlo (igual que en el proyecto))
      Borrar las completas:
        filtrar por estado "completed" y borrarlas igual que al borrar 1
  */
  const [taskState, taskDispatch] = useReducer(
    taskReducer,
    initialTaskList
  )

  return (
    <div className="todo">
      <InputWithLabel 
        label={"Nueva Tarea"} 
        taskDispatch={taskDispatch}
      />

      <TaskCounter 
        taskList={taskState.taskList}
        incompleteTasks={taskState.incompleteTasks}
      />
      <TaskList 
        taskList={taskState.taskList}
        incompleteTasks={taskState.incompleteTasks}
        taskDispatch={taskDispatch}
      />
    </div>
  );
}