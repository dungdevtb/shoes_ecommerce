import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTimeoutFn } from 'react-use';
import { defaultEase } from '@/common/animations/easings';
import { cloudinaryLoader } from '@/common/lib/cloudinaryLoader';

// interface Props extends SimpleProduct {
//   blurDataUrl: string;
//   record: any,
//   key: any,
// }

interface Props {
  // blurDataUrl: string;
  record: any,
  key: any,
}

const ProductComponent = ({
  // id,
  // attributes: {
  //   name,
  //   price,
  //   promotionPrice,
  //   category,
  //   images: {
  //     data: [image],
  //   },
  //   slug,
  // },
  record,
  key,
  // blurDataUrl,
}: Props) => {
  const [active, setActive] = useState(false);
  const [overflow, setOverflow] = useState(false);

  useTimeoutFn(() => {
    setOverflow(true);
  }, 200);

  let idString = record?.id.toString();

  const formatMoney = (num: any) => {
    if (!num || num === "") return "0"
    return Number(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <motion.div className="h-max w-max" layoutId={record?.id} key={key}>
      <Link legacyBehavior href={idString} >
        <a
          className={`block w-72 cursor-pointer ${overflow && 'overflow-hidden'
            }  2xl:w-96`}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <motion.div
            transition={{
              duration: 0.3,
              ease: defaultEase,
            }}
            animate={{ scale: active ? 1.07 : 1 }}
          >
            <Image
              // loader={cloudinaryLoader}
              layout="raw"
              // width={image.attributes.width / 3}
              // height={image.attributes.height / 3}
              width={293}
              height={367}
              src={record?.image}
              alt={record?.name}
              quality={75}
              className="h-full w-full object-cover"
            // placeholder="blur"
            // blurDataURL={blurDataUrl}
            />
          </motion.div>
        </a>
      </Link>

      <div className="mt-2 flex justify-between px-2">
        <div>
          <h4 className="-mb-1 text-lg">{record?.name}</h4>
          <h5 className="text-zinc-500">
            {/* {category[0].toUpperCase() + category.slice(1)} */}
            {record?.category?.name}
          </h5>
        </div>
        <div className="text-right">
          <h4 className="-mb-1 text-lg">
            {/* €{promotionPrice || price} */}
            {formatMoney(record?.sell_price)} vnd
          </h4>
          {/* {promotionPrice && (
            <h5 className="text-zinc-500 line-through">€{price}</h5>
          )} */}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductComponent;
