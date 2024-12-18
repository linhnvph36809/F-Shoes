import { SwiperSlide } from 'swiper/react';
import './style.scss';
import Heading from './Heading';
import SlidesScroll from './../../../components/SlidesScroll/index';
import MemberBenefits from './MemberBenefits';
import { IProduct } from '../../../interfaces/IProduct.ts';
import SkeletonComponent from '../../Admin/components/Skeleton';
import { formatPrice, formatTime } from '../../../utils';
import useCookiesConfig from '../../../hooks/useCookiesConfig.tsx';
import { COOKIE_USER } from '../../../constants';
import { IUser } from '../../../interfaces/IUser.ts';
import useQueryConfig from '../../../hooks/useQueryConfig.tsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { FormattedMessage } from 'react-intl';
import { QUERY_KEY as QUERY_KEY_PROFILE } from '../../../hooks/page/useProfile.tsx';
import { tokenManagerInstance } from '../../../api/index.tsx';
import { showMessageActive, showMessageClient } from '../../../utils/messages.ts';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const ProfilePage = () => {
    const { cookies } = useCookiesConfig(COOKIE_USER);
    const userNameCookie = cookies?.userName;
    const { data, isFetching, refetch } = useQueryConfig(
        [QUERY_KEY_PROFILE, 'user-profile'],
        'api/auth/me?include=profile,favoriteProducts&times=user',
        {
            cacheTime: 1000 * 60 * 10,
            staleTime: 1000 * 60 * 10,
        },
    );

    let userD: IUser = {
        id: '',
        avatar_url: '',
        nickname: '',
        name: '',
        email: '',
        email_verified_at: '',
        google_id: '',
        status: '',
        profile: {
            given_name: '',
            family_name: '',
            detail_address: '',
            birth_date: '',
        },
        favoriteProducts: [],
        created_at: '',
    };

    if (data?.data.user) {
        userD = data?.data.user;
    }
    let listFavoriteProducts: Array<IProduct> = [];

    if (data?.data.user.favoriteProducts) {
        listFavoriteProducts = data?.data.user.favoriteProducts;
    }

    const [loadingUploadImage, setLoadingUploadImage] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoadingUploadImage(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoadingUploadImage(false);
                setImageUrl(url);
            });
        }
        refetch();
    };
    // Upload avatar
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loadingUploadImage ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const handleRemoveFavorite = async (id: any) => {
        showMessageActive(
            'Bạn có chắc chắn muốn xoá sản phẩm này khỏi danh sách yêu thích?',
            '',
            'warning',
            async () => {
                try {
                    await tokenManagerInstance('delete', `/api/user/remove-favorite/product/${id}`);
                    showMessageClient('Đã xoá sản phẩm khỏi danh sách yêu thích.', '', 'success');
                    refetch();
                } catch (error) {
                    showMessageClient('Error', (error as any).message, 'error');
                }
            },
        );
    };
    return (
        <>
            <div className="bg-white w-full p-6 mt-0 rounded-lg shadow-md relative">
                <div className="flex items-center">
                    <div className="w-40 h-40 bg-gray-200 rounded-full avatar-image">
                        <div className={`absolute ${loadingUploadImage ? '' : 'opacity-0'} upload-avatar`}>
                            <Flex gap="middle" wrap>
                                <Upload
                                    name="avatar"
                                    accept=".jpg,.jpeg,.png"
                                    listType="picture-circle"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="http://127.0.0.1:8000/api/update/user/avatar"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    disabled={loadingUploadImage}
                                    headers={{
                                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                    }}
                                >
                                    {imageUrl ? '' : uploadButton}
                                </Upload>
                            </Flex>
                        </div>
                        <img className="w-full h-full object-cover rounded-full" src={userD?.avatar_url} alt="" />
                    </div>
                    <div className="ml-8">
                        <Heading title={userD.name ? userD.name : userNameCookie} />
                        <p className="text-[16px] font-medium text-gray-500">
                            {<FormattedMessage id="Profile.Fshoes Member Since" />} {formatTime(userD?.created_at)}
                        </p>
                    </div>
                </div>
                <div className="my-20">
                    <div>
                        <Heading title={<FormattedMessage id="body.Detail.Favourite" />} />
                        {isFetching ? (
                            <div className="py-10">
                                <SkeletonComponent />
                            </div>
                        ) : (
                            <SlidesScroll className="slidesProducts pb-40 mt-[50px]">
                                {listFavoriteProducts.length ? (
                                    listFavoriteProducts.map((item: IProduct) => (
                                        <SwiperSlide>
                                            <div className="p-6 relative">
                                                <div className="relative h-[500px] group">
                                                    <img
                                                        src={item.image_url}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    {/* Icon Xoá Chỉ Hiển Thị Trên Ảnh */}
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <DeleteOutlined
                                                            onClick={() => handleRemoveFavorite(item.id)}
                                                            className="text-white text-40px cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="p-3 flex justify-between items-center">
                                                    <h3 className="text-[18px] text-primary font-medium">
                                                        {item.name}
                                                    </h3>
                                                    <h3 className="text-[15px] text-primary font-medium">
                                                        {formatPrice(item.price)} ₫
                                                    </h3>
                                                </div>
                                                <a
                                                    href={`detail/${item.slug}`}
                                                    className="inline-block border rounded-full px-6 py-2 text-15px font-medium text-gray-700 hover:bg-gray-100"
                                                >
                                                    Xem sản phẩm
                                                </a>
                                                <div className="px-3 pb-3">
                                                    <h5 className="text-[#707072] text-[14px]">
                                                        {item?.categories
                                                            ? item?.categories.map((cat, index, array) => {
                                                                  if (array.length < 2) {
                                                                      return ' ' + cat?.name;
                                                                  } else {
                                                                      if (index === 2) return;
                                                                      if (index === 1) return ' ' + cat?.name;
                                                                      return ' ' + cat?.name + ',';
                                                                  }
                                                              })
                                                            : ' '}
                                                    </h5>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <p className="text-center text-[16px] font-medium">
                                        {<FormattedMessage id="noFavorites" />}{' '}
                                        <Link className="underline" to="/category">
                                            {' '}
                                            {<FormattedMessage id="addFavorites" />}
                                        </Link>
                                    </p>
                                )}
                            </SlidesScroll>
                        )}
                    </div>
                </div>
                <MemberBenefits />
            </div>
        </>
    );
};

export default ProfilePage;
