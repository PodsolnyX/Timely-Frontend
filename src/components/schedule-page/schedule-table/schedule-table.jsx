import './schedule-table.css'
import LessonCard from "../lesson-card/lesson-card";
import React from "react";
import {useZustandStore} from "../../../shared/useZustandStore";

const ScheduleTable = (props) => {

    const lessonEditModalOpen = useZustandStore((state) => state.lessonEditModalOpen);

    let tableRows = [];
    let tableColumn = [];

    for (let i = 0; i < props.lessonsDays.length; i++) {
        tableColumn.push(
            <th scope="col" style={{color: "white", borderTop: 0, borderRight: 0}} key={i}>
                <div className={"d-flex justify-content-between"}>
                    <span>{props.lessonsDays[i]}</span>
                    <span style={{fontSize: 14, fontWeight: "normal", color: "gray"}}>14 февр.</span>
                </div>
            </th>
        );
    }

    let createTd = (index) => {
        let lessonsTd = [];
        for (let k = 0; k < props.lessonsDays.length; k++) {
            lessonsTd.push(
                <td className={props.lessons[index][k] ? null : "td-container"}
                    onClick={props.lessons[index][k] ? null : () => lessonEditModalOpen(false)}
                    style={{width: `${100 / (props.lessonsDays.length)}%`}}
                    key={k}
                >
                    <LessonCard handleShow={props.handleShow}
                                lessonData={props.lessons[index][k]}
                    />
                </td>
            )
        }
        return lessonsTd;
    }

    for (let i = 0; i < props.lessonsTime.length; i++) {
        tableRows.push(
            <tr key={i}>
                <th scope="row" className={"text-center d-flex flex-column"}
                    style={{color: "white", padding: 15, borderLeft: 0, borderRight: 0}}>
                    <span>{props.lessonsTime[i]}</span>
                    <span style={{fontSize: 13, fontWeight: "normal", color: "gray"}}>{`10:35`}</span>
                </th>
                {createTd(i)}
            </tr>
        )
    }

    return (
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
    )
}

export default ScheduleTable;
