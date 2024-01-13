import { useRecoilValue } from 'recoil';

import filterAtom from '@/common/recoil/filter';
import type { ShoesPageProps } from '@/pages/shoes';

import { filterProducts } from '../helpers/filterProducts';
import { sortProducts } from '../helpers/sortProducts';
import ProductComponent from './Product';
import Filter from './filter/Filter';
import { useDispatch } from 'react-redux';
import { actionGetListProduct } from '@/pages/redux/actions/product.action';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  image: string;
  import_price: number;
  sell_price: number;
  status: number;
  display_order: number;
  createdAt: Date;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  colors: any,
  sizes: any
}

// const ProductList = ({ products, blurDataUrls }: ShoesPageProps) => {
const ProductList = () => {
  const filter = useRecoilValue(filterAtom);

  let dispatch = useDispatch();
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await actionGetListProduct({}, dispatch)
      setListProduct(res.rows)
    })()
  }, [])

  // const readyProducts = sortProducts(
  //   filter.sortBy,
  //   filterProducts(products, filter)
  // );
  console.log(listProduct);

  return (
    <div className="relative mt-4 flex w-full pt-32">
      <Filter />
      <div className="relative grid flex-1 grid-cols-[repeat(auto-fit,18rem)] justify-center gap-7 2xl:grid-cols-[repeat(auto-fit,24rem)]">
        {/* {readyProducts.map((product) => (
          <ProductComponent
            {...product}
            key={product.id}
            blurDataUrl={blurDataUrls[product.id]}
          />
        ))} */}
        {listProduct.map((product: Product) => {
          // let idString = product?.id?.toString()
          return <ProductComponent
            record={product}
            key={product?.id}
          // blurDataUrl={blurDataUrls[idString]}
          />
        }


        )}
      </div>
    </div>
  );
};

export default ProductList;
