// import { Params } from 'next/dist/server/router';

import { client } from '@/common/graphql/client';
import { GET_PRODUCTS } from '@/common/graphql/query/GET_PRODUCTS';
import { GET_SINGLE_PRODUCT } from '@/common/graphql/query/GET_SINGLE_PRODUCT';
import { getBase64ImageUrl } from '@/common/lib/getBlurUrl';
import ProductDetails from '@/modules/productDetails/components/ProductDetails';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { actionGetDetailProduct } from './redux/actions/product.action';

export interface ProductDetailsPageProps {
    product: Product;
    blurDataUrls: { [key: string]: string };
}

// const ProductPage = (props: ProductDetailsPageProps) => {
//   if (!props.product)
//     return (
//       // eslint-disable-next-line prettier/prettier
//       <h1 className="mt-24 px-5 text-center text-xl font-semibold">
//         Product with that slug not found!
//       </h1>
//     );

//   return <ProductDetails {...props} />;
// };

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

const ProductPage = (props: ProductDetailsPageProps) => {
    //   if (!props.product)
    //     return (
    //       // eslint-disable-next-line prettier/prettier
    //       <h1 className="mt-24 px-5 text-center text-xl font-semibold">
    //         Product with that slug not found!
    //       </h1>
    //     );
    //   return <ProductDetails {...props} />;

    let params = useParams()
    let dispatch = useDispatch();

    const [product, setProduct] = useState<any>({});

    useEffect(() => {
        (async () => {
            let id = Number(params?.slug)
            const res = await actionGetDetailProduct(id, dispatch)
            if (res) {
                setProduct(res)
            }
        })()
    }, [params])

    if (product?.del == 0) {
        return <ProductDetails product={product} />
    }
};

export default ProductPage;

// export async function getStaticProps({ params }: Params) {
//   const {
//     data: { products },
//   } = await client.query<{ products: { data: SimpleProduct[] } }>({
//     query: GET_SINGLE_PRODUCT,
//     variables: {
//       slug: params.slug,
//     },
//   });

//   const blurDataUrls: { [key: string]: string } = {};

//   if (products.data[0])
//     await Promise.all(
//       products.data[0].attributes.images.data.map(async (image) => {
//         const dataUrl = await getBase64ImageUrl(image.attributes.hash, true);

//         blurDataUrls[image.attributes.hash] = dataUrl;
//       })
//     );

//   return {
//     props: {
//       product: products.data[0] || null,
//       blurDataUrls,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const {
//     data: { products },
//   } = await client.query<{ products: { data: SimpleProduct[] } }>({
//     query: GET_PRODUCTS,
//   });

//   const slugs = products.data.map((product) => product.attributes.slug);

//   return {
//     paths: slugs.map((slug) => ({ params: { slug } })),
//     fallback: true,
//   };
// }
