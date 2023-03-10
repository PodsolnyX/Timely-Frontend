import './schedule-page.css';
import {Button} from "react-bootstrap";
import React from "react";
import ScheduleTable from "./schedule-table/schedule-table";
import {useZustandStore} from "../../shared/useZustandStore";
import {data} from "./testData.js";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {getNextWeek, getPastWeek, getWeek} from "../../helpers/get-week";
import {useEffect} from "react";
import LessonEditModalContainer from "./lesson-edit-modal/lesson-edit-modal-container";
import LessonViewModal from "./lesson-view-modal/lesson-view-modal";

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

const forVanya = {
    "classroom" : "Classroom",
    "group" : "Group",
    "teacher" : "Teacher",
}

const SchedulePage = () => {

    const scheduleTags = {
        "teacher": {
            label: "преподователя",
            getSchedule: useZustandStore((state) => state.getTeacherSchedule),
            schedule: useZustandStore((state) => state.teacherSchedule),
        },
        "audience": {
            label: "аудитории",
            getSchedule: useZustandStore((state) => state.getClassroomSchedule),
            schedule: useZustandStore((state) => state.classroomSchedule),
        },
        "group": {
            label: "группы",
            getSchedule: useZustandStore((state) => state.getGroupSchedule),
            schedule: useZustandStore((state) => state.groupSchedule),
        },
    };

    const isLoadingSchedule = useZustandStore((state) => state.isLoading);
    const duplicateSchedule = useZustandStore((state) => state.duplicateSchedule);
    const isLoadingDuplicateSchedule = useZustandStore((state) => state.isLoadingDuplicateSchedule);
    const duplicateScheduleError = useZustandStore((state) => state.duplicateScheduleError);
    const profile = useZustandStore((store) => store.profile);

    const params = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();

    const name = search.get("name");
    const startDay = `
            ${search.get("startDate").slice(8, 10)} 
            ${weekDays[search.get("startDate").slice(5, 7)]} 
            ${search.get("startDate").slice(0, 4)}`;

    const endDay = `
            ${search.get("endDate").slice(8, 10)} 
            ${weekDays[search.get("endDate").slice(5, 7)]} 
            ${search.get("endDate").slice(0, 4)}`;

    const onNextWeekSchedule = () => {
        let week = getNextWeek(search.get("startDate"));
        navigate(`/schedule/${params.scheduleTag}/${params.id}?name=${name}&startDate=${week[0]}&endDate=${week[5]}`)
        navigate(0);
    }

    const onPastWeekSchedule = () => {
        let week = getPastWeek(search.get("startDate"));
        navigate(`/schedule/${params.scheduleTag}/${params.id}?name=${name}&startDate=${week[0]}&endDate=${week[5]}`)
        navigate(0);
    }

    const onDuplicateWeek = () => {
        duplicateSchedule(search.get("startDate"), 1, forVanya[params.scheduleTag], params.id)
    }
    const onDuplicateTwoWeek = () => {
        duplicateSchedule(search.get("startDate"), 2, forVanya[params.scheduleTag], params.id)
    }
    const onDuplicateMonth = () => {
        duplicateSchedule(search.get("startDate"), 4, forVanya[params.scheduleTag], params.id)
    }

    useEffect(() => {
        scheduleTags[params.scheduleTag].getSchedule(search.get("startDate"), params.id);
    }, [])

    return (
        <div className={"container schedule-page-container"}>
            <LessonEditModalContainer/>
            <LessonViewModal/>
            <div style={{padding: 20, margin: "30px 0"}}>
                <div className={"d-flex justify-content-between"}>
                    <div>
                        <h2> Расписание {scheduleTags[params.scheduleTag].label} {name} </h2>
                        <p style={{color: "gray"}}>{startDay} – {endDay}</p>
                        <div className={"d-flex"}>
                            <Button variant={"outline-secondary"} onClick={onPastWeekSchedule}>Предыдущая неделя</Button>
                            <Button variant={"outline-secondary"} className={"ms-3"} onClick={onNextWeekSchedule}>Следующая
                                неделя</Button>
                        </div>
                    </div>
                    {(profile.roles?.includes("Administrator") || profile.roles?.includes("Composer")) ?
                    <div>
                        <h5> Дублировать расписание </h5>
                        <div className={"d-flex flex-column"}>
                            <Button variant={"outline-primary"} size={"sm"} className={"mt-1"} onClick={onDuplicateWeek}>На неделю</Button>
                            <Button variant={"outline-primary"} size={"sm"} className={"mt-1"} onClick={onDuplicateTwoWeek}>На две недели</Button>
                            <Button variant={"outline-primary"} size={"sm"} className={"mt-1"} onClick={onDuplicateMonth}>На месяц</Button>
                        </div>
                    </div>
                        : null
                    }
                </div>
                <div className={"text-danger"}>{duplicateScheduleError}</div>
                {(isLoadingSchedule || isLoadingDuplicateSchedule) ? <div>LOADING...</div> :
                    <ScheduleTable lessonsDays={data.lessonsDays} week={getWeek(search.get("startDate"))}
                                   data={scheduleTags[params.scheduleTag].schedule}
                    />
                }
            </div>
        </div>
    );
}

export default SchedulePage;