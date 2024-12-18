import { useParams } from 'react-router-dom';
import { API_POST } from '../../../hooks/usePosts';
import useQueryConfig from '../../../hooks/useQueryConfig';

const Header = ({ data }: any) => {
    console.log(data);
    return (
        <div className="bg-black text-white p-10 py-16 flex items-start gap-x-10">
            {' '}
            {/* Giảm padding dọc */}
            <div className="w-5/12">
                <img src={data?.data?.theme} alt="" className="w-full object-cover" />
            </div>
            <div className="w-8/12">
                {/* Cột bên trái */}
                <div className="lg:w-1/3 flex flex-col">
                    {' '}
                    {/* Thêm mt-auto nếu cần */}
                    <h1 className="text-white text-15px">{data?.data?.created_at}</h1>
                </div>
                {/* Cột bên phải */}
                <div className="lg:w-2/3">
                    {/* Tiêu đề */}
                    <h1 className="text-white text-48px font-black">{data?.data?.title}</h1>
                </div>
            </div>
        </div>
    );
};

const NewsList = () => {
    const { data: posts } = useQueryConfig([`KEY_POST_DETAIL`, `list-posts`], API_POST);
    return (
        <div className=" flex flex-wrap">
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
    const { slug } = useParams();

    const { data: post2 } = useQueryConfig([`key-post-detail`, `post-detail-${slug}`], `/api/posts/${slug}`);
    console.log(post2);
    return (
        <div className="">
            <Header data={post2} />
            <p
                className="text-font nav-color text-[15px] text-justify p-10"
                dangerouslySetInnerHTML={{ __html: post2?.data.content }}
            ></p>
            <NewsList />
        </div>
    );
}
export default PostDetail;
