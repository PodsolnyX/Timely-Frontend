import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './lesson-edit-modal.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useZustandStore} from "../../../shared/useZustandStore";

const LessonEditModal = (props) => {

    const animatedComponents = makeAnimated();
    const currentLesson = useZustandStore((state) => state.lessonEditModal.currentLesson)
    const isShow = useZustandStore((state) => state.lessonEditModal.isShow)
    const lessonEditModalClose = useZustandStore((state) => state.lessonEditModalClose)

    const curLessonIndex = props.universityData.lessonsName.findIndex(obj => obj.value === currentLesson.curLessonNameId);
    const curGroupIndex = props.universityData.groups.findIndex(obj => obj.value === currentLesson.curGroupId);
    const curAudienceIndex = props.universityData.audience.findIndex(obj => obj.value === currentLesson.curAudienceId);
    const curTeacherIndex = props.universityData.teachers.findIndex(obj => obj.value === currentLesson.curTeacherId);
    const curLessonTagIndex = props.universityData.lessonsTypes.findIndex(obj => obj.value === currentLesson.curLessonTagId);

    return (
        <>
            <Modal
                show={isShow}
                onHide={lessonEditModalClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton className={"justify-content-between modal-header"}>
                    <h5>ВТ - 10:35 | 14 февр.</h5>
                </Modal.Header>
                <Modal.Body className={"modal-body"}>

                    <h5>Предмет</h5>
                    <Select
                        defaultValue={props.universityData.lessonsName[curLessonIndex]}
                        options={props.universityData.lessonsName}
                    />
                    <h5 className={"mt-2"}>Группа</h5>
                    <Select
                        defaultValue={props.universityData.groups[curGroupIndex]}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={props.universityData.groups}
                    />
                    <h5 className={"mt-2"}>Аудитория</h5>
                    <Select
                        defaultValue={props.universityData.audience[curAudienceIndex]}
                        options={props.universityData.audience}
                    />
                    <h5 className={"mt-2"}>Преподаватель</h5>
                    <Select
                        defaultValue={props.universityData.teachers[curTeacherIndex]}
                        options={props.universityData.teachers}
                    />
                    <h5 className={"mt-2"}>Тип пары</h5>
                    <Select
                        defaultValue={props.universityData.lessonsTypes[curLessonTagIndex]}
                        options={props.universityData.lessonsTypes}
                    />

                </Modal.Body>
                <Modal.Footer className={"justify-content-between modal-footer mt-2"}>
                    <div>
                        <Button variant="outline-danger" onClick={lessonEditModalClose}>
                            Удалить
                        </Button>
                    </div>
                    <div>
                        <Button variant="outline-primary" onClick={lessonEditModalClose}>
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

