import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './lesson-view-modal.css';
import {useScheduleModalStore} from "../../../shared/useScheduleModalStore";

const LessonViewModal = (props) => {

    const isShow = useScheduleModalStore(state => state.lessonViewModal.isShow)
    const lessonData = useScheduleModalStore(state => state.lessonViewModal.lessonData);
    const dateTitle = useScheduleModalStore(state => state.lessonViewModal.dateTitle);
    const lessonViewModalClose = useScheduleModalStore(state => state.lessonViewModalClose)

    const onModalClose = () => {
        lessonViewModalClose();
    }

    return (
        <>
            <Modal
                show={isShow}
                onHide={onModalClose}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton className={"justify-content-between modal-header"} closeVariant="white">
                    <h5> {dateTitle} </h5>
                </Modal.Header>
                <Modal.Body className={"modal-body"} style={{color:"white"}}>
                    <h5>Предмет</h5>
                    <span>{lessonData?.name.name}</span>
                    <h5 className={"mt-3"}>Группа</h5>
                    <span>
                        { lessonData?.group.map(
                            (g, i) => i === lessonData.group.length - 1 ? `${g.name}` : `${g.name}, `
                        )}
                    </span>
                    <h5 className={"mt-3"}>Аудитория</h5>
                    <span>{lessonData?.classroom.name}</span>
                    <h5 className={"mt-3"}>Преподаватель</h5>
                    <span>{lessonData?.teacher.name}</span>
                    <h5 className={"mt-3"}>Тип пары</h5>
                    <span>{lessonData?.tag.name}</span>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LessonViewModal;

