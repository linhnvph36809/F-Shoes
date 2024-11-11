import Heading from './Heading';
import { SwiperSlide } from 'swiper/react';
import SlidesScroll from './../../../components/SlidesScroll/index';
import MemberBenefits from './MemberBenefits';
import useProfile from "../../../hooks/page/useProfile.tsx";
import {IProduct} from "../../../interfaces/IProduct.ts";
import SkeletonComponent from "../../Admin/components/Skeleton";
import { formatPrice,formatTime } from '../../../utils';
import useCookiesConfig from "../../../hooks/useCookiesConfig.tsx";
import {COOKIE_USER} from "../../../constants";
import {IUser} from "../../../interfaces/IUser.ts";

const ProfilePage = () => {
    const { cookies } = useCookiesConfig(COOKIE_USER);

    const userNameCookie = cookies?.userName;

    const {currentUser,favoriteProducts,loading} = useProfile();

    let userD:IUser = {
        id: "",
        avatar_url: "",
        nickname:"",
        name:"",
        email: "",
        email_verified_at: "",
        google_id: "",
        status:"",
        profile: {
            given_name:'',
            family_name:'',
            detail_address: '',
            birth_date: ''
        },
        favoriteProducts: [],
        created_at: ""
    };
    if(currentUser){
        userD = currentUser;
    }
    let listFavoriteProducts:Array<IProduct> = [];
    if(favoriteProducts){
        listFavoriteProducts = favoriteProducts;
    }

    //const [activeInterest, setActiveInterest] = useState('All');
    // const handleInterestClick = (interest:any) => {
    //     setActiveInterest(interest);
    // };



    // const getInterestButtonClass = (interest:any) => {
    //     return activeInterest === interest
    //         ? 'px-4 py-2 bg-white text-black rounded font-medium border-2 border-black'
    //         : 'px-4 py-2 rounded hover:border-gray-300 hover:bg-gray-100 color-gray';
    // };

    return (
        <>
            {/* Profile Info - Full Width */}
            <div className="bg-white w-full p-6 mt-0 rounded-lg shadow-md relative">
                <div className="flex items-center">
                    <div className="w-40 h-40 bg-gray-200 rounded-full ">
                        {' '}
                        {/* Thêm overflow-hidden */}
                        <img
                            className="w-full h-full object-cover"
                            src={userD?.avatar_url}
                            alt=""
                        />
                    </div>
                    <div className="ml-8">
                        <Heading title={userD.name ? userD.name : userNameCookie} />
                        <p className="text-[16px] font-medium text-gray-500">Fshoes Member Since {formatTime(currentUser?.created_at)}</p>
                    </div>
                </div>

                {/* Interests Section */}
                {/*<div className="mt-[50px] flex justify-between items-center w-full">*/}
                {/*    <h3 className="text-[22px] font-medium">Interests</h3>*/}
                {/*    <button className="text-black text-[16px] font-medium hover:text-gray-600">Edit</button>*/}
                {/*</div>*/}

                {/*/!* Interest Buttons *!/*/}
                {/*<div className="flex space-x-6 mb-4 mt-[50px] text-[16px] font-medium">*/}
                {/*    <button className={getInterestButtonClass('All')} onClick={() => handleInterestClick('All')}>*/}
                {/*        All*/}
                {/*    </button>*/}
                {/*    <button className={getInterestButtonClass('Sports')} onClick={() => handleInterestClick('Sports')}>*/}
                {/*        Sports*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        className={getInterestButtonClass('Products')}*/}
                {/*        onClick={() => handleInterestClick('Products')}*/}
                {/*    >*/}
                {/*        Products*/}
                {/*    </button>*/}
                {/*    <button className={getInterestButtonClass('Teams')} onClick={() => handleInterestClick('Teams')}>*/}
                {/*        Teams*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        className={getInterestButtonClass('Athletes')}*/}
                {/*        onClick={() => handleInterestClick('Athletes')}*/}
                {/*    >*/}
                {/*        Athletes*/}
                {/*    </button>*/}
                {/*    <button className={getInterestButtonClass('Cities')} onClick={() => handleInterestClick('Cities')}>*/}
                {/*        Cities*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/*<hr className="my-4 border-gray-300" />*/}

                {/*<p className="color-black text-[16px] font-medium my-[20px]">*/}
                {/*    Add your interests to shop a collection of products that are based on what you're into.*/}
                {/*</p>*/}

                {/* Interest Items */}
                {/*<div className="grid grid-cols-4 gap-8 mt-6">*/}
                {/*    {' '}*/}
                {/*    /!* Increased gap here *!/*/}
                {/*    <div className="bg-gray-200 h-[320px] flex items-center justify-center">*/}
                {/*        <span className="text-[18px] font-medium text-gray-500">Add Interests</span>*/}
                {/*    </div>*/}
                {/*    <div className="bg-gray-200 h-[320px]"></div>*/}
                {/*    <div className="bg-gray-200 h-[320px]"></div>*/}
                {/*    <div className="bg-gray-200 h-[320px]"></div>*/}
                {/*</div>*/}
                <div className="my-20 p-[60px]">
                    <div>
                        <Heading title="Favourites" />
                        {loading ? (<div className="py-8"><SkeletonComponent/></div>) :
                            <SlidesScroll className="slidesProducts pb-20 mt-[50px]">
                            {listFavoriteProducts.map((item:IProduct) => (
                                <SwiperSlide>
                                    <div>
                                        <a  href={`detail/${item.slug}`}>
                                            <div>
                                                <img
                                                    src={item.image_url}
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-15px color-primary font-medium pt-4">
                                                    {item.name}
                                                </h3>
                                                <h5 className="text-[#707072] text-15px">{item?.categories
                                                    ? item?.categories.map((cat, index, array) => {
                                                        if (array.length < 2) {
                                                            return ' ' + cat?.name;
                                                        } else {
                                                            if (index == 2) return;
                                                            if (index == 1) return ' ' + cat?.name;
                                                            return ' ' + cat?.name + ',';
                                                        }
                                                    })
                                                    : ' '}</h5>
                                                <h3 className="text-15px color-primary font-medium mt-3">{formatPrice(item.price)} ₫</h3>
                                            </div>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            ))}


                        </SlidesScroll>}
                    </div>
                </div>
                {/* Member Benefits */}
                <MemberBenefits />
            </div>
        </>
    );
};

export default ProfilePage;
