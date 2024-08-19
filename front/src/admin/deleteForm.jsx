import './deleteForm.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';



export default function DeleteForm({users, removeUserFromList}) {

    let [name, setName] = useState('');

    let userFound = users.some(user => user.username === name);

    async function fetchDeleteUser(name) {
        const jwt_token = Cookies.get('jwt');
        if (!jwt_token) {
            return redirect('/connection');
        }
        const response = await fetch("/api/admin/user/" + name,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${jwt_token}`
                }
            });
        if (response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            removeUserFromList(name);
        }
    }

    return (
        <>
            <div className="delete-form">
                <p>To delete a user, enter exactly his name</p>
                <input type="text" placeholder='search a user' onChange={e => setName(e.target.value)} />
                <p>{userFound && 'user found'}</p>
                <p><button onClick={() => fetchDeleteUser(name)}>delete user</button></p >
            </div>
        </>
    );
}