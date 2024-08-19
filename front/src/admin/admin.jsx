import Cookies from 'js-cookie';
import { useLoaderData, redirect } from 'react-router-dom';
import './admin.css';
import DeleteForm from './deleteForm';
import ChangePasswordForm from './changePasswordForm';
import NewUserForm from './newUserForm';
import { useState } from 'react';

async function specificLoader(route, jwt_token) {
    const response = await fetch(route,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwt_token}`
            }
        });
    return response;
}

export async function loader() {

    const jwt_token = Cookies.get('jwt');
    if (!jwt_token) {
        return redirect('/connection');
    }

    const values = await Promise.all([
        specificLoader('/api/admin/totalNumberOfBoards', jwt_token).then(res => res.json()),
        specificLoader('/api/admin/users', jwt_token).then(res => res.json()),
    ]);


    if (values.some(jsonObject => jsonObject.message === "Unauthorized" && jsonObject.statusCode === 401)) {
        return redirect('/connection');
    }

    const number = values[0].number;
    const usersfetched = values[1];

    return { number, usersfetched, jwt_token };
}

export default function AdminPage() {
    const { number, usersfetched, jwt_token } = useLoaderData();

    let [users , setUsers] = useState(usersfetched);

    function addUserToList(user) {
        let usersCopy = [...users];
        usersCopy.push(user.username);
        setUsers(usersCopy);
    }

    function removeUserFromList(user) {
        let index = 0;
        let usersCopy = [...users];
        for(let i = 0; i < usersCopy.length; i++) {
            if (usersCopy[i] === user) {
                index = i;
            }
        }
        usersCopy.splice(index, 1);
        setUsers(usersCopy);
    }

    return (
        <div className='container'>
            <h1>Admin Page</h1>

            <DeleteForm users={users} jwt_token={jwt_token} removeUserFromList={removeUserFromList}/>

            <ChangePasswordForm jwt_token={jwt_token} />

            <NewUserForm jwt_token={jwt_token} addUserToList={addUserToList}/>

            <h2>{number} boards</h2>
            <h2> Users : </h2>
            <ul>
                {users.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </div>
    );
}