import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();
    console.error("error page", error);

    return (<>
        <h1>An error occured</h1>
        <p><i>{error.statusText || error.message}</i></p>
        <button
            type="button"
            onClick={() => navigate(-1)}
        >
            Click here to go back
        </button>
    </>);
}