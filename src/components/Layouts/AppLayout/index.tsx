import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <section className="container p-0">
            <Outlet />
        </section>
    );
};

export default AppLayout;
