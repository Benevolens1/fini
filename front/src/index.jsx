import { redirect, Form } from "react-router-dom";

export async function action({ request, params }) {
    const formData = await request.formData();
    const password = formData.get("password");
    console.log("password :", password);
    const response = await fetch("/api/newboard/" + password);
    const text = await response.text();
    console.log("text :", text);
    console.log("response :", response);
    if (text === "invalid password") {
        throw new Error('invalid password');
    } else {
        return redirect("/" + text);
    }
}

export default function Index() {
    return (<>
        <h1>Welcome to <i>Fini</i>!</h1>
        <Form method="post">
            <label htmlFor="password">Enter your password : </label> <br />
            <input type="password" name="password" id="password" /> <br />
            <button type="submit">Go !</button>
        </Form>
    </>);
}