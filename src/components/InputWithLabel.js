import { useState } from "react"

export default function InputWithLabel({label, taskDispatch}) {

    const [newTask, setNewTask] = useState("")
    const [currentId, setNewId] = useState(1)


    function submittedTask() {
        if(newTask) {
            document.getElementById("taskInput").value = "";
            const incompleteTasks = document.getElementsByClassName("incomplete").length
            taskDispatch({
                type: "TASK_ADD_NEW",
                payload: {
                    task: {
                        id: currentId,
                        name: newTask,
                        completed: false
                    },
                    incompleteTasks:incompleteTasks
                }
            })
            setNewId(currentId + 1)
        }
    }

    return (
        <form className="todo__form" onSubmit={e => {
            e.preventDefault()
            submittedTask()
            setNewTask("")
        }}>
            <input className="todo__form--input" id="taskInput" placeholder={label} type="text" value={newTask} onChange={event => setNewTask(event.target.value)}/>
            <input className="todo__form--button" type="submit" name="taskInput" value="Enviar" />
        </form>
    )
}