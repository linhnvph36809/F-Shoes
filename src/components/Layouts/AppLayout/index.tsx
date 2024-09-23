import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <section className="container">
            <Outlet />
        </section>
    );
};

export default AppLayout;
