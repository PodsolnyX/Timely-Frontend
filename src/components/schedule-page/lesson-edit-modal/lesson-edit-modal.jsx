import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './lesson-edit-modal.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useZustandStore} from "../../../shared/useZustandStore";

const LessonEditModal = (props) => {

    const navigate = useNavigate();
    const animatedComponents = makeAnimated();

    const curLessonIndex = props.lessonNames.findIndex(obj => obj.value === props.currentLesson.lessonNameId);
    const curGroupIndex = !props.currentLesson.groupId ? null :
        props.currentLesson.groupId.map((g) => props.groups[props.groups.findIndex(obj => obj.value === g)]);
    const curAudienceIndex = props.classrooms.findIndex(obj => obj.value === props.currentLesson.audienceId);
    const curTeacherIndex = props.teachers.findIndex(obj => obj.value === props.currentLesson.teacherId);
    const curLessonTagIndex = props.lessonTags.findIndex(obj => obj.value === props.currentLesson.lessonTagId);
    const curTimeIntervalIndex = props.timeIntervals.findIndex(obj => obj.value === props.currentLesson.timeIntervalId);

    useEffect(() => {
        props.getTeachers();
        props.getClassrooms();
        props.getLessonNames();
        props.getLessonTags();
        props.getGroups();
        props.getTimeIntervals();
    }, [])

    const onSaveLesson = () => {
        props.createLesson(
            props.currentLesson.lessonNameId,
            props.currentLesson.lessonTagId,
            props.currentLesson.groupId,
            props.currentLesson.teacherId,
            props.currentLesson.timeIntervalId,
            props.currentLesson.lessonDate,
            props.currentLesson.audienceId
        ).then(r => {
            if (useZustandStore.getState().lessonError === ""){
                props.lessonEditModalClose();
                navigate(0);
            }
        });
    }

    const onEditLesson = () => {
        props.editLesson(
            props.lessonId,
            props.currentLesson.lessonNameId,
            props.currentLesson.lessonTagId,
            props.currentLesson.groupId,
            props.currentLesson.teacherId,
            props.currentLesson.timeIntervalId,
            props.currentLesson.lessonDate,
            props.currentLesson.audienceId
        ).then(r => {
            if (useZustandStore.getState().lessonError === ""){
                props.lessonEditModalClose();
                navigate(0);
            }
        });
    }

    const onDeleteLesson = () => {
        props.deleteLesson(props.lessonId).then(r => {
            if (useZustandStore.getState().lessonError === ""){
                props.lessonEditModalClose();
                navigate(0);
            }
        });
    }

    const onModalClose = () => {
        props.resetLessonError();
        props.lessonEditModalClose();
    }

    const onChangeLessonName = (e) => props.setLessonNameId(e.value)
    const onChangeTeacher = (e) => props.setTeacherId(e.value)
    const onChangeGroup = (e) => props.setGroupId(e.map((g) => g.value))
    const onChangeAudience = (e) => props.setAudienceId(e.value)
    const onChangeLessonTag = (e) => props.setLessonTagId(e.value)
    const onChangeTimeInterval = (e) => props.setTimeIntervalId(e.value)
    const onChangeLessonDate = (e) => {
        const day = new Date(e.target.value).getUTCDay();
        if([7,0].includes(day))
            e.preventDefault();
        else
            props.setLessonDate(e.target.value + "T00:00:00Z");
    }


    return (
        <>
            <Modal
                show={props.isShow}
                onHide={onModalClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton className={"justify-content-between modal-header"}>
                    <h5> {props.dateTitle} </h5>
                </Modal.Header>
                <Modal.Body className={"modal-body"}>
                    <h5>Предмет</h5>
                    <Select
                        defaultValue={props.lessonNames[curLessonIndex]}
                        options={props.lessonNames}
                        onChange={onChangeLessonName}
                    />
                    <h5 className={"mt-2"}>Группа</h5>
                    <Select
                        defaultValue={curGroupIndex}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={props.groups}
                        onChange={onChangeGroup}
                    />
                    <h5 className={"mt-2"}>Аудитория</h5>
                    <Select
                        defaultValue={props.classrooms[curAudienceIndex]}
                        options={props.classrooms}
                        onChange={onChangeAudience}
                    />
                    <h5 className={"mt-2"}>Преподаватель</h5>
                    <Select
                        defaultValue={props.teachers[curTeacherIndex]}
                        options={props.teachers}
                        onChange={onChangeTeacher}
                    />
                    <h5 className={"mt-2"}>Тип пары</h5>
                    <Select
                        defaultValue={props.lessonTags[curLessonTagIndex]}
                        options={props.lessonTags}
                        onChange={onChangeLessonTag}
                    />
                    <div className={"row"}>
                        <div className={"col"}>
                            <h5 className={"mt-2 text-white"}>Время пары</h5>
                            <Select
                                defaultValue={props.timeIntervals[curTimeIntervalIndex]}
                                options={props.timeIntervals}
                                onChange={onChangeTimeInterval}
                            />
                        </div>
                        <div className={"col"}>
                            <h5 className={"mt-2 text-white"}>Дата пары</h5>
                            <input min={new Date().toISOString().slice(0, 10)} className="form-control"
                                   type="date" value={props.currentLesson.lessonDate?.slice(0, 10)}
                                   onChange={onChangeLessonDate}
                            />
                        </div>
                    </div>
                    <div className={"text-danger mt-3"}>
                        {props.lessonError}
                    </div>
                </Modal.Body>
                <Modal.Footer className={"justify-content-between modal-footer mt-2"}>
                    <div>
                        {props.isLesson
                            ? <Button variant="outline-danger" onClick={onDeleteLesson}> Удалить </Button>
                            : null
                        }
                    </div>
                    <div>{props.isLoadingLesson ? "LOADING..." : null}</div>
                    <div>
                        {props.isLesson
                            ? <Button variant="outline-primary" onClick={onEditLesson}> Сохранить </Button>
                            : <Button variant="outline-primary" onClick={onSaveLesson}> Создать </Button>
                        }
                        <Button className={"ms-2"} variant="outline-secondary" onClick={onModalClose}>
                            Закрыть
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LessonEditModal;

