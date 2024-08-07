import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useLoaderData, Link, redirect } from "react-router-dom";

export async function loader() {

    const jwt_token = Cookies.get('jwt');

    if (!jwt_token) {
        return redirect('/connection');
        // throw new Error('You have been logged out. Please proceed to connection.')
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

    if (jsonObject.message === "Unauthorized" && jsonObject.statusCode === 401) {
        return redirect('/connection');
    }

    const boards = jsonObject;

    console.log('boards :', boards);
    console.log(decoded);
    return { decoded, boards };
}

export default function MyBoardsPage() {
    const { decoded, boards } = useLoaderData();
    return (
    <>
        <h1>Welcome {decoded.username}</h1>
        {boards.map(board => (
            <>
                <p><Link to={'/' + board.boardId}>{board.title} - {board.boardId}</Link></p>
            </>
        ))}
    </>
);
}