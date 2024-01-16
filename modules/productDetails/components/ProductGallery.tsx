import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { cloudinaryLoader } from '@/common/lib/cloudinaryLoader';
import { galleryVariants } from '../animations/ProductGallery.animations';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface ProductSlickProps {
  images: { name: string; image: string }[];
}

interface ImageItem {
  name: string;
  image: string;
}

const ProductGallery = ({
  images,
  // blurDataUrls,
}: {
  images: ImageItem[];
  // blurDataUrls: { [key: string]: string };
}) => {
  const [initial, setInitial] = useState(true);

  const [[imageIndex, direction], setImage] = useState([0, 0]);

  useEffect(() => {
    setInitial(false);
  }, []);

  const paginate = (newDirection: number) => {
    let newIndex = imageIndex + newDirection;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex > images.length - 1) newIndex = 0;

    setImage([newIndex, newDirection]);
  };


  return (
    <div className="relative h-full">
      <motion.div
        key={imageIndex}
        custom={direction}
        variants={galleryVariants}
        initial={!initial && 'enter'}
        animate="center"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(_, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
          }
        }}
        className="h-full w-full"
      >
        <Image
          // loader={cloudinaryLoader}
          alt="Detail photo"
          width={880}
          height={1100}
          src={images[imageIndex].image}
          className="pointer-events-none object-cover"
          layout="raw"
          priority
        // placeholder="blur"
        // blurDataURL={blurDataUrls[images[imageIndex].attributes.hash]}
        />
      </motion.div>
      <button
        className="absolute top-1/2 left-3 p-2 transition-all hover:scale-125"
        onClick={() => paginate(-1)}
      >
        <AiOutlineLeft />
      </button>
      <button
        className="absolute top-1/2 right-3 p-2 transition-all hover:scale-125"
        onClick={() => paginate(1)}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default ProductGallery;
