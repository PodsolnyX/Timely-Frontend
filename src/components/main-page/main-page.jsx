import './main-page.css';
import {Link} from "react-router-dom";
import groupImage from "./../../assets/group.svg"
import teacherImage from "./../../assets/teacher.svg"
import audienceImage from "./../../assets/audience.svg"
import {Image} from "react-bootstrap";

const mainPage = () => {
    return (
        <div>
            <div className={"main-container"}>
                <div className={"main-title"}>Расписание</div>
                <div className={"button-container"}>
                    <div className={"d-md-flex"}>
                        <Link to={"/groups"}>
                            <div className={"button-bg"}>
                                <Image fluid src={groupImage}  className={"main-button svg-filter"}/>
                                <div className={"main-button-title"}>Группы</div>
                            </div>
                        </Link>
                        <Link to={"/teachers"}>
                            <div className={"button-bg"}>
                                <Image fluid src={teacherImage}  className={"main-button svg-filter"}/>
                                <div className={"main-button-title"}>Преподаватели</div>
                            </div>
                        </Link>
                        <Link to={"/audiences"}>
                            <div className={"button-bg"}>
                                <Image fluid src={audienceImage}  className={"main-button svg-filter"}/>
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