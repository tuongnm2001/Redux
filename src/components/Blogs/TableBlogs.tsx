import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchListBlogs } from '../../redux/blogs/blogs.slice';
import ModalAddBlog from './ModalAddBlog';
import ModalDeleteBlog from './ModalDeleteBlog';
import ModalEditBlog from './ModalEditBlog';

const TableBlogs = () => {

    const dispatch = useAppDispatch()
    const listBlogs = useAppSelector(state => state.blog.listBlogs)
    const [isShowModalAddNewBlog, setIsShowModalAddNewBlog] = useState(false)
    const [isShowModalDelBlog, setIsShowModalDelBlog] = useState(false)
    const [isShowModalEditBlog, setIsShowModalEditBlog] = useState(false)
    const [dataDelBlogs, setDataDelBlogs] = useState({})
    const [dataEditBlogs, setDataEditBlogs] = useState({})

    useEffect(() => {
        dispatch(fetchListBlogs())
    }, [])

    const handleAddNewBlogs = () => {
        setIsShowModalAddNewBlog(true)
    }

    const handleDeleteBlog = (item: any) => {
        setIsShowModalDelBlog(true)
        setDataDelBlogs(item)
    }

    const handleEditBlog = (item: any) => {
        setIsShowModalEditBlog(true)
        setDataEditBlogs(item)
    }

    return (
        <>
            <div className='title'>
                <Navbar.Text style={{ fontSize: '20px', fontWeight: '400' }}>Table Users</Navbar.Text>
                <button
                    className='btn btn-primary'
                    onClick={() => handleAddNewBlogs()}
                >
                    Add New
                </button>
            </div >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listBlogs && listBlogs.length > 0 &&
                        listBlogs.map((item, index) => {
                            return (
                                <tr key={`blogs-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.content}</td>
                                    <td>
                                        <button className='btn btn-warning' onClick={() => handleEditBlog(item)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => handleDeleteBlog(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <ModalAddBlog
                show={isShowModalAddNewBlog}
                setShow={setIsShowModalAddNewBlog}
            />

            <ModalEditBlog
                show={isShowModalEditBlog}
                setShow={setIsShowModalEditBlog}
                dataEditBlogs={dataEditBlogs}
            />

            <ModalDeleteBlog
                show={isShowModalDelBlog}
                setShow={setIsShowModalDelBlog}
                dataDelBlogs={dataDelBlogs}
            />

        </>
    );
}

export default TableBlogs;