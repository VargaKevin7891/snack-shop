import { Container, Box } from '@mui/material';
import Orders from '../../components/admin/AdminOrdersList';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminOrders() {
    return (
        <Container className="dashboard-container">
            <AdminHeader title="Orders" subtitle="See all the orders and their details" children={null}/>
            <Container>
                <Box>
                    <Orders isAll={true}/>
                </Box>
            </Container>
        </Container>
    );
};