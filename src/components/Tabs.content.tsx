import { Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TableUser from './Table.user'

const TabsContent = () => {
    return (
        <Container>
            <Tabs
                defaultActiveKey="users"
                id="uncontrolled-tab-example"
                className="mb-3 mt-3"
            >
                <Tab eventKey="users" title="Users">
                    <TableUser />
                </Tab>
                <Tab eventKey="blogs" title="Blogs">
                    Tab content for Profile
                </Tab>

            </Tabs>
        </Container>

    );
}

export default TabsContent;