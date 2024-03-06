import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListUsers } from '../redux/User/user.slide';
import './TableUser.scss'
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';

const TableUser = () => {

    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.user.listUsers);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataEdit, setDataEdit] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        dispatch(fetchListUsers())
    }, [])

    const handleAddNew = () => {
        setIsShowModalAddNew(true)
    }

    const handleEdit = (item: any) => {
        setIsShowModalEdit(true)
        setDataEdit(item);
    }

    const handleDelete = (item: any) => {
        setIsShowModalDelete(true)
        setDataDelete(item)
    }

    return (
        <>
            <div className='title'>
                <label className='tableUser'>Table Users</label>
                <button
                    className='btn btn-primary'
                    onClick={() => handleAddNew()}
                >
                    Add New
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning mx-3'
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className='btn btn-danger'
                                            onClick={() => handleDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>

            <ModalAddNew
                show={isShowModalAddNew}
                setShow={setIsShowModalAddNew}
            />

            <ModalEdit
                show={isShowModalEdit}
                setShow={setIsShowModalEdit}
                dataEdit={dataEdit}
            />

            <ModalDelete
                show={isShowModalDelete}
                setShow={setIsShowModalDelete}
                dataDelete={dataDelete}
            />
        </>
    );
}

export default TableUser;