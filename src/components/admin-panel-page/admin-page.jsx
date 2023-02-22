import "./admin-panel.css"
import {Accordion, Button, Container, Form} from "react-bootstrap";
import { data } from "../schedule-page/testData";
import AdminPanelItem from "./panel-item/panel-item";

const
    TYPE_TEACHER = "TYPE_TEACHER",
    TYPE_LESSON = "TYPE_LESSON",
    TYPE_AUDIENCE = "TYPE_AUDIENCE",
    TYPE_GROUP = "TYPE_GROUP",
    TYPE_LESSON_TYPE = "TYPE_LESSON_TYPE";

const AdminPage = (props) => {

    let teacherItems = data.universityData.teachers.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} type={TYPE_TEACHER}/>);
    let lessonItems = data.universityData.lessonsName.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} type={TYPE_LESSON}/>);
    let audienceItems = data.universityData.audience.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} type={TYPE_AUDIENCE}/>);
    let groupItems = data.universityData.groups.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} type={TYPE_GROUP}/>);
    let lessonTypesItems = data.universityData.lessonsTypes.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} type={TYPE_LESSON_TYPE}/>);

    return (
        <Container className={"mt-5 col-11 col-lg-8"}>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Преподаватели</Accordion.Header>
                    <Accordion.Body className={""}>
                        <div className={"d-flex col"}>
                            <div className={"col"}>
                                <Form.Control
                                    placeholder="Иванов Иван Иванович"
                                    type="text"
                                    aria-describedby="fio"
                                />
                            </div>
                            <div className={"ms-3"}>
                                <Button variant={"outline-primary"}>Сохранить</Button>
                            </div>
                        </div>
                        <div className={"accordion-cards-container mt-3"}>
                            {teacherItems}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Группы</Accordion.Header>
                    <Accordion.Body>
                        <div className={"d-flex col"}>
                            <div className={"col"}>
                                <Form.Control
                                    placeholder="990301"
                                    type="text"
                                    aria-describedby="fio"
                                />
                            </div>
                            <div className={"ms-3"}>
                                <Button variant={"outline-primary"}>Сохранить</Button>
                            </div>
                        </div>
                        <div className={"accordion-cards-container mt-3"}>
                            {groupItems}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Аудитории</Accordion.Header>
                    <Accordion.Body>
                        <div className={"d-flex col"}>
                            <div className={"col"}>
                                <Form.Control
                                    placeholder="100 (1) Учебная аудитория"
                                    type="text"
                                    aria-describedby="fio"
                                />
                            </div>
                            <div className={"ms-3"}>
                                <Button variant={"outline-primary"}>Сохранить</Button>
                            </div>
                        </div>
                        <div className={"mt-3"}>
                            {audienceItems}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Типы занятий</Accordion.Header>
                    <Accordion.Body>
                        <div className={"d-flex col"}>
                            <div className={"col"}>
                                <Form.Control
                                    placeholder="Лекция"
                                    type="text"
                                    aria-describedby="fio"
                                />
                            </div>
                            <div className={"ms-3"}>
                                <Button variant={"outline-primary"}>Сохранить</Button>
                            </div>
                        </div>
                        <div className={"mt-3"}>
                            {lessonTypesItems}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Предметы</Accordion.Header>
                    <Accordion.Body className={""}>
                        <div className={"d-flex col"}>
                            <div className={"col"}>
                                <Form.Control
                                    placeholder="Математический Анализ"
                                    type="text"
                                    aria-describedby="fio"
                                />
                            </div>
                            <div className={"ms-3"}>
                                <Button variant={"outline-primary"}>Сохранить</Button>
                            </div>
                        </div>
                        <div className={"accordion-cards-container mt-3"}>
                            {lessonItems}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}


export default AdminPage;