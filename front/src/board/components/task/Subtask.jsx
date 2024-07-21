export default function Subtask({ subtask, socket, showActions }) {

    function onChangeSubtaskState(e) {
        subtask.state = e.target.checked ? "done" : "todo";
        socket.emit('updateSubtask', subtask);
    }

    function deleteSubtask() {
        socket.emit('deleteSubtask', subtask.taskId);
    }

    return (
        <li className="subtasks">
            <input type="checkbox"
                id={subtask.taskId}
                checked={subtask.state === "done"}
                onChange={onChangeSubtaskState}
            />

            {subtask.content}
            {showActions &&
                <img
                    src="/images/delete_task.ico"
                    height={12}
                    width={12}
                    alt="delete this subtask"
                    onClick={deleteSubtask}
                />
            }

        </li>
    );
}