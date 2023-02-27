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
                <Link to={"/schedule/group/2345?name=972102&startDate=2023-02-22T16:59:59.999Z&endDate=2023-02-27T16:59:59.999Z"}>
                    <div className={"main-title"}>Расписание</div>
                </Link>
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