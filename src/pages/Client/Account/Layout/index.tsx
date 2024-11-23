import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar.tsx';

const Layout = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="px-[15px] w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
