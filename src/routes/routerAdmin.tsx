import LayoutAdmin from '../components/Layouts/LayoutAdmin';
import AdminDashboard from '../pages/Admin/DashboardAdmin';

const routerAdmin = [
    {
        path: '/admin', // Đường dẫn chính cho admin
        element: <LayoutAdmin />, // Layout tổng thể cho phần admin
        children: [
            {
                path: '', // /admin
                element: <AdminDashboard />,
            },
        ],
    }
]

export default routerAdmin;
