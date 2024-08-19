import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { useLoaderData, Link, redirect } from "react-router-dom";

export async function loader() {

    const jwt_token = Cookies.get('jwt');

    if (!jwt_token) {
        return redirect('/connection');
    }
    const decoded = jwtDecode(jwt_token);

    const response = await fetch("/api/boards/myboards",
    {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${jwt_token}`
        }
    });
    const jsonObject = await response.json();

    console.log('jsonObject :', jsonObject);

    if (jsonObject.message === "Unauthorized" && jsonObject.statusCode === 401) {
        return redirect('/connection');
    }

    const boardsfetched = jsonObject;
    return { decoded, boardsfetched, jwt_token };
}

export default function MyBoardsPage() {
    const { decoded, boardsfetched, jwt_token } = useLoaderData();

    let [boards, setBoards] = useState([]);

    useEffect(() => {
        setBoards(boardsfetched);
    }, []);

    let [title, setTitle] = useState('');

    async function fetchCreateBoard() {
        if (title === '') return;
        const response = await fetch('/api/boards/newboard',
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwt_token}`,
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({title})
        });
        if (response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            const body = await response.json();
            const boardId = body.boardId;
            let boardsCopy = [...boards];
            boardsCopy.push({boardId, title});
            setBoards(boardsCopy);
            setTitle('');
        }
    }

    async function fetchDeleteBoard(boardId) {
        const response = await fetch('/api/boards/deleteBoard/' + boardId,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwt_token}`,
            },
        });
        if (response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            setBoards(boards.filter((board) => board.boardId != boardId));
        }
    }

    return (
    <>
        <h1>Welcome {decoded.username}</h1>

        <div className="create-board">
            <p>To create a board, enter a title : </p>
            <input type="text" placeholder='title' onChange={e => setTitle(e.target.value)} value={title}/>
            <button onClick={fetchCreateBoard}> submit </button>
        </div>
        
        {boards.map(board => (
            <>
                <p key={board.boardId}>
                    <Link to={'/' + board.boardId} key={board.boardId}>{board.title}</Link>
                    <button onClick={async () => await fetchDeleteBoard(board.boardId)}>delete board</button>
                </p>
            </>
        ))}
    </>
);
}