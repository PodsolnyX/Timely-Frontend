import './main-page.css';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const mainPage = () => {
    return(
        <div className={"main-container"}>
            <div className={"button-container"}>
                <Link to={"/schedule"}>
                    <Button variant="primary">РАСПИСАНИЕ</Button>
                </Link>
            </div>
        </div>
    );
}

export default mainPage;