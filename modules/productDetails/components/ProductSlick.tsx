import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface ProductSlickProps {
    images: { name: string; image: string }[];
}

interface ImageItem {
    // id: number;
    name: string;
    image: string;
}

const ProductSlick: React.FC<ProductSlickProps> = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // dotsClass: "slick-dots slick-thumb",
        // customPaging: function (i: any) {
        //     console.log(i);

        //     // return (
        //     //   <a>
        //     //     <img src={`${baseUrl}/abstract0${i + 1}.jpg`} />
        //     //   </a>
        //     // );
        // },
    };

    // console.log(images);

    return (
        <div className="relative h-full">
            <Slider {...settings}>
                {images.map((item: ImageItem, index: number) => {
                    console.log(item);

                    return (
                        <div key={index}>
                            {/* <Image
                                layout="raw"
                                width={880}
                                height={1100}
                                src={item?.image}
                                alt={item?.name}
                                quality={75}
                                className="pointer-events-none object-cover"
                            /> */}
                            <img src={item?.image} alt={item?.name} />
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
};

export default ProductSlick;
