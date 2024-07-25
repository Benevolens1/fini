import { redirect, Form } from "react-router-dom";

export async function action({ request, params }) {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    if (username.length === 0 || password.length  === 0) {
        throw new Error("username or password empty");
    }
    const response = await fetch("/api/boards/newboard/", 
    {
        method: "POST",
        body: JSON.stringify({username: username, password: password}),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    });
    const jsonObject = await response.json();
    if (jsonObject.message === "wrong password") {
        throw new Error('wrong password');
    } else {
        return redirect("/" + jsonObject.boardId);
    }
}

export default function Index() {
    return (<>
        <h1>Welcome to <i>Fini</i>!</h1>
        <Form method="post">
            <label htmlFor="username">Enter your username : </label> <br />
            <input type="text" name="username" id="username" /> <br />
            <label htmlFor="password">Enter your password : </label> <br />
            <input type="password" name="password" id="password" /> <br />
            <button type="submit">Go !</button>
        </Form>
    </>);
}