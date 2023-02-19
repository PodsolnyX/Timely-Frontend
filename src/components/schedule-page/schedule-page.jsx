import './schedule-page.css';
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import LessonEditModal from "./lesson-edit-modal/lesson-edit-modal";
import ScheduleTable from "./schedule-table/schedule-table";

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

    const universityData = {
        groups : [
            { value: '1', label: '972101' },
            { value: '2', label: '972102' },
            { value: '3', label: '972103' }
        ],
        audience : [
            { value: '1', label: '302 (2) Учебная аудитория' },
            { value: '2', label: '235 (2) Учебная аудитория' },
            { value: '3', label: '212 (2) Учебная аудитория' },
            { value: '4', label: '228 (2) Учебная аудитория' },
            { value: '5', label: '204 (2) Учебная аудитория' }
        ],
        teachers : [
            { value: '1', label: 'Хакимова Альфия Амировна' },
            { value: '2', label: 'Змеев Денис Олегович' },
            { value: '3', label: 'Змеев Олег Алексеевич' },
            { value: '4', label: 'Шаврин Валерий Викторович' },
            { value: '5', label: 'Зубов Данил Романович' },
        ],
        lessonsName : [
            { value: '1', label: 'Машинное обучение' },
            { value: '2', label: 'Математический анализ ' },
            { value: '3', label: 'Тестирование' },
            { value: '4', label: 'Web-программирование' },
        ],
        lessonsTypes : [
            { value: '1', label: 'Лекция' },
            { value: '2', label: 'Семинар' },
            { value: '3', label: 'Практика' },
            { value: '4', label: 'Лабораторная' },
            { value: '5', label: 'Экзамен' }
        ]
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

    return (
        <div className={"container schedule-page-container"} style={{marginTop: 30, marginBottom: 30}}>
            <LessonEditModal
                show={show}
                handleClose={handleClose}
                lesson={lesson}
                audienceNum={audienceNum}
                groupNum={groupNum}
                universityData={universityData}
            />
            <div style={{padding: 20}}>
                <h2>
                    Расписание группы 972102
                </h2>
                <p style={{color: "gray"}}>13 февраля 2023 – 18 февраля 2023 | 25-я неделя</p>
                <div className={"d-flex"}>
                    <Button variant={"outline-secondary"}>Предыдущая неделя</Button>
                    <Button variant={"outline-secondary"} className={"ms-3"}>Следующая неделя</Button>
                </div>
                <ScheduleTable lessonsTime={lessonsTime} lessonsDays={lessonsDays} lessons={lessons} handleShow={handleShow}/>
            </div>
        </div>
    );
}

export default SchedulePage;