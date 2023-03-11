import './schedule-page.css';
import {Button} from "react-bootstrap";
import React, {useState} from "react";
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
    "classroom": "Classroom",
    "group": "Group",
    "teacher": "Teacher",
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

    const duplicateSchedule = useZustandStore((state) => state.duplicateSchedule);
    const removeWeek = useZustandStore((state) => state.removeWeek);
    const scheduleError = useZustandStore((state) => state.scheduleError);
    const profile = useZustandStore((store) => store.profile);

    const params = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

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

    const onDuplicateWeek = (countWeek) => {
        setIsLoading(true)
        duplicateSchedule(search.get("startDate"), countWeek, forVanya[params.scheduleTag], params.id)
            .then(() => setIsLoading(false))
    }

    const onRemoveWeek = (countWeek) => {
        setIsLoading(true)
        removeWeek(search.get("startDate"), countWeek, forVanya[params.scheduleTag], params.id)
            .then(() => {
                if (useZustandStore.getState().scheduleError === "") {
                    scheduleTags[params.scheduleTag].getSchedule(search.get("startDate"), params.id)
                }
                setIsLoading(false)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        scheduleTags[params.scheduleTag].getSchedule(search.get("startDate"), params.id)
            .then(() => setIsLoading(false))
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
                            <Button variant={"outline-secondary"} onClick={onPastWeekSchedule}>Предыдущая
                                неделя</Button>
                            <Button variant={"outline-secondary"} className={"ms-3"} onClick={onNextWeekSchedule}>Следующая
                                неделя</Button>
                        </div>
                    </div>
                    {(profile.roles?.includes("Administrator") || profile.roles?.includes("Composer")) ?
                        <div className={"d-flex"}>
                            <div>
                                <h5> Дублировать расписание </h5>
                                <div className={"d-flex flex-column"}>
                                    <Button variant={"outline-primary"} size={"sm"} className={"mt-1"}
                                            onClick={() => onDuplicateWeek(1)}>На неделю</Button>
                                    <Button variant={"outline-primary"} size={"sm"} className={"mt-1"}
                                            onClick={() => onDuplicateWeek(2)}>На две недели</Button>
                                    <Button variant={"outline-primary"} size={"sm"} className={"mt-1"}
                                            onClick={() => onDuplicateWeek(4)}>На месяц</Button>
                                </div>
                            </div>
                            <div className={"ms-3"}>
                                <h5> Удалить расписание </h5>
                                <div className={"d-flex flex-column"}>
                                    <Button variant={"outline-danger"} size={"sm"} className={"mt-1"}
                                            onClick={() => onRemoveWeek(0)}>На неделю</Button>
                                    <Button variant={"outline-danger"} size={"sm"} className={"mt-1"}
                                            onClick={() => onRemoveWeek(1)}>На две недели</Button>
                                    <Button variant={"outline-danger"} size={"sm"} className={"mt-1"}
                                            onClick={() => onRemoveWeek(3)}>На месяц</Button>
                                </div>
                            </div>
                        </div>

                        : null
                    }
                </div>
                <div className={"text-danger"}>{scheduleError}</div>
                {isLoading ? <div>LOADING...</div> :
                    <ScheduleTable lessonsDays={data.lessonsDays} week={getWeek(search.get("startDate"))}
                                   data={scheduleTags[params.scheduleTag].schedule}
                    />
                }
            </div>
        </div>
    );
}

export default SchedulePage;