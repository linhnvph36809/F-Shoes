import { QUERY_KEY } from '../../../hooks/useCategory';
import { API_POST } from '../../../hooks/usePosts';
import useQueryConfig from '../../../hooks/useQueryConfig';

const Header = () => {
    const { data: posts2 } = useQueryConfig([QUERY_KEY, `list-posts`], API_POST);
    console.log(posts2);
    return (
        <div className="bg-black text-white p-6 py-16 flex items-start gap-x-10">
            {' '}
            {/* Giảm padding dọc */}
            <div className="w-5/12">
                <img
                    src="https://res.cloudinary.com/dmubfrefi/image/private/s--Y0WMlp47--/c_crop,h_2136,w_3200,x_0,y_394/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/674d10df-6b4b-42af-8785-6793985264fe/2025-ekiden-collection.jpeg?_a=BAAAV6Bs"
                    alt=""
                    className="w-full object-cover"
                />
            </div>
            <div className="w-8/12">
                {/* Cột bên trái */}
                <div className="lg:w-1/3 flex flex-col">
                    {' '}
                    {/* Thêm mt-auto nếu cần */}
                    <h1 className="text-white text-15px">31 tháng 10, 2024</h1>
                </div>
                {/* Cột bên phải */}
                <div className="lg:w-2/3">
                    {/* Tiêu đề */}
                    <h1 className="text-white text-48px font-black ">
                        Nike Extends Support for Kenyan Athletes, Providing Emergency Medical and Rescue Services
                    </h1>
                </div>
            </div>
        </div>
    );
};

const NewsList = () => {
    const { data: posts } = useQueryConfig([QUERY_KEY, `list-posts`], API_POST);
    return (
        <div className=" flex flex-wrap mx-4 px-4 ">
            {posts?.data?.map((po: any) => (
                <div key={po.id} className="w-full md:w-1/3 p-4">
                    <a
                        href={`${po.slug}`}
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
    );
};
function PostDetail() {
    return (
        <div className="">
            <Header />
            <section className="text-center py-10">Content</section>
            <NewsList />
        </div>
    );
}
export default PostDetail;
