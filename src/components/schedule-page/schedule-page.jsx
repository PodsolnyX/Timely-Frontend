import './schedule-page.css';
import {Button} from "react-bootstrap";
import React from "react";
import LessonEditModal from "./lesson-edit-modal/lesson-edit-modal";
import ScheduleTable from "./schedule-table/schedule-table";
import {useZustandStore} from "../../shared/useZustandStore";
import {data} from "./testData.js";

const SchedulePage = () => {

    const lessonEditModalOpen = useZustandStore((state) => state.lessonEditModalOpen);

    return (
        <div className={"container schedule-page-container"} style={{marginTop: 30, marginBottom: 30}}>
            <LessonEditModal universityData={data.universityData} />
            <div style={{padding: 20}}>
                <h2> Расписание группы 972102 </h2>
                <p style={{color: "gray"}}>13 февраля 2023 – 18 февраля 2023 | 25-я неделя</p>
                <div className={"d-flex"}>
                    <Button variant={"outline-secondary"}>Предыдущая неделя</Button>
                    <Button variant={"outline-secondary"} className={"ms-3"}>Следующая неделя</Button>
                </div>
                <ScheduleTable lessonsTime={data.lessonsTime} lessonsDays={data.lessonsDays} lessons={data.lessons} handleShow={lessonEditModalOpen}/>
            </div>
        </div>
    );
}

export default SchedulePage;