import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './lesson-edit-modal.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const LessonEditModal = (props) => {

    const animatedComponents = makeAnimated();

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton className={"justify-content-between modal-header"}>
                    <h5></h5>
                    <h5>ВТ - 10:35 | 14 февр.</h5>
                </Modal.Header>
                <Modal.Body className={"modal-body"}>

                    <h5>Предмет</h5>
                    <Select options={props.universityData.lessonsName} />
                    <h5 className={"mt-2"}>Группа</h5>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={props.universityData.groups}
                    />
                    <h5 className={"mt-2"}>Аудитория</h5>
                    <Select options={props.universityData.audience} />
                    <h5 className={"mt-2"}>Преподаватель</h5>
                    <Select options={props.universityData.teachers} />
                    <h5 className={"mt-2"}>Тип пары</h5>
                    <Select options={props.universityData.lessonsTypes} />

                </Modal.Body>
                <Modal.Footer className={"justify-content-between modal-footer mt-2"}>
                    <div>
                        <Button variant="outline-danger" onClick={props.handleClose}>
                            Удалить
                        </Button>
                    </div>
                    <div>
                        <Button variant="outline-primary" onClick={props.handleClose}>
                            Сохранить
                        </Button>
                        <Button className={"ms-2"} variant="outline-secondary" onClick={props.handleClose}>
                            Закрыть
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LessonEditModal;

