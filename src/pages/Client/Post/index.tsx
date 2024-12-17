// src/index.js
import { useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination } from 'antd';
import { FormattedMessage } from 'react-intl';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { API_POST, QUERY_KEY } from '../../../hooks/usePosts';

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

const NewsList = () => {
    const { data: posts } = useQueryConfig([QUERY_KEY, `list-posts`], API_POST);
    console.log(posts);
    const [current, setCurrent] = useState(1);

    const onPageChange = (page: any) => {
        setCurrent(page);
        // Xử lý phân trang hoặc tải dữ liệu mới ở đây nếu cần
    };

    return (
        <div className="container  px-4 mt-4">
            <div className=" flex flex-wrap mx-4 px-4 ">
                {posts?.data?.map((po: any) => (
                    <div key={po.id} className="w-full md:w-1/3 p-4">
                        <a
                            href={`post-detail/${po.slug}`}
                            className="inline-block border rounded-full px-6 py-2 text-15px font-medium text-gray-700 hover:bg-gray-100"
                        >
                            <div className="bg-white border-none shadow-none overflow-hidden">
                                <img alt="example" src={po.theme} className="w-full h-[300px] object-cover" />
                                <div className="p-4">
                                    <p className="text-gray-500 text-15px">Release</p>
                                    <h3 className="text-20px font-bold text-gray-700 mt-2">{po.title}</h3>
                                    <p className="text-gray-600 text-15px">{po.created_at}</p>
                                </div>
                            </div>
                        </a>
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
