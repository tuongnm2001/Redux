import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListUsers } from '../redux/User/user.slide';


const BasicExample = () => {

    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.user.listUsers);

    useEffect(() => {
        dispatch(fetchListUsers())
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
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
                            </tr>
                        )
                    })
                }

            </tbody>
        </Table>
    );
}

export default BasicExample;