import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PropsItem {
    name: string;
    url: string;
}

const Item = [
    {
        name: 'Profile',
        url: '/profile',
    },
    {
        name: 'Orders',
        url: '/profile/orders',
    },
    {
        name: 'Setting',
        url: '/profile/setting',
    },
];

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState('');
    const getMenuClass = (menu: string) => {
        return activeMenu === menu
            ? 'inline-block py-7 relative text-[16px] font-medium text-gray-500'
            : 'inline-block py-7 relative text-[16px] font-medium color-primary after:transition-all after:duration-300 after:ease-linear after:absolute after:bottom-5 after:w-0 after:h-[2px] after:left-0 after:right-0 after:bg-[#111111] hover:after:w-full nav__menu';
    };
    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);
    };
    return (
        <nav className="w-full bg-white p-4 flex justify-center items-center">
            <ul className="flex space-x-6 items-center">
                {Item.map((item: PropsItem, index) => (
                    <li className={getMenuClass(item.name)} key={index}>
                        <Link to={`${item.url}`} onClick={() => handleMenuClick(item.name)}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
