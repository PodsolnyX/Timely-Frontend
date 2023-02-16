import './schedule-page.css';
import {Button} from "react-bootstrap";

const schedulePage = () => {

    const lessonsTime = ["8:45", "10:35", "12:25", "14:45", "16:35", "18:25", "20:15"];
    const lessonsDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    let tableRows = [];
    let tableColumn = [];

    for (let i = 0; i < lessonsDays.length; i++) {
        tableColumn.push(
            <th scope="col" style={{color:"white", borderTop : 0, borderRight : 0}}>
                <div  className={"d-flex justify-content-between"}>
                    <span>{lessonsDays[i]}</span>
                    <span style={{fontSize : 14, fontWeight : "normal", color : "gray"}}>14 февр.</span>
                </div>
            </th>
        );
    }

    for (let i = 0; i < lessonsTime.length; i++) {
        tableRows.push(
            <tr>
                <th scope="row" className={"text-center d-flex flex-column"} style={{color:"white", padding : 15, borderLeft : 0, borderRight : 0}}>
                    <span>{lessonsTime[i]}</span>
                    <span style={{fontSize : 13, fontWeight : "normal", color : "gray"}}>{`10:35`}</span>
                </th>
                <td style={{cursor: "pointer", width: `${100/(lessonsDays.length)}%`}}>
                    <div className={"td-lesson lesson-red"}>
                        <span>Основы машинного обучения</span>
                        <span className={"audience-num-red"}>302 (2) Учебная аудитория</span>
                        <span className={"group-num-red"}>972102</span>
                    </div>
                </td>
                <td style={{cursor: "pointer", width: `${100/(lessonsDays.length)}%`}}>
                    <div className={"td-lesson lesson-green"}>
                        <span>Экология</span>
                        <span className={"audience-num-green"}>105 Учебная аудитория</span>
                        <span className={"group-num-green"}>972102</span>
                    </div>
                </td>
                <td style={{cursor: "pointer", width: `${100/(lessonsDays.length)}%`}}>
                    <div className={"td-lesson lesson-blue"}>
                        <span>Разработка и анализ требований</span>
                        <span className={"audience-num-blue"}>Онлайн</span>
                        <span className={"group-num-blue"}>972102</span>
                    </div>
                </td>
                <td style={{cursor: "pointer", width: `${100/(lessonsDays.length)}%`}}>
                    <div className={"td-lesson lesson-orange"}>
                        <span>Английский язык</span>
                        <span className={"audience-num-orange"}>208 Учебная аудитория</span>
                        <span className={"group-num-orange"}>972102</span>
                    </div>
                </td>
                <td style={{cursor: "pointer", width: `${100/(lessonsDays.length )}%`}}>
                    <div className={"td-lesson lesson-cian"}>
                        <span>Web-программирование</span>
                        <span className={"audience-num-cian"}>228 Учебная аудитория</span>
                        <span className={"group-num-cian"}>972102</span>
                    </div>
                </td>
                <td style={{cursor: "pointer", width: `${100/(lessonsDays.length)}%`, borderRight : 0}}>
                    <div className={"td-lesson lesson-purple"}>
                        <span>Математический анализ</span>
                        <span className={"audience-num-purple"}>121 Учебная аудитория</span>
                        <span className={"group-num-purple"}>972102</span>
                    </div>
                </td>
            </tr>
        );
    }

    return(
        <div className={"container"} style={{marginTop : 30, marginBottom : 30}}>
            <div style={{padding : 20}}>
                <h2>
                    Расписание группы 972102
                </h2>
                <p style={{color:"gray"}}>13 февраля 2023 – 18 февраля 2023 | 25-я неделя</p>
                <div className={"d-flex"}>
                    <Button variant={"outline-secondary"}>Предыдущая неделя</Button>
                    <Button variant={"outline-secondary"} className={"ms-3"}>Следующая неделя</Button>
                </div>
                <div className={"table-responsive"} style={{marginTop : 30}}>
                    <table className="table table-bordered border-secondary" style={{minWidth : 800}}>
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

export default schedulePage;