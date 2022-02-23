export default function TaskCounter({taskList, incompleteTasks}) {
    return (
            <span className="todo__counter">Quedan <strong>{incompleteTasks}</strong> tareas por hacer.</span>
    )
}