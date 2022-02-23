export default function TaskListItem({id, name, deleteTask, changeTaskDone, liClass}) {

    return (
        <li className={liClass} key={id}>
            <span className="todo__taskList--closeButton" onClick={() => deleteTask(id)}>x</span>
            <label id={id} className="todo__taskList--task" onClick={e => changeTaskDone(e)}>
                {name}
            </label>
        </li>
    )
}