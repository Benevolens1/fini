import { useEffect, useState } from "react";

export default function AddSubtask({socket, parentId, confirm}) {

    let [subtaskState, setSubtaskState] = useState(false);
    let [subtaskContent, setSubtaskContent] = useState("");

    useEffect(() => {
        document.querySelector("#content").focus();
    }, []);

    function onSubmit(socket, parentId, confirm, subtaskState, subtaskContent) {
        let state = subtaskState ? "done" : "todo";
        let subtask = {
            state: state,
            content: subtaskContent,
            parentId: parentId
        };
        socket.emit('createSubtask', subtask);
        console.log("subtask state sent : ", subtask.state);
        confirm();
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            onSubmit(socket, parentId, confirm, subtaskState, subtaskContent);
        }
    }

    return (<div>
    <input type="checkbox" value={subtaskState} onChange={(e) => setSubtaskState(e.target.checked)}/>
    <input id="content" type="text" value={subtaskContent} onChange={(e) => setSubtaskContent(e.target.value)} onKeyUp={handleEnter}/>
    <input type="submit" value="OK !" onClick={() => onSubmit(socket, parentId, confirm, subtaskState, subtaskContent)}/>
    </div>);
}