import { redirect, Form } from "react-router-dom";
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";

export async function action({ request, params }) {
    let token;
    console.log('connection action launched');
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    if (username.length === 0 || password.length === 0) {
        throw new Error("username or password empty");
    }
    const response = await fetch("/api/auth/signin",
        {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    const jsonObject = await response.json();
    if (jsonObject.message === "Unauthorized" && jsonObject.statusCode === 401) {
        throw new Error('wrong username or password');
    } else if (jsonObject.access_token) {
        token = jsonObject.access_token;
        Cookies.set('jwt', token, {expires: 1});
        const decoded = jwtDecode(token);

        if (decoded.username === 'admin') {
            return redirect('/admin');
        }

        return redirect('/myboards');
    } else {
        throw new Error('unknown error');
    }
}

export default function ConnectionPage() {
    return (
        <>
            <h1>Connection page</h1>
            <Form method="post" action="/connection">
                <label htmlFor="username">Enter your username : </label> <br />
                <input type="text" name="username" id="username" /> <br />
                <label htmlFor="password">Enter your password : </label> <br />
                <input type="password" name="password" id="password" /> <br />
                <button type="submit">Go !</button>
            </Form>
        </>
    );
}