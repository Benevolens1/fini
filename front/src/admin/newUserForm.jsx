import { useState } from "react";
import './newUserForm.css';

export default function NewUserForm({ jwt_token, addUserToList }) {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    async function fetchNewUser() {
        const response = await fetch('/api/admin/user',
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwt_token}`,
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ username: username, password: password })
            });
        if (response.status === 401) {
            throw new Error('Unauthorized');
        } else {
            addUserToList({ username });
        }
    }

    return (
        <>
            <div className="new-user-form">
                <p>sign up a new user :</p>
                <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} /> <br />
                <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} /> <br />
                <button onClick={fetchNewUser}>submit</button>
            </div>
        </>
    );
}