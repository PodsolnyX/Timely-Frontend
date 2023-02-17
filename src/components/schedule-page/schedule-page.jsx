import './schedule-page.css';
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import LessonEditModal from "./lesson-edit-modal/lesson-edit-modal";
import LessonCard from "./lesson-card/lesson-card";

const SchedulePage = () => {

    ////////КОСТЫЛИ, ПОКА СТЕЙТА НЕТ/////////

    const [show, setShow] = useState(false);

    const [lesson, setLesson] = useState();
    const [audienceNum, setAudienceNum] = useState();
    const [groupNum, setGroupNum] = useState();

    const handleClose = () => setShow(false);
    const handleShow = (isLesson, lesson_, audienceNum_, groupNum_) => {
        if (isLesson) {
            setLesson(lesson_);
            setAudienceNum(audienceNum_);
            setGroupNum(groupNum_);
        }

        setShow(true);
    };

    const lessonsTime = ["8:45", "10:35", "12:25", "14:45", "16:35", "18:25", "20:15"];
    const lessonsDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    const lessons = [
        ["red", null, "green", null, null, null],
        ["orange", null, null, null, "cian", null],
        [null, null, null, null, null, null],
        [null, "blue", null, null, null, null],
        [null, null, null, null, "green", "purple"],
        [null, "orange", null, null, null, "blue"],
        ["green", null, "green", null, "orange", null]
    ]

    /////////////////////////////////////////////////////////

    let tableRows = [];
    let tableColumn = [];

    for (let i = 0; i < lessonsDays.length; i++) {
        tableColumn.push(
            <th scope="col" style={{color: "white", borderTop: 0, borderRight: 0}}>
                <div className={"d-flex justify-content-between"}>
                    <span>{lessonsDays[i]}</span>
                    <span style={{fontSize: 14, fontWeight: "normal", color: "gray"}}>14 февр.</span>
                </div>
            </th>
        );
    }

    let createTd = (index) => {
        let lessonsTd = [];
        for (let k = 0; k < lessonsDays.length; k++) {
            lessonsTd.push(
                <td className={lessons[index][k] ? null : "td-container"}
                    onClick={lessons[index][k] ? null : handleShow}
                    style={{width: `${100 / (lessonsDays.length)}%`}}
                >
                    <LessonCard handleShow={handleShow}
                                type={lessons[index][k]}
                                lesson={"Хочу Домой"}
                                audienceNum={"302 (2) Учебная аудитория"}
                                groupNum={"9721033"}
                    />
                </td>
            )
        }
        return lessonsTd;
    }

    for (let i = 0; i < lessonsTime.length; i++) {
        tableRows.push(
            <tr>
                <th scope="row" className={"text-center d-flex flex-column"}
                    style={{color: "white", padding: 15, borderLeft: 0, borderRight: 0}}>
                    <span>{lessonsTime[i]}</span>
                    <span style={{fontSize: 13, fontWeight: "normal", color: "gray"}}>{`10:35`}</span>
                </th>
                {createTd(i)}
            </tr>
        )
    }


    return (
        <div className={"container"} style={{marginTop: 30, marginBottom: 30}}>
            <LessonEditModal
                show={show}
                handleClose={handleClose}
                lesson={lesson}
                audienceNum={audienceNum}
                groupNum={groupNum}/>
            <div style={{padding: 20}}>
                <h2>
                    Расписание группы 972102
                </h2>
                <p style={{color: "gray"}}>13 февраля 2023 – 18 февраля 2023 | 25-я неделя</p>
                <div className={"d-flex"}>
                    <Button variant={"outline-secondary"}>Предыдущая неделя</Button>
                    <Button variant={"outline-secondary"} className={"ms-3"}>Следующая неделя</Button>
                </div>
                <div className={"table-responsive"} style={{marginTop: 30}}>
                    <table className="table table-bordered border-secondary" style={{minWidth: 800}}>
                        <thead style={{borderTop: "0 solid #222426"}}>
                        <tr>
                            <th scope="col" style={{width: 80, border: 0}}></th>
                            {tableColumn}
                        </tr>
                        </thead>
                        <tbody>
                        {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SchedulePage;