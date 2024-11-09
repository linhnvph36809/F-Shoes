import {Outlet} from "react-router-dom";
import Navbar from "../Components/Navbar.tsx";


const Layout = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <Navbar/>
            <Outlet/>
        </div>

    )
        ;
};

export default Layout;