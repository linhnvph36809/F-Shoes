// src/index.js
import { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination } from 'antd';
import { FormattedMessage } from 'react-intl';

const Header = () => (
    <div className="bg-black text-white py-16">
        <div className="mt-8">
            <h1 className="text-72px font-black text-center">NIKE, INC.</h1>
            <h1 className="text-72px font-black text-center">NEWSROOM</h1>
        </div>
        <div className="container mx-auto">
            <div className="flex items-center bg-gray-600 rounded-full px-12 py-2 mb-2">
                {/* Điều hướng */}
                <nav className="flex space-x-8 text-gray-300 flex-grow">
                    <a href="#" className="hover:text-white text-16px">
                        {<FormattedMessage id="body.category.All" />}
                    </a>
                    <a href="#" className="hover:text-white text-16px">
                        {<FormattedMessage id="Post_Press Releases" />}
                    </a>
                    <a href="#" className="hover:text-white text-16px">
                        {<FormattedMessage id="Post_Collections" />}
                    </a>
                </nav>

                {/* Input tìm kiếm */}
                <div className="flex items-center ml-auto ">
                    {' '}
                    {/* Thêm khoảng cách bên phải */}
                    <Input
                        placeholder="Search"
                        className="bg-gray-900 text-white border-none focus:outline-none placeholder-gray-800 px-4 rounded-full"
                        style={{ width: 300 }}
                        suffix={<SearchOutlined style={{ color: 'white' }} />}
                    />
                </div>
            </div>
        </div>
    </div>
);

const articles = [
    {
        image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--Y0WMlp47--/c_crop,h_2136,w_3200,x_0,y_394/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/674d10df-6b4b-42af-8785-6793985264fe/2025-ekiden-collection.jpeg?_a=BAAAV6Bs', // Thay bằng URL ảnh của bạn
        title: 'Nike Tech Woven Suit Delivers a Premium Update to a Classic Sportswear Staple',
        date: 'October 03, 2024',
    },
    {
        image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--IIOvEpE0--/c_crop,h_1782,w_2676,x_254,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/d242681f-6772-443e-a8d7-4b0cad9ee4bd/alissa-pili-1.jpeg?_a=BAAAV6Bs', // Thay bằng URL ảnh của bạn
        title: 'Nike Vomero Advances Retro Running Style with New Colors and Weatherized Silhouette',
        date: 'October 02, 2024',
    },
    {
        image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--65H3hXEZ--/c_crop,h_1438,w_2158,x_568,y_375/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/ee9ee7ab-d683-48d4-a9c5-ba2ff8811fbf/mds-mercurial-superfly-1.jpeg?_a=BAAAV6Bs', // Thay bằng URL ảnh của bạn
        title: 'Ja Morant’s Second Signature Shoe, the Ja 2, is Built for the Next Generation ',
        date: 'September 25, 2024',
    },
    {
        image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--Y0WMlp47--/c_crop,h_2136,w_3200,x_0,y_394/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/674d10df-6b4b-42af-8785-6793985264fe/2025-ekiden-collection.jpeg?_a=BAAAV6Bs', // Thay bằng URL ảnh của bạn
        title: 'Nike Tech Woven Suit Delivers a Premium Update to a Classic Sportswear Staple',
        date: 'October 03, 2024',
    },
    {
        image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--IIOvEpE0--/c_crop,h_1782,w_2676,x_254,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/d242681f-6772-443e-a8d7-4b0cad9ee4bd/alissa-pili-1.jpeg?_a=BAAAV6Bs', // Thay bằng URL ảnh của bạn
        title: 'Nike Vomero Advances Retro Running Style with New Colors and Weatherized Silhouette',
        date: 'October 02, 2024',
    },
    {
        image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--65H3hXEZ--/c_crop,h_1438,w_2158,x_568,y_375/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/ee9ee7ab-d683-48d4-a9c5-ba2ff8811fbf/mds-mercurial-superfly-1.jpeg?_a=BAAAV6Bs', // Thay bằng URL ảnh của bạn
        title: 'Ja Morant’s Second Signature Shoe, the Ja 2, is Built for the Next Generation ',
        date: 'September 25, 2024',
    },

    // Thêm các bài viết khác nếu cần
];

const NewsList = () => {
    const [current, setCurrent] = useState(1);

    const onPageChange = (page: any) => {
        setCurrent(page);
        // Xử lý phân trang hoặc tải dữ liệu mới ở đây nếu cần
    };

    return (
        <div className="container  px-4 mt-4">
            <div className=" flex flex-wrap mx-4 px-4 ">
                {articles.map((article, index) => (
                    <div className="w-full md:w-1/3 p-4">
                        <div className="bg-white border-none shadow-none overflow-hidden">
                            <img alt="example" src={article.image} className="w-full h-[300px] object-cover" />
                            <div className="p-4">
                                <p className="text-gray-500 text-15px">Release</p>
                                <h3 className="text-20px font-bold text-gray-700 mt-2">{article.title}</h3>
                                <p className="text-gray-600 text-15px">{article.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Pagination
                    current={current}
                    onChange={onPageChange}
                    total={50} // Giả sử tổng số bài viết là 50
                    pageSize={3} // Số bài viết mỗi trang
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

function Post() {
    return (
        <div className=" bg-white">
            <Header />
            <NewsList />
        </div>
    );
}
export default Post;
