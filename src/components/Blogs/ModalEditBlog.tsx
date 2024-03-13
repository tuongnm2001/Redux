import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { resetEditBlog, updateBlog } from '../../redux/blogs/blogs.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const ModalEdit = (props: any) => {

    const { show, setShow, dataEditBlogs } = props;

    const handleClose = () => setShow(false);
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const isUpdateBlog = useAppSelector(state => state.blog.isEditBlog)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (dataEditBlogs.id) {
            setId(dataEditBlogs?.id)
            setTitle(dataEditBlogs?.title)
            setAuthor(dataEditBlogs?.author)
            setContent(dataEditBlogs?.content)
        }
    }, [dataEditBlogs])

    useEffect(() => {
        if (isUpdateBlog === true) {
            handleClose();
            toast.success('update blog succeed')
            dispatch(resetEditBlog());
        }
    }, [isUpdateBlog])

    const handleSubmit = () => {
        dispatch(updateBlog({ id, title, author, content }))
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Blog</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FloatingLabel
                    label="Title"

                >
                    <Form.Control
                        type="text"
                        placeholder="name@example.com"
                        value={title || ''}
                        onChange={(event) => setTitle(event?.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel label="Password" className="my-3">
                    <Form.Control
                        type="text"
                        placeholder="Author"
                        value={author || ''}
                        onChange={(event) => setAuthor(event?.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="Password">
                    <Form.Control
                        type="text"
                        placeholder="Content"
                        value={content || ''}
                        onChange={(event) => setContent(event?.target.value)}
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

export default ModalEdit;