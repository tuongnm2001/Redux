import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteUser, resetDelete } from '../redux/User/user.slide';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ModalDelete = (props: any) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);
    const dispatch = useAppDispatch()
    const isDelSuccess = useAppSelector(state => state.user.isDelSuccess);

    const handleSubmitDelete = () => {
        dispatch(deleteUser(dataDelete.id));
    }

    useEffect(() => {
        if (isDelSuccess === true) {
            handleClose();
            toast.success('Delete user succeed')
            dispatch(resetDelete())
        }
    }, [isDelSuccess])

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you delete <span style={{ color: 'red' }}>{dataDelete.email}</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmitDelete()}>Submit</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalDelete;