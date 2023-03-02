import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './lesson-edit-modal.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useZustandStore} from "../../../shared/useZustandStore";
import {useEffect} from "react";

const LessonEditModal = (props) => {

    const currentLessonData = useZustandStore((state) => state.lessonEditModal.currentLessonData)
    const date = useZustandStore((state) => state.lessonEditModal.date)

    const getTeachers = useZustandStore((state) => state.getTeachers)
    const getClassrooms = useZustandStore((state) => state.getClassrooms)
    const getLessonNames = useZustandStore((state) => state.getLessonNames)
    const getGroups = useZustandStore((state) => state.getGroups)
    const getLessonTags = useZustandStore((state) => state.getLessonTags)

    const teachers = useZustandStore((state) => state.teachers);
    const classrooms = useZustandStore((state) => state.classrooms);
    const lessonNames = useZustandStore((state) => state.lessonNames);
    const groups = useZustandStore((state) => state.groups);
    const lessonTags = useZustandStore((state) => state.lessonTags);

    useEffect(() => {
        getTeachers();
        getClassrooms();
        getLessonNames();
        getLessonTags();
        getGroups();
    }, [])

    const animatedComponents = makeAnimated();
    const isShow = useZustandStore((state) => state.lessonEditModal.isShow)
    const lessonEditModalClose = useZustandStore((state) => state.lessonEditModalClose)

    const curLessonIndex = currentLessonData ? lessonNames.findIndex(obj => obj.value === currentLessonData.name.id) : null;
    const curGroupIndex = currentLessonData ? groups.findIndex(obj => obj.value === currentLessonData.group.id) : null;
    const curAudienceIndex = currentLessonData ? classrooms.findIndex(obj => obj.value === currentLessonData.classroom.id) : null;
    const curTeacherIndex = currentLessonData ? teachers.findIndex(obj => obj.value === currentLessonData.teacher.id) : null;
    const curLessonTagIndex = currentLessonData ? lessonTags.findIndex(obj => obj.value === currentLessonData.tag.id) : null;

    const onSaveLesson = () => {
        lessonEditModalClose();
    }

    return (
        <>
            <Modal
                show={isShow}
                onHide={lessonEditModalClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton className={"justify-content-between modal-header"}>
                    <h5> {date} </h5>
                </Modal.Header>
                <Modal.Body className={"modal-body"}>

                    <h5>Предмет</h5>
                    <Select
                        defaultValue={lessonNames[curLessonIndex]}
                        options={lessonNames}
                    />
                    <h5 className={"mt-2"}>Группа</h5>
                    <Select
                        defaultValue={groups[curGroupIndex]}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={groups}
                    />
                    <h5 className={"mt-2"}>Аудитория</h5>
                    <Select
                        defaultValue={classrooms[curAudienceIndex]}
                        options={classrooms}
                    />
                    <h5 className={"mt-2"}>Преподаватель</h5>
                    <Select
                        defaultValue={teachers[curTeacherIndex]}
                        options={teachers}
                    />
                    <h5 className={"mt-2"}>Тип пары</h5>
                    <Select
                        defaultValue={lessonTags[curLessonTagIndex]}
                        options={lessonTags}
                    />

                </Modal.Body>
                <Modal.Footer className={"justify-content-between modal-footer mt-2"}>
                    <div>
                        <Button variant="outline-danger" onClick={lessonEditModalClose}>
                            Удалить
                        </Button>
                    </div>
                    <div>
                        <Button variant="outline-primary" onClick={onSaveLesson}>
                            Сохранить
                        </Button>
                        <Button className={"ms-2"} variant="outline-secondary" onClick={lessonEditModalClose}>
                            Закрыть
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LessonEditModal;

