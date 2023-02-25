import "./admin-panel.css"
import {Accordion, Container} from "react-bootstrap";
import { data } from "../schedule-page/testData";
import AdminPanelItem from "./panel-item/panel-item";
import PanelAccordionItem from "./panel-accordion-item/panel-accordion-item";

const AdminPage = (props) => {

    let teacherItems = data.universityData.teachers.map((item, i) =>
        <AdminPanelItem key={item.value} data={item}
                        saveItem={()=>{console.log("SAVE_TEACHER")}} deleteItem={()=>{console.log("DELETE_TEACHER")}}/>);

    let lessonItems = data.universityData.lessonsName.map((item, i) =>
        <AdminPanelItem key={item.value} data={item}
                        saveItem={()=>{console.log("SAVE_LESSON")}} deleteItem={()=>{console.log("DELETE_LESSON")}}/>);

    let audienceItems = data.universityData.audience.map((item, i) =>
        <AdminPanelItem key={item.value} data={item}
                        saveItem={()=>{console.log("SAVE_AUDIENCE")}} deleteItem={()=>{console.log("DELETE_AUDIENCE")}}/>);

    let groupItems = data.universityData.groups.map((item, i) =>
        <AdminPanelItem key={item.value} data={item}
                        saveItem={()=>{console.log("SAVE_GROUP")}} deleteItem={()=>{console.log("DELETE_GROUP")}}/>);

    let lessonTypesItems = data.universityData.lessonsTypes.map((item, i) =>
        <AdminPanelItem key={item.value} data={item}
                        saveItem={()=>{console.log("SAVE_LESSON_TYPE")}} deleteItem={()=>{console.log("DELETE_LESSON_TYPE")}}/>);

    return (
        <Container className={"mt-5 col-11 col-lg-8"}>
            <Accordion>
                <PanelAccordionItem listItems={teacherItems} eventKey={"0"}
                                    headerTitle={"Преподаватели"} placeholder={"Иванов Иван Иванович"}
                                    saveItem={()=>{console.log("SAVE_TEACHER")}}/>

                <PanelAccordionItem listItems={lessonItems} eventKey={"1"}
                                    headerTitle={"Предметы"} placeholder={"Математический Анализ"}
                                    saveItem={()=>{console.log("SAVE_LESSON")}}/>

                <PanelAccordionItem listItems={audienceItems} eventKey={"2"}
                                    headerTitle={"Аудитории"} placeholder={"100 (1) Учебная аудитория"}
                                    saveItem={()=>{console.log("SAVE_AUDIENCE")}}/>

                <PanelAccordionItem listItems={groupItems} eventKey={"3"}
                                    headerTitle={"Группы"} placeholder={"990301"}
                                    saveItem={()=>{console.log("SAVE_GROUP")}}/>

                <PanelAccordionItem listItems={lessonTypesItems} eventKey={"4"}
                                    headerTitle={"Типы занятий"} placeholder={"Лекция"}
                                    saveItem={()=>{console.log("SAVE_LESSON_TYPE")}}/>
            </Accordion>
        </Container>
    )
}

export default AdminPage;