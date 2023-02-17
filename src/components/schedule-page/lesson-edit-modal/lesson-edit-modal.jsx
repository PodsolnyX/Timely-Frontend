import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const LessonEditModal = (props) => {

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать пару</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Предмет</h5>
                    <Form.Select aria-label="Default select example">
                        <option>{props.lesson}</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <h5>Группа</h5>
                    <Form.Select aria-label="Default select example">
                        <option>{props.groupNum}</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <h5 className={"mt-2"}>Аудитория</h5>
                    <Form.Select aria-label="Default select example">
                        <option>{props.audienceNum}</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    <h5 className={"mt-2"}>Преподаватель</h5>
                    <Form.Select aria-label="Default select example">
                        <option>Альфия Амировна Хакимова</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LessonEditModal;