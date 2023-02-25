import Select from "react-select";
import React, {useState} from "react";
import {data} from "../schedule-page/testData";
import {Button} from "react-bootstrap";

const GroupsPage = () => {

    const [value, setValue] = useState(null);

    const onChangeSelect = (e) => {
        setValue(e.value);
    }
    const onSubmitSchedule = () => {
        console.log(value);
    }

    return (
        <div className={"col-11 col-md-9 col-lg-7 container schedule-page-container"}>
            <div style={{padding: 30, margin: "50px 0", color: "black"}}>
                <h2 className={"text-white"}>Расписание групп</h2>
                <div className={"mt-4"}>
                    <h5 className={"text-white mb-4"}>Группа:</h5>
                    <Select options={data.universityData.groups} onChange={onChangeSelect}/>
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