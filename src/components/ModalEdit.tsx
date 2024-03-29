import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { resetUpdate, updateNewUser } from '../redux/User/user.slide';
import { toast } from 'react-toastify';

const ModalEditBlog = (props: any) => {

    const { show, setShow, dataEdit } = props;

    const handleClose = () => setShow(false);
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const isUpdateSuccess = useAppSelector(state => state.user.isUpdateSuccess)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (dataEdit.id) {
            setId(dataEdit?.id)
            setEmail(dataEdit?.email)
            setName(dataEdit?.name)
        }
    }, [dataEdit])

    useEffect(() => {
        if (isUpdateSuccess === true) {
            handleClose();
            toast.success('update succeed')
            dispatch(resetUpdate());
        }
    }, [isUpdateSuccess])

    const handleSubmit = () => {
        dispatch(updateNewUser({ id, name, email }))
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Edit</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FloatingLabel
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={email || ''}
                        onChange={(event) => setEmail(event?.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel label="Password">
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        value={name || ''}
                        onChange={(event) => setName(event?.target.value)}
                    />
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

export default ModalEditBlog;