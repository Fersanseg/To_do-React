import { useReducer } from "react"
import './TaskList.css';
import TaskListItem from "./TaskListItem";

export default function TaskList({taskList, taskDispatch}) {

    const initialFilter = {filter: ""}

    const filterReducer = (state, action) => {
        switch(action.type) {
            case "SHOW_ALL":
                return {initialFilter}
            case "SHOW_ACTIVE":
                return {filter: "active"}
            case "SHOW_COMPLETE":
                return {filter: "complete"}
            default:
                throw new Error("Error botones");
        }
    }

    const [filterState, filterDispatch] = useReducer(
        filterReducer,
        initialFilter
    )

    function changeTaskDone(e) {
        if(e.target.parentNode.classList.contains("complete")) {
            e.target.parentNode.classList.replace("complete", "incomplete")
            taskDispatch({
                type: "TASK_INCOMPLETE",
                payload: {
                    id: Number(e.target.id),
                    completed: false
                }
            })
        } else if (e.target.parentNode.classList.contains("incomplete")){
            e.target.parentNode.classList.replace("incomplete", "complete")
            taskDispatch({
                type: "TASK_COMPLETE",
                payload: {
                    id: Number(e.target.id),
                    completed: true
                }
            })
        }    
    }

    function deleteTask(taskId) {
        taskDispatch({
            type: "TASK_DELETE",
            payload: taskId
        })
    }
    

    return (
        <>
            <ul className="todo__taskList" id={"taskList"}>
                {taskList.map(task => {
                    switch(filterState.filter) {
                        case "active":
                            if(!task.completed) {
                                return (
                                    <TaskListItem 
                                        id={task.id}
                                        name={task.name}
                                        liClass="incomplete"
                                        deleteTask={deleteTask}
                                        changeTaskDone={changeTaskDone}
                                    />
                                )
                            } else {
                                return null
                            }
                        case "complete":
                            if(task.completed) {
                                return (
                                    <TaskListItem 
                                        id={task.id}
                                        name={task.name}
                                        liClass="complete"
                                        deleteTask={deleteTask}
                                        changeTaskDone={changeTaskDone}
                                    />
                                )
                            } else {
                                return null
                            } 
                        default:
                            return (
                                <TaskListItem 
                                        id={task.id}
                                        name={task.name}
                                        liClass={task.completed ? "complete" : "incomplete"}
                                        deleteTask={deleteTask}
                                        changeTaskDone={changeTaskDone}
                                    />
                            )
                    }
                })}
            </ul>
            <div className="todo__modeButtons">
                <button onClick={() => filterDispatch({type: "SHOW_ALL"})}>All</button>
                <button onClick={() => filterDispatch({type: "SHOW_ACTIVE"})}>Active</button>
                <button onClick={() => filterDispatch({type: "SHOW_COMPLETE"})}>Completed</button>
            </div>
            <br />
            <button className="todo__closeAll" onClick={() => taskDispatch({type: "TASK_DELETE_ALL_COMPLETED"})}>Clear completed tasks</button>
        </>
    )
}