import './main-page.css';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import studentWhite from "./../../assets/student-white.svg"
import teacherWhite from "./../../assets/prepod-white-1.svg"
import audienceWhite from "./../../assets/audience-white.svg"
import {Image} from "react-bootstrap";

const mainPage = () => {
    return (
        <div>
            <div className={"main-container"}>
                <div className={"main-title"}>Расписание</div>
                <div className={"button-container"}>
                    <div className={"d-md-flex"}>
                        <Link to={"/schedule"}>
                            <div className={"button-bg"}>
                                <Image fluid src={studentWhite}  className={"main-button svg-filter"}/>
                                <div className={"main-button-title"}>Группы</div>
                            </div>
                        </Link>
                        <Link to={"/schedule"}>
                            <div className={"button-bg"}>
                                <Image fluid src={teacherWhite}  className={"main-button svg-filter"}/>
                                <div className={"main-button-title"}>Преподаватели</div>
                            </div>
                        </Link>
                        <Link to={"/schedule"}>
                            <div className={"button-bg"}>
                                <Image fluid src={audienceWhite}  className={"main-button svg-filter"}/>
                                <div className={"main-button-title"}>Аудитории</div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default mainPage;