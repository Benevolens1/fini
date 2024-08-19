import { useState } from 'react';
import './changePasswordForm.css';

export default function ChangePasswordForm({jwt_token}) {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [passwordChanged, setPasswordChanged] = useState(false);

    async function fetchChangePassword() {
        const response = await fetch('/api/admin/password',
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwt_token}`,
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({username: username, password: password})
            });
        if (response.status === 401) {
            throw new Error('Unauthorized');
        }
        setPasswordChanged(true);
        return response;
    }

    return (
        <>
            <div className="change-password">
                <p>To change the password of a user, enter his name and then the new password</p>
                <input type="text" placeholder='username' onChange={e => setUsername(e.target.value)} /> <br />
                <input type="text" placeholder='new password' onChange={e => setPassword(e.target.value)} /> <br />
                <button onClick={fetchChangePassword}>validate</button>
                {passwordChanged && 'password changed !'}
            </div>
        </>
    );
}