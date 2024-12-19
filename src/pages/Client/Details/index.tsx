import { Helmet } from 'react-helmet';
import { Radio, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { LoadingOutlined } from '@ant-design/icons';

import SlidesImage from './SlidesImage';
import SlidesScroll from '../../../components/SlidesScroll';
import Heading from '../HomePages/components/Heading';
import Price from './Price.tsx';
import { IImage } from '../../../interfaces/IImage.ts';
import { formatPrice } from '../../../utils';
import useCart from '../../../hooks/useCart.tsx';
import { useContextGlobal } from '../../../contexts/index.tsx';
import LoadingSmall from '../../../components/Loading/LoadingSmall.tsx';
import LoadingPage from '../../../components/Loading/LoadingPage.tsx';
import useWishlist from '../../../hooks/useWishlist.tsx';
import Reviews from './Reviews.tsx';
import useQueryConfig from '../../../hooks/useQueryConfig.tsx';
import ModalViewDetail from './ModalViewDetail.tsx';
import { FormattedMessage } from 'react-intl';
import NotFound from '../../../components/NotFound/index.tsx';
import { showMessageClient } from '../../../utils/messages.ts';
import { QUERY_KEY } from '../../../hooks/useProduct.tsx';

const Detail = () => {
    const { slug } = useParams();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const { data, isFetching } = useQueryConfig([QUERY_KEY, `product-detail-${id}`], `/api/product/detail/${id}`);

    const products = data?.data;
    const { user } = useContextGlobal();
    const [idVariants, setIdVariants] = useState<number[]>([]);
    const [variant, setVariant] = useState<any>();
    const { loading: loadingAddCart, postCart } = useCart();
    const { loading: loadingWishlist, postWishlist } = useWishlist();
    const navigate = useNavigate();
    const [imagesD, setImagesD] = useState<IImage[]>([]);

    const productD = products;

    //to test component replace if(variationD) below into => if(product && product?.variations)

    const onChange = (e: any, index: number) => {
        const id = e.target.value;
        setIdVariants((preIds: number[]) => {
            preIds[index] = id;
            return [...preIds];
        });
    };

    const handleAddFavourite = (id: number) => {
        postWishlist(id);
    };

    const handleAddCart = () => {
        let datas;
        if (productD.variations.length) {
            datas = {
                user_id: user.id,
                product_id: null,
                quantity: 1,
                product_variation_id: variant?.id,
            };
        } else {
            datas = {
                user_id: user.id,
                product_id: productD?.id,
                quantity: 1,
                product_variation_id: null,
            };
        }
        postCart(datas);
    };

    const handleNotLogin = () => {
        showMessageClient('Log in before adding products to your favorites list', '', 'warning');
        navigate('/authentication');
    };

    useEffect(() => {
        if (idVariants.length == products?.attributes.length) {
            const results = products?.variations.find((variation: any) => {
                const newValues = variation.values.filter((value: any, _: number, values: any) => {
                    if (idVariants.length <= 1) {
                        return idVariants.includes(value.id);
                    } else {
                        return idVariants.every((id) => values.some((item: any) => item.id === id));
                    }
                });
                if (newValues.length) {
                    return variation;
                }
            });
            setVariant(results);
        }
    }, [idVariants, products]);
    useEffect(() => {
        if (variant?.images.length > 0) {
            setImagesD(variant?.images);
        } else {
            setImagesD(products?.images);
        }
    }, [variant, productD]);
    if (!products && !isFetching) {
        return (
            <>
                <NotFound />
            </>
        );
    }
    if (products) {
        if (slug !== products?.slug)
            return (
                <>
                    <NotFound />
                </>
            );
    }

    return (
        <>
            <Helmet>
                <title>{productD?.name}</title>
            </Helmet>
            {isFetching ? (
                <LoadingPage />
            ) : (
                <section className="container">
                    <div className="w-10/12 mx-auto flex py-20 gap-x-12">
                        <div className="w-7/12">
                            {imagesD && imagesD?.length > 0 ? (
                                <SlidesImage images={imagesD} />
                            ) : (
                                <img src={productD?.image_url} className="rounded hover:cursor-pointer" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-[#d33918] text-16px font-medium">
                                {<FormattedMessage id="title.Detail.Sustainable Materials" />}
                            </p>
                            <h1 className="color-primary font-medium text-24px leading-normal">{productD?.name}</h1>

                            <h4 className="color-primary font-medium text-16px">
                                {productD?.categories
                                    ? productD?.categories.map((cat: any, index: any, array: any) => {
                                        if (array.length < 2) {
                                            return ' ' + cat?.name;
                                        } else {
                                            if (index > 1) return '';
                                            if (index == 1) return ' ' + cat?.name;
                                            return ' ' + cat?.name + ',';
                                        }
                                    })
                                    : ' '}
                            </h4>
                            <Price product={variant || productD} variation={variant} />
                            {productD?.attributes
                                ? productD.attributes.map((item: any, index: number) => {
                                    return (
                                        <div key={item?.id} className="mb-6">
                                            <div className="flex-row-center justify-between pb-5">
                                                <p className="text-16px font-medium color-primary">
                                                    {<FormattedMessage id="body.Detail.Select" />} {item.name}
                                                </p>
                                            </div>

                                            <Radio.Group onChange={(e) => onChange(e, index)}>
                                                <div className="grid md:grid-cols-5 gap-5">
                                                    {item?.values.map((value: any, index: number) => (
                                                        <Radio.Button
                                                            key={index}
                                                            className="font-medium h-[45px] text-[16px]"
                                                            value={value.id}
                                                        >
                                                            {value.value}
                                                        </Radio.Button>
                                                    ))}
                                                </div>
                                            </Radio.Group>
                                        </div>
                                    );
                                })
                                : ''}
                            {variant?.stock_qty || variant?.stock_qty === 0 ? (
                                <p className="text-16px font-medium text-red-500">
                                    {<FormattedMessage id="body.Detail.Quantity" />} : {variant?.stock_qty}
                                </p>
                            ) : (
                                ''
                            )}
                            {productD?.variations.length ? (
                                ''
                            ) : (
                                <p className="text-16px font-medium text-red-500">
                                    {<FormattedMessage id="body.Detail.Quantity" />} : {productD?.stock_qty}
                                </p>
                            )}
                            {user ? (
                                ''
                            ) : (
                                <Link to="/authentication" className="text-16px font-medium mt-10 block underline">
                                    Login & Register
                                </Link>
                            )}
                            <div className="my-20">
                                <button
                                    onClick={
                                        user
                                            ? (productD?.variations?.length == 0 && productD?.stock_qty) ||
                                                (variant && variant?.stock_qty)
                                                ? handleAddCart
                                                : () => { }
                                            : () => {
                                                showMessageClient(
                                                    'Login before adding products to cart',
                                                    '',
                                                    'warning',
                                                );
                                                navigate('/authentication');
                                            }
                                    }
                                    className={`${user
                                        ? (productD?.variations?.length == 0 && productD?.stock_qty) ||
                                            (variant && variant?.stock_qty)
                                            ? 'bg-primary'
                                            : 'bg-[#f4f4f4] cursor-default'
                                        : 'bg-[#f4f4f4] cursor-default'
                                        }           text-16px font-medium h-[58px] text-white
                                                rounded-[30px] w-full hover-opacity transition-global`}
                                >
                                    {loadingAddCart ? <LoadingSmall /> : <FormattedMessage id="body.Detail.addtobag" />}
                                </button>

                                <button
                                    onClick={() => {
                                        user ? handleAddFavourite(productD.id) : handleNotLogin();
                                    }}
                                    className="h-[58px] color-primary border
                                    hover:border-[#111111] rounded-[30px] w-full
                                    transition-global mt-5 flex-row-center justify-center gap-x-2"
                                >
                                    {loadingWishlist ? (
                                        <Spin
                                            indicator={<LoadingOutlined spin className="text-black" />}
                                            size="default"
                                        />
                                    ) : (
                                        <div className="flex gap-x-5 items-center text-16px font-medium">
                                            <Heart /> {<FormattedMessage id="body.Detail.Favourite" />}
                                        </div>
                                    )}
                                </button>
                            </div>
                            <div>
                                <div
                                    className="text-[18px] mb-20"
                                    dangerouslySetInnerHTML={{ __html: productD?.short_description }}
                                ></div>
                                <ModalViewDetail product={products} />
                                <Reviews productId={productD?.id} />
                            </div>
                        </div>
                    </div>
                    <div className="my-20">
                        <div>
                            <Heading title={<FormattedMessage id="body.Detail.YOU MIGHT ALSO LIKE" />} />
                            <SlidesScroll className="slidesProducts pb-20">
                                {productD?.suggestedProduct
                                    ? productD?.suggestedProduct?.map((item: any) => (
                                        <SwiperSlide key={item.id}>
                                            <div>
                                                <Link to={`${item.slug}`} className="flex flex-col justify-between">
                                                    <div>
                                                        <img src={item.image_url} alt={item.name} className="h-[678px] object-cover" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-15px color-primary font-medium pt-4">
                                                            {item.name}
                                                        </h3>
                                                        <h5 className="text-[#707072] text-15px">
                                                            {item?.categories
                                                                ? item?.categories.map(
                                                                    (cat: any, index: any, array: any) => {
                                                                        if (array.length < 2) {
                                                                            return ' ' + cat?.name;
                                                                        } else {
                                                                            if (index > 1) return '';
                                                                            if (index == 1) return ' ' + cat?.name;
                                                                            return ' ' + cat?.name + ',';
                                                                        }
                                                                    },
                                                                )
                                                                : ' '}
                                                        </h5>
                                                        <h3 className="text-15px color-primary font-medium mt-3">
                                                            {formatPrice(item.price)} ₫
                                                        </h3>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                    : 'Nothing here.'}
                            </SlidesScroll>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Detail;
