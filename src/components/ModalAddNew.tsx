import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createNewUser, resetCreate } from '../redux/User/user.slide';
import { toast } from 'react-toastify';

const ModalAddNew = (props: any) => {

    const { show, setShow } = props;
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const dispatch = useAppDispatch();
    const isCreateSuccess = useAppSelector(state => state.user.isCreateSuccess)

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (isCreateSuccess === true) {
            handleClose();
            toast.success('create succeed');
            //reset redux
            dispatch(resetCreate());
        }
    }, [isCreateSuccess])

    const handleSubmit = () => {
        dispatch(createNewUser({ email, name }))
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
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        onChange={(event) => setEmail(event?.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Name">
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        onChange={(event) => setName(event?.target.value)}
                    />
                </FloatingLabel>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddNew;