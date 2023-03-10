import "./admin-panel.css"
import {Accordion, Container} from "react-bootstrap";
import AdminPanelItem from "./panel-item/panel-item";
import PanelAccordionItem from "./panel-accordion-item/panel-accordion-item";
import {useEffect} from "react";
import PanelAccordionTimeIntervals from "./panel-accordion-item/panel-accordion-time-intervals";
import AdminPanelItemTimeIntervals from "./panel-item/panel-item-time-intervals";
import PanelAccordionUserRoles from "./panel-accordion-item/panel-accordion-user-roles";
import AdminPanelItemUserRoles from "./panel-item/panel-item-user-roles";

const AdminPage = (props) => {

    console.log(props.profile)

    useEffect(() => {
        props.getTeachers();
        props.getClassrooms();
        props.getLessonNames();
        props.getLessonTags();
        props.getGroups();
        props.getDomains();
        props.getTimeIntervals();
        props.getUsers();
        props.getRoles();
    }, [])

    let teacherItems = props.teachers.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={props.teacherErrors[item.value]}
                        saveItem={(id, name) => props.editTeacher(id, name).then(r => props.getTeachers())}
                        deleteItem={(id) => props.deleteTeacher(id).then(r => props.getTeachers())}/>);

    let lessonItems = props.lessonNames.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={props.lessonNameErrors[item.value]}
                        saveItem={(id, name) => props.editLessonName(id, name).then(r => props.getLessonNames())}
                        deleteItem={(id) => props.deleteLessonName(id).then(r => props.getLessonNames())}/>);

    let audienceItems = props.classrooms.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={props.classroomErrors[item.value]}
                        saveItem={(id, name) => props.editClassroom(id, name).then(r => props.getClassrooms())}
                        deleteItem={(id) => props.deleteClassroom(id).then(r => props.getClassrooms())}/>);

    let groupItems = props.groups.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={props.groupErrors[item.value]}
                        saveItem={(id, name) => props.editGroup(id, name).then(r => props.getGroups())}
                        deleteItem={(id) => props.deleteGroup(id).then(r => props.getGroups())}/>);

    let lessonTypesItems = props.lessonTags.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={props.lessonTagErrors[item.value]}
                        saveItem={(id, name) => props.editLessonTag(id, name).then(r => props.getLessonTags())}
                        deleteItem={(id) => props.deleteLessonTag(id).then(r => props.getLessonTags())}/>);

    let domainItems = props.domains.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={props.domainErrors[item.value]}
                        saveItem={(id, name) => props.editDomain(id, name).then(r => props.getDomains())}
                        deleteItem={(id) => props.deleteDomain(id).then(r => props.getDomains())}/>);

    let timeIntervalsItems = props.timeIntervals.map((item, i) =>
        <AdminPanelItemTimeIntervals key={item.id} data={item} err={props.timeIntervals[item.value]}
                                     saveItem={(id, startTime, endTime) => props.editTimeInterval(id, startTime, endTime)
                                         .then(r => props.getTimeIntervals())}
                                     deleteItem={(id) => props.deleteTimeInterval(id).then(r => props.getTimeIntervals())}/>);

    let userRolesItems = props.users.map((item, i) =>
        <AdminPanelItemUserRoles key={item.email} data={item} err={props.timeIntervals[item.value]} roles={props.roles}
                                 saveItem={(email, roles) => props.editUserRoles(email, roles)
                                     .then(r => props.getUsers())}/>);

    return (
        <Container className={"mt-5 col-11 col-lg-8"}>
            <Accordion defaultActiveKey="7">
                <PanelAccordionItem listItems={teacherItems} eventKey={"0"} err={props.teacherErrors.create}
                                    headerTitle={"Преподаватели"} placeholder={"Иванов Иван Иванович"}
                                    createItem={(name) => props.createTeacher(name).then(r => props.getTeachers())}/>

                <PanelAccordionItem listItems={lessonItems} eventKey={"1"} err={props.lessonNameErrors.create}
                                    headerTitle={"Предметы"} placeholder={"Математический Анализ"}
                                    createItem={(name) => props.createLessonName(name).then(r => props.getLessonNames())}/>

                <PanelAccordionItem listItems={audienceItems} eventKey={"2"} err={props.classroomErrors.create}
                                    headerTitle={"Аудитории"} placeholder={"100 (1) Учебная аудитория"}
                                    createItem={(name) => props.createClassroom(name).then(r => props.getClassrooms())}/>

                <PanelAccordionItem listItems={groupItems} eventKey={"3"} err={props.groupErrors.create}
                                    headerTitle={"Группы"} placeholder={"990301"}
                                    createItem={(name) => props.createGroup(name).then(r => props.getGroups())}/>

                {
                    (!props.profile.roles?.includes("Administrator")) ? null :
                        <>
                            <PanelAccordionItem listItems={lessonTypesItems} eventKey={"4"}
                                                err={props.lessonTagErrors.create}
                                                headerTitle={"Типы занятий"} placeholder={"Лекция"}
                                                createItem={(name) => props.createLessonTag(name).then(r => props.getLessonTags())}/>

                            <PanelAccordionItem listItems={domainItems} eventKey={"5"} err={props.domainErrors.create}
                                                headerTitle={"Домены"} placeholder={"yandex.ru"}
                                                createItem={(name) => props.createDomain(name).then(r => props.getDomains())}/>

                            <PanelAccordionTimeIntervals listItems={timeIntervalsItems} eventKey={"6"}
                                                         err={props.timeIntervalErrors.create}
                                                         headerTitle={"Время проведения пар"}
                                                         createItem={(startTime, endTime) => props.createTimeInterval(startTime, endTime)
                                                             .then(r => props.getTimeIntervals())}/>
                            <PanelAccordionUserRoles listItems={userRolesItems} eventKey={"7"}
                                                     err={props.timeIntervalErrors.create}
                                                     headerTitle={"Роли пользователей"}
                                                     createItem={(startTime, endTime) => props.createTimeInterval(startTime, endTime)
                                                         .then(r => props.getTimeIntervals())}/>
                        </>
                }

            </Accordion>
        </Container>
    )
}

export default AdminPage;