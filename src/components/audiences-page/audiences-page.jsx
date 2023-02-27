import Select from "react-select";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useZustandStore} from "../../shared/useZustandStore";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getWeek} from "../../helpers/get-week";

const GroupsPage = () => {

    const [value, setValue] = useState(null)
    const [label, setLabel] = useState(null)
    const navigate = useNavigate();

    let week = getWeek(new Date());

    const getClassrooms = useZustandStore((state) => state.getClassrooms)
    useEffect(() => {
        getClassrooms();
    }, [])
    const classrooms = useZustandStore((state) => state.classrooms);

    const onChangeSelect = (e) => {
        setValue(e.value);
        setLabel(e.label);
    }
    
    const onSubmitSchedule = () => {
        console.log(value);
        navigate(`/schedule/audience/${value}?name=${label}&startDate=${week[0]}&endDate=${week[5]}`)
    }

    return (
        <div className={"col-11 col-md-9 col-lg-7 container schedule-page-container"}>
            <div style={{padding: 30, margin: "50px 0", color: "black"}}>
                <h2 className={"text-white"}>Расписание аудитории</h2>
                <div className={"mt-4"}>
                    <h5 className={"text-white mb-4"}>Аудитория:</h5>
                    <Select options={classrooms}
                            onChange={onChangeSelect}/>
                    <Button variant={"outline-primary"}
                            disabled={ value ? null : "disabled"}
                            onClick={onSubmitSchedule}
                            className={"mt-4"}>Показать расписание</Button>
                </div>
            </div>
        </div>
    )
}

export default GroupsPage;