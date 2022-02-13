import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoTrashBin } from 'react-icons/io5';
import { taskDeleted } from './tasksSlice';

import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

export const DeleteTaskModal = ({ id }) => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleDelete = async () => {
		await dispatch(taskDeleted(id));
		handleClose();
	};

	return (
		<>
			<Button variant="primary" className="deleteTask-btn" onClick={handleShow}>
				<IoTrashBin />
			</Button>

			<Modal show={show} onHide={handleClose} className="deleteTask-modal">
				<Modal.Header closeButton>
					<Modal.Title>Delete Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col>
								<p>Are you sure you want ot delete this Task ?</p>
								<p>If deleted you can't recover it again.</p>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button className="customSecondary-btn" onClick={handleClose}>
						Close
					</Button>
					<Button className="deleteTask-btn" onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
