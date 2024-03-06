import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

interface ModalAddNewProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAddNew: React.FC<ModalAddNewProps> = ({ show, setShow }) => {

    const handleClose = () => setShow(false);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = () => {
        console.log(email, name);
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FloatingLabel
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" onChange={(event) => setEmail(event?.target.value)} />
                </FloatingLabel>
                <FloatingLabel label="Password">
                    <Form.Control type="text" placeholder="Name" onChange={(event) => setName(event?.target.value)} />
                </FloatingLabel>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddNew;