import './schedule-page.css';

const schedulePage = () => {

    const lessonsTime = ["8:45", "10:35", "12:25", "14:45", "16:35", "18:25", "20:15"];
    const lessonsDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    let tableRows = [];
    let tableColumn = [];

    for (let i = 0; i < lessonsDays.length; i++) {
        tableColumn.push(
            <th scope="col">{lessonsDays[i]}</th>
        );
    }

    for (let i = 0; i < lessonsTime.length; i++) {
        tableRows.push(
            <tr>
                <th scope="row">{lessonsTime[i]}</th>
                <td style={{cursor: "pointer", width: `${100/(lessonsDays.length + 1)}%`}}>
                    <div className={"td-red-lesson"}>
                        <span>Основы машинного обучения</span>
                        <span className={"audience-num"}>302 (2) Учебная аудитория</span>
                        <span className={"group-num"}>972102</span>
                    </div>
                </td>
                <td style={{cursor: "pointer"}}></td>
                <td style={{cursor: "pointer"}}></td>
                <td style={{cursor: "pointer"}}></td>
                <td style={{cursor: "pointer"}}></td>
                <td style={{cursor: "pointer"}}></td>
            </tr>
        );
    }

    return(
        <div className={"container"} style={{background: "white"}}>
            <div>
                <h2>Расписание группы 972102</h2>
                <p>13 февраля 2023 – 18 февраля 2023 • 25-я неделя</p>
                <div>
                    <button>Предыдущая неделя</button>
                    <button>Следующая неделя</button>
                </div>
                <div>
                    <table className="table table-bordered table-fixed">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: 80}}></th>
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