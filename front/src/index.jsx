import { Link } from "react-router-dom";

export default function Index() {
    return (<>
        <h1>Welcome to <i>Fini</i> !</h1>
        <Link to={'connection'}>Connection</Link>
    </>);
}