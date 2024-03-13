import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import { createNewBlog, resetCreateBlog } from '../../redux/blogs/blogs.slice';
import { toast } from 'react-toastify';

const ModalAddBlog = (props: any) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const dispatch = useAppDispatch()
    const { show, setShow } = props;
    const handleClose = () => setShow(false);
    const isCreateSuccessBlog = useAppSelector(state => state.blog.isCreateBlog)

    useEffect(() => {
        if (isCreateSuccessBlog === true) {
            handleClose();
            toast.success('create blog succeed')
            dispatch(resetCreateBlog())
        }
    }, [isCreateSuccessBlog])

    const handleSubmitAddBlog = () => {
        dispatch(createNewBlog({ title, author, content }));
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New Blog</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FloatingLabel controlId="floatingInput" label="Title" >
                    <Form.Control type="text" placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Author" className="my-3">
                    <Form.Control type="text" placeholder="Author" onChange={(event) => setAuthor(event.target.value)} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Content">
                    <Form.Control type="text" placeholder="Content" onChange={(event) => setContent(event.target.value)} />
                </FloatingLabel>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmitAddBlog()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddBlog;