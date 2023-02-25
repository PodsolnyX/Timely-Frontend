import './main-page.css';
import {Link} from "react-router-dom";
import studentWhite from "./../../assets/student-white.svg"
import teacherWhite from "./../../assets/prepod-white-1.svg"
import audienceWhite from "./../../assets/audience-white.svg"
import {Image} from "react-bootstrap";

const mainPage = () => {
    return (
        <div>
            <div className={"main-container"}>
                <Link to={"/schedule"}>
                    <div className={"main-title"}>Расписание</div>
                </Link>
                <div className={"button-container"}>
                    <div className={"d-md-flex"}>
                        <Link to={"/groups"}>
                            <div className={"button-bg"}>
                                <Image fluid src={studentWhite}  className={"main-button svg-filter"}/>
                                <div className={"main-button-title"}>Группы</div>
                            </div>
                        </Link>
                        <Link to={"/teachers"}>
                            <div className={"button-bg"}>
                                <Image fluid src={teacherWhite}  className={"main-button svg-filter"}/>
                                <div className={"main-button-title"}>Преподаватели</div>
                            </div>
                        </Link>
                        <Link to={"/audiences"}>
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