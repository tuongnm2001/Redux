import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalDelete = (props: any) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDelete = () => {
        console.log(dataDelete.id);
    }

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