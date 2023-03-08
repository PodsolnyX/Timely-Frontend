import './schedule-table.css'
import LessonCard from "../lesson-card/lesson-card";
import React from "react";
import {useZustandStore} from "../../../shared/useZustandStore";
import {formatDate, formatDateModal, isLaterThanNow} from "../../../helpers/get-week";
import {useScheduleModalStore} from "../../../shared/useScheduleModalStore";

const ScheduleTable = (props) => {

    const lessonEditModalOpen = useScheduleModalStore((state) => state.lessonEditModalOpen);
    const lessonViewModalOpen = useScheduleModalStore((state) => state.lessonViewModalOpen);
    const profile = useZustandStore((state) => state.profile);

    if (!props.data) return;

    let tableRows = [];
    let tableColumn = [];

    for (let i = 0; i < props.lessonsDays.length; i++) {
        tableColumn.push(
            <th scope="col" style={{color: "white", borderTop: 0, borderRight: 0}} key={i}>
                <div className={"d-flex justify-content-between"}>
                    <span>{props.lessonsDays[i]}</span>
                    <span style={{fontSize: 14, fontWeight: "normal", color: "gray"}}>{formatDate(props.week[i])}</span>
                </div>
            </th>
        );
    }

    let createTd = (index) => {
        let lessonsTd = [];

        for (let k = 0; k < props.lessonsDays.length; k++) {
            if (profile.roles?.includes("Administrator") &&
                isLaterThanNow(props.data.sortedTimeIntervals[index].endTime, props.week[k])) {
                lessonsTd.push(
                    <td className={props.data.matrix[index][k] ? null : "td-container"}
                        onClick={props.data.matrix[index][k] ? null : () =>
                            lessonEditModalOpen(
                                false,
                                formatDateModal(props.data.sortedTimeIntervals[index], props.week[k]),
                                props.data.sortedTimeIntervals[index],
                                props.week[k]
                            )}
                        style={{width: `${100 / (props.lessonsDays.length)}%`}}
                        key={k}
                    >
                        <LessonCard handleShow={lessonEditModalOpen}
                                    date={formatDateModal(props.data.sortedTimeIntervals[index], props.week[k])}
                                    timeInterval={props.data.sortedTimeIntervals[index]}
                                    data={props.data.matrix[index][k]}
                                    isReadOnly={false}
                        />
                    </td>
                )
            } else {
                lessonsTd.push(
                    <td style={{width: `${100 / (props.lessonsDays.length)}%`}} key={k} >
                        <LessonCard handleShow={lessonViewModalOpen}
                                    date={formatDateModal(props.data.sortedTimeIntervals[index], props.week[k])}
                                    timeInterval={props.data.sortedTimeIntervals[index]}
                                    data={props.data.matrix[index][k]}
                                    isReadOnly={true}
                        />
                    </td>
                )
            }
        }
        return lessonsTd;
    }


    for (let i = 0; i < props.data.sortedTimeIntervals.length; i++) {
        tableRows.push(
            <tr key={i}>
                <th scope="row" className={"text-center d-flex flex-column"}
                    style={{color: "white", padding: 15, borderLeft: 0, borderRight: 0}}>
                    <span>{props.data.sortedTimeIntervals[i].startTime.slice(0, 5)}</span>
                    <span style={{fontSize: 13, fontWeight: "normal", color: "gray"}}>
                        {props.data.sortedTimeIntervals[i].endTime.slice(0, 5)}
                    </span>
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
