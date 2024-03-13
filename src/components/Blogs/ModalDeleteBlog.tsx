import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { deleteUser, resetDelete } from '../redux/User/user.slide';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { deleteBlog, resetDelBlog } from '../../redux/blogs/blogs.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const ModalDeleteBlog = (props: any) => {

    const { show, setShow, dataDelBlogs } = props;

    const handleClose = () => setShow(false);
    const dispatch = useAppDispatch();
    const isDelSuccessBlog = useAppSelector(state => state.blog.isDelBlog)

    const handleSubmitDelete = () => {
        // dispatch(deleteUser(dataDelete.id));
        dispatch(deleteBlog(dataDelBlogs.id))

    }

    useEffect(() => {
        if (isDelSuccessBlog === true) {
            handleClose();
            toast.success('Delete Blog succeed')
            dispatch(resetDelBlog())
        }
    }, [isDelSuccessBlog])

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
                Do you delete <span style={{ color: 'red' }}>{dataDelBlogs.title}</span>
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

export default ModalDeleteBlog;