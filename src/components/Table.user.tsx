import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';

interface IUser {
    id: number,
    name: string,
    email: string
}
const BasicExample = () => {

    const [listUsers, setListUsers] = useState<IUser[]>([])

    useEffect(() => {
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        let res = await fetch('http://localhost:8000/users');
        const data = await res.json();
        setListUsers(data)
    }

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
                    listUsers?.map((item, index) => {
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