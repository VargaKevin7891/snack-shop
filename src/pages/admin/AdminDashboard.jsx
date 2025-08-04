import { Container, Box } from '@mui/material';
import AdminDashboardCard from '../../components/admin/AdminDashboardCard';
import RecentOrders from '../../components/admin/AdminOrdersList';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminDashboard() {
    return (
        <Container className="dashboard-container">
            <AdminHeader title="Dashboard" subtitle="See statistics of your webshop" children={null}/>
            <Container className="dashboard-cards">
                <AdminDashboardCard />
            </Container>
            <Container>
                <Box>
                    <RecentOrders isAll={false}/>
                </Box>
            </Container>
        </Container>
    );
};