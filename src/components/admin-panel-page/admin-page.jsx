import "./admin-panel.css"
import {Accordion, Container} from "react-bootstrap";
import AdminPanelItem from "./panel-item/panel-item";
import PanelAccordionItem from "./panel-accordion-item/panel-accordion-item";
import {useZustandStore} from "../../shared/useZustandStore";
import {useEffect} from "react";

const AdminPage = (props) => {

    const getTeachers = useZustandStore((state) => state.getTeachers)
    const createTeacher = useZustandStore((state) => state.createTeacher)
    const editTeacher = useZustandStore((state) => state.editTeacher)
    const deleteTeacher = useZustandStore((state) => state.deleteTeacher)

    const getClassrooms = useZustandStore((state) => state.getClassrooms)
    const createClassroom = useZustandStore((state) => state.createClassroom)
    const editClassroom = useZustandStore((state) => state.editClassroom)
    const deleteClassroom = useZustandStore((state) => state.deleteClassroom)

    const getLessonNames = useZustandStore((state) => state.getLessonNames)
    const createLessonName = useZustandStore((state) => state.createLessonName)
    const editLessonName = useZustandStore((state) => state.editLessonName)
    const deleteLessonName = useZustandStore((state) => state.deleteLessonName)

    const getGroups = useZustandStore((state) => state.getGroups)
    const createGroup = useZustandStore((state) => state.createGroup)
    const editGroup = useZustandStore((state) => state.editGroup)
    const deleteGroup = useZustandStore((state) => state.deleteGroup)

    const getLessonTags = useZustandStore((state) => state.getLessonTags)
    const createLessonTag = useZustandStore((state) => state.createLessonTag)
    const editLessonTag = useZustandStore((state) => state.editLessonTag)
    const deleteLessonTag = useZustandStore((state) => state.deleteLessonTag)

    useEffect(() => {
        getTeachers();
        getClassrooms();
        getLessonNames();
        getLessonTags();
        getGroups();
        }, [])

    const teachers = useZustandStore((state) => state.teachers);
    const classrooms = useZustandStore((state) => state.classrooms);
    const lessonNames = useZustandStore((state) => state.lessonNames);
    const groups = useZustandStore((state) => state.groups);
    const lessonTags = useZustandStore((state) => state.lessonTags);

    const teacherErrors = useZustandStore((state) => state.teacherErrors);
    const classroomErrors = useZustandStore((state) => state.classroomErrors);
    const lessonNameErrors = useZustandStore((state) => state.lessonNameErrors);
    const groupErrors = useZustandStore((state) => state.groupErrors);
    const lessonTagErrors = useZustandStore((state) => state.lessonTagErrors);

    let teacherItems = teachers.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={teacherErrors[item.value]}
                        saveItem={(id, name) => editTeacher(id, name).then(r => getTeachers())}
                        deleteItem={(id) => deleteTeacher(id).then(r => getTeachers())}/>);

    let lessonItems = lessonNames.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={lessonNameErrors[item.value]}
                        saveItem={(id, name) => editLessonName(id, name).then(r => getLessonNames())}
                        deleteItem={(id) => deleteLessonName(id).then(r => getLessonNames())}/>);

    let audienceItems = classrooms.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={classroomErrors[item.value]}
                        saveItem={(id, name) => editClassroom(id, name).then(r => getClassrooms())}
                        deleteItem={(id) => deleteClassroom(id).then(r => getClassrooms())}/>);

    let groupItems = groups.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={groupErrors[item.value]}
                        saveItem={(id, name) => editGroup(id, name).then(r => getGroups())}
                        deleteItem={(id) => deleteGroup(id).then(r => getGroups())}/>);

    let lessonTypesItems = lessonTags.map((item, i) =>
        <AdminPanelItem key={item.value} data={item} err={lessonTagErrors[item.value]}
                        saveItem={(id, name) => editLessonTag(id, name).then(r => getLessonTags())}
                        deleteItem={(id) => deleteLessonTag(id).then(r => getLessonTags())}/>);

    return (
        <Container className={"mt-5 col-11 col-lg-8"}>
            <Accordion>
                <PanelAccordionItem listItems={teacherItems} eventKey={"0"} err={teacherErrors.create}
                                    headerTitle={"Преподаватели"} placeholder={"Иванов Иван Иванович"}
                                    createItem={(name) => createTeacher(name).then(r => getTeachers())}/>

                <PanelAccordionItem listItems={lessonItems} eventKey={"1"} err={lessonNameErrors.create}
                                    headerTitle={"Предметы"} placeholder={"Математический Анализ"}
                                    createItem={(name) => createLessonName(name).then(r => getLessonNames())}/>

                <PanelAccordionItem listItems={audienceItems} eventKey={"2"} err={classroomErrors.create}
                                    headerTitle={"Аудитории"} placeholder={"100 (1) Учебная аудитория"}
                                    createItem={(name) => createClassroom(name).then(r => getClassrooms())}/>

                <PanelAccordionItem listItems={groupItems} eventKey={"3"} err={groupErrors.create}
                                    headerTitle={"Группы"} placeholder={"990301"}
                                    createItem={(name) => createGroup(name).then(r => getGroups())}/>

                <PanelAccordionItem listItems={lessonTypesItems} eventKey={"4"} err={lessonTagErrors.create}
                                    headerTitle={"Типы занятий"} placeholder={"Лекция"}
                                    createItem={(name) => createLessonTag(name).then(r => getLessonTags())}/>
            </Accordion>
        </Container>
    )
}

export default AdminPage;