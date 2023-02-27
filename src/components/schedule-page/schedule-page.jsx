import './schedule-page.css';
import {Button} from "react-bootstrap";
import React from "react";
import LessonEditModal from "./lesson-edit-modal/lesson-edit-modal";
import ScheduleTable from "./schedule-table/schedule-table";
import {useZustandStore} from "../../shared/useZustandStore";
import {data} from "./testData.js";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {getNextWeek, getPastWeek} from "../../helpers/get-week";

const scheduleTags = {
    "group": "группы",
    "teacher": "преподавателя",
    "audience": "аудитории"
};
const weekDays = {
    "01": "января",
    "02": "февраля",
    "03": "марта",
    "04": "апреля",
    "05": "мая",
    "06": "июня",
    "07": "июля",
    "08": "августа",
    "09": "сентября",
    "10": "октября",
    "11": "ноября",
    "12": "декабря"
};

const SchedulePage = () => {

    const params = useParams();
    const [search, setSearch] = useSearchParams();
    const name = search.get("name");
    const startDay = `
            ${search.get("startDate").slice(8,10)} 
            ${weekDays[search.get("startDate").slice(5,7)]} 
            ${search.get("startDate").slice(0,4)}`;

    const endDay = `
            ${search.get("endDate").slice(8,10)} 
            ${weekDays[search.get("endDate").slice(5,7)]} 
            ${search.get("endDate").slice(0,4)}`;

    const navigate = useNavigate();

    const lessonEditModalOpen = useZustandStore((state) => state.lessonEditModalOpen);

    const onNextWeekSchedule = () => {
        let week = getNextWeek(search.get("startDate"));
        navigate(`/schedule/${params.scheduleTag}/${params.id}?name=${name}&startDate=${week[0]}&endDate=${week[5]}`)
    }

    const onPastWeekSchedule = () => {
        let week = getPastWeek(search.get("startDate"));
        navigate(`/schedule/${params.scheduleTag}/${params.id}?name=${name}&startDate=${week[0]}&endDate=${week[5]}`)
    }

    return (
        <div className={"container schedule-page-container"} >
            <LessonEditModal universityData={data.universityData} />
            <div style={{padding: 20, margin: "30px 0"}}>
                <h2> Расписание {scheduleTags[params.scheduleTag]} {name} </h2>
                <p style={{color: "gray"}}>{startDay} – {endDay}</p>
                <div className={"d-flex"}>
                    <Button variant={"outline-secondary"} onClick={onPastWeekSchedule}>Предыдущая неделя</Button>
                    <Button variant={"outline-secondary"} className={"ms-3"} onClick={onNextWeekSchedule}>Следующая неделя</Button>
                </div>
                <ScheduleTable lessonsTime={data.lessonsTime} lessonsDays={data.lessonsDays} lessons={data.lessons} handleShow={lessonEditModalOpen}/>
            </div>
        </div>
    );
}

export default SchedulePage;