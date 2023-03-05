import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './lesson-edit-modal.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useZustandStore} from "../../../shared/useZustandStore";
import {useEffect} from "react";
import {useScheduleModalStore} from "../../../shared/useScheduleModalStore";

const LessonEditModal = (props) => {

    const currentLesson = useScheduleModalStore((state) => state.lessonEditModal.currentLesson)
    const dateTitle = useScheduleModalStore((state) => state.lessonEditModal.dateTitle)

    const setLessonNameId = useScheduleModalStore((state) => state.setLessonNameId)
    const setTeacherId = useScheduleModalStore((state) => state.setTeacherId)
    const setGroupId = useScheduleModalStore((state) => state.setGroupId)
    const setAudienceId = useScheduleModalStore((state) => state.setAudienceId)
    const setLessonTagId = useScheduleModalStore((state) => state.setLessonTagId)

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

    const curLessonIndex = lessonNames.findIndex(obj => obj.value === currentLesson.lessonNameId);
    const curGroupIndex = groups.findIndex(obj => obj.value === currentLesson.groupId);
    const curAudienceIndex = classrooms.findIndex(obj => obj.value === currentLesson.audienceId);
    const curTeacherIndex = teachers.findIndex(obj => obj.value === currentLesson.teacherId);
    const curLessonTagIndex = lessonTags.findIndex(obj => obj.value === currentLesson.lessonTagId);

    useEffect(() => {
        getTeachers();
        getClassrooms();
        getLessonNames();
        getLessonTags();
        getGroups();
    }, [])

    const animatedComponents = makeAnimated();
    const isShow = useScheduleModalStore((state) => state.lessonEditModal.isShow)
    const lessonEditModalClose = useScheduleModalStore((state) => state.lessonEditModalClose)

    const createLesson = useZustandStore((state) => state.createLesson);
    const onSaveLesson = () => {
        createLesson(
            currentLesson.lessonNameId,
            currentLesson.lessonTagId,
            currentLesson.groupId,
            currentLesson.teacherId,
            currentLesson.timeIntervalId,
            currentLesson.lessonDate,
            currentLesson.audienceId
        )
        console.log(currentLesson.groupId)
        console.log(
            currentLesson.lessonNameId,
            currentLesson.lessonTagId,
            currentLesson.groupId,
            currentLesson.teacherId,
            currentLesson.timeIntervalId,
            currentLesson.lessonDate,
            currentLesson.audienceId
        )
    }

    const onChangeLesson = (e) => { setLessonNameId(e.value) }
    const onChangeTeacher = (e) => { setTeacherId(e.value) }
    const onChangeGroup = (e) => { setGroupId(e[0].value) }
    const onChangeAudience = (e) => { setAudienceId(e.value) }
    const onChangeLessonTag = (e) => { setLessonTagId(e.value) }

    return (
        <>
            <Modal
                show={isShow}
                onHide={lessonEditModalClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton className={"justify-content-between modal-header"}>
                    <h5> {dateTitle} </h5>
                </Modal.Header>
                <Modal.Body className={"modal-body"}>

                    <h5>Предмет</h5>
                    <Select
                        defaultValue={lessonNames[curLessonIndex]}
                        options={lessonNames}
                        onChange={onChangeLesson}
                    />
                    <h5 className={"mt-2"}>Группа</h5>
                    <Select
                        defaultValue={groups[curGroupIndex]}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={groups}
                        onChange={onChangeGroup}
                    />
                    <h5 className={"mt-2"}>Аудитория</h5>
                    <Select
                        defaultValue={classrooms[curAudienceIndex]}
                        options={classrooms}
                        onChange={onChangeAudience}
                    />
                    <h5 className={"mt-2"}>Преподаватель</h5>
                    <Select
                        defaultValue={teachers[curTeacherIndex]}
                        options={teachers}
                        onChange={onChangeTeacher}
                    />
                    <h5 className={"mt-2"}>Тип пары</h5>
                    <Select
                        defaultValue={lessonTags[curLessonTagIndex]}
                        options={lessonTags}
                        onChange={onChangeLessonTag}
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

