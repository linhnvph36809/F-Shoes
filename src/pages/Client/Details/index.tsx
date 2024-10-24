import {ChevronDown, Heart, Star} from 'lucide-react';
import SlidesImage from './SlidesImage';
import {SwiperSlide} from 'swiper/react';
import SlidesScroll from '../../../components/SlidesScroll';
import Heading from '../HomePages/components/Heading';
import {useNavigate, useParams} from "react-router-dom";
import SkeletonComponent from "../../Admin/components/Skeleton";
import useProductDetail from "../../../hooks/page/useDetail.tsx";
import Price from "./Price.tsx";
import {IImage} from "../../../interfaces/IImage.ts";
import {formatPrice} from "../../../utils";

const Detail = () => {
    const {product, loading} = useProductDetail();
    const {slug} = useParams();
    const navigate = useNavigate();
    if(product){
        if (slug !== product?.slug) navigate('/');
    }
    const productD = product;
    let variationD;
    let imagesD:IImage[];

    //to test component replace if(variationD) below into => if(product && product?.variations)
    if(variationD){
        variationD = product.variations[0];
        imagesD = product.variations[0]?.images;
    }else{
        imagesD = product?.images;
    }


    return (
        <>
            {loading ? <div className="p-8"> <SkeletonComponent /> </div> : <section className="container">
                <div className="w-10/12 mx-auto flex py-20 gap-x-12">
                    <div className="w-7/12">
                        {imagesD && imagesD?.length > 0 ? (<SlidesImage images={imagesD}/>) : (
                            <img
                                src={productD?.image_url}
                                className="rounded hover:cursor-pointer"
                            />)}
                    </div>
                    <div className="flex-1">
                        <p className="text-[#d33918] text-16px font-medium">Sustainable Materials</p>
                        <h1 className="color-primary font-medium text-24px leading-normal">
                            {productD?.name}
                        </h1>

                        <h4 className="color-primary font-medium text-16px">{productD?.categories ? productD?.categories.map((cat, index, array) => {

                            if (array.length < 2) {
                                return ' ' + cat?.name;
                            } else {
                                if (index == 2) return;
                                if (index == 1) return ' ' + cat?.name;
                                return ' ' + cat?.name+',';
                            }
                        }) : ' '}</h4>
                        <Price product={productD} variation={variationD}/>

                        {/*<div className="grid md:grid-cols-6 gap-5 mb-10">*/}
                        {/*    <div>*/}
                        {/*        <img*/}
                        {/*            src="https://static.nike.com/a/images/t_PDP_144_v1/f_auto,q_auto:eco/90f458e7-38ac-4132-bb32-0aff816f891b/W+AIR+ZOOM+PEGASUS+41.png"*/}
                        {/*            alt=""*/}
                        {/*            className="border border-[#e5e5e5] rounded-lg hover:border-[#111111] transition-global hover:cursor-pointer"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {
                            productD?.attributes ? productD.attributes.map((item:any) => {
                                return <div key={item?.id}>
                                    <div className="flex-row-center justify-between pb-5">
                                        <p className="text-16px font-medium color-primary">Select {item.name}</p>
                                        {/*<p className="text-16px font-medium color-gray">*/}
                                        {/*    <a href="">Size Guide</a>*/}
                                        {/*</p>*/}
                                    </div>
                                    <div className="grid md:grid-cols-5 gap-5">
                                        {item?.values.map((value:any) => (
                                            <div key={value.id}
                                                className="h-[46px] flex-row-center justify-center p-2 border border-[#e5e5e5]
                                    text-16px color-priamry font-medium hover rounded-lg hover:border-[#111111] transition-global
                                    hover:cursor-pointer"
                                            >
                                                {' '}
                                                {/*{value.id}*/}
                                                {value.value}
                                            </div>
                                        ))}
                                    </div>
                                </div>;
                            }) : ''
                        }
                        <div className="my-20">
                            <button
                                className="bg-primary text-16px font-medium h-[58px] text-white
                                rounded-[30px] w-full hover-opacity transition-global"
                            >
                                Add to Bag
                            </button>
                            <button
                                className="text-16px font-medium h-[58px] color-primary border
                                hover:border-[#111111] rounded-[30px] w-full
                                transition-global mt-5 flex-row-center justify-center gap-x-2"
                            >
                                Favourite <Heart/>
                            </button>
                        </div>
                        <div>
                            {/*<p className="color-primary text-16px">*/}
                            {/*    The Nike Sunray Protect 2 Sandals deliver total toe coverage and outsole traction that's*/}
                            {/*    perfect for outdoor play. Hook-and-loop straps make on and off easy, while openings on*/}
                            {/*    the top of the shoe promote airflow when little feet get hot.*/}
                            {/*</p>*/}
                            {/*<ul className="list-disc list-outside pl-10 my-8">*/}
                            {/*    <li className="color-primary text-16px">Colour Shown: Black/White</li>*/}
                            {/*    <li className="color-primary text-16px">Style: 943827-001</li>*/}
                            {/*    <li className="color-primary text-16px">*/}
                            {/*        Country/Region of Origin: Indonesia, Vietnam*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                            {productD?.short_description}
                            <p className="color-primary text-16px font-medium underline">View Product Details</p>
                            <ul>
                                <li className="py-10 border-b">
                                    <div
                                        className="flex-row-center justify-between color-primary text-[18px]
                                        font-medium"
                                    >
                                        Free Delivery and Returns <ChevronDown/>
                                    </div>
                                    <div className="hidden">
                                        <p className="color-primary text-16px my-8">
                                            Your order of 5.000.000₫ or more gets free standard delivery.
                                        </p>
                                        <ul className="list-disc list-outside pl-10 my-8">
                                            <li className="color-primary text-16px">
                                                Standard delivered 4-5 Business Days
                                            </li>
                                            <li className="color-primary text-16px">
                                                Express delivered 2-4 Business Days
                                            </li>
                                        </ul>
                                        <p className="color-primary text-16px my-8">
                                            Orders are processed and delivered Monday-Friday (excluding public holidays)
                                        </p>
                                    </div>
                                </li>
                                <li className="py-10 border-b">
                                    <div
                                        className="flex-row-center justify-between color-primary text-[18px]
                                        font-medium"
                                    >
                                        Reviews (112)
                                        <div className="flex-row-center gap-x-4">
                                            <span className="flex-row-center gap-x-1">
                                                <Star className="w-[16px]"/>
                                                <Star className="w-[16px]"/>
                                                <Star className="w-[16px]"/>
                                                <Star className="w-[16px]"/>
                                            </span>
                                            <ChevronDown/>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="my-8">
                                            <div className="flex-row-center gap-x-6">
                                                <span className="flex gap-x-1">
                                                    <Star className="w-[16px]"/>
                                                    <Star className="w-[16px]"/>
                                                    <Star className="w-[16px]"/>
                                                    <Star className="w-[16px]"/>
                                                </span>
                                                <p className="color-primary text-16px">4.8 Stars</p>
                                            </div>
                                            <p className="color-primary text-16px font-medium underline mt-5">
                                                Write a Review
                                            </p>
                                            <div className="my-10">
                                                <p className="color-primary text-16px font-medium mb-3">Perfect</p>
                                                <div className="flex-row-center justify-between mb-5">
                                                    <span className="flex gap-x-1">
                                                        <Star className="w-[16px]"/>
                                                        <Star className="w-[16px]"/>
                                                        <Star className="w-[16px]"/>
                                                        <Star className="w-[16px]"/>
                                                    </span>
                                                    <p className="text-16px color-gray">AnnaJ212608790 - 23 May 2024</p>
                                                </div>
                                                <p className="color-primary text-16px">
                                                    These sandals are so cute. They're very light and airy can't be worn
                                                    in the water but I haven't tried it myself
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="my-20">
                    <div>
                        <Heading title="YOU MIGHT ALSO LIKE"/>
                        <SlidesScroll className="slidesProducts pb-20">
                            {productD?.suggestedProduct ? productD?.suggestedProduct?.map((item:any) => (
                                <SwiperSlide key={item.id}>
                                    <div>
                                        <a href={`${item.slug}`}>
                                            <div>
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-15px color-primary font-medium pt-4">
                                                    {item.name}
                                                </h3>
                                                <h5 className="text-[#707072] text-15px">{item?.categories ? item?.categories.map((cat:any, index, array) => {

                                                    if (array.length < 2) {
                                                        return ' ' + cat?.name;
                                                    } else {
                                                        if (index == 2) return;
                                                        if (index == 1) return ' ' + cat?.name;
                                                        return ' ' + cat?.name+',';
                                                    }
                                                }) : ' '}</h5>
                                                <h3 className="text-15px color-primary font-medium mt-3">{formatPrice(item.price)} ₫</h3>
                                            </div>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            )) : 'Nothing here.'}


                        </SlidesScroll>
                    </div>
                </div>
            </section>}
        </>
    );
};

export default Detail;
