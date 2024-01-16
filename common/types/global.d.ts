export declare global {
  interface Image {
    id: string;
    attributes: { width: number; height: number; hash: string };
  }

  interface SimpleProduct {
    id: string;
    attributes: {
      name: string;
      price: number;
      category: string;
      slug: string;
      color: string;
      promotionPrice: number | null;
      images: {
        data: Image[];
      };
    };
  }

  interface Product {
    id: string;
    attributes: {
      name: string;
      price: number;
      category: string;
      slug: string;
      description: string;
      promotionPrice: number | null;
      color: string;
      sizes: number[];
      productVariants: {
        data: {
          attributes: {
            products: {
              data: {
                id: string;
                attributes: {
                  slug: string;
                  images: {
                    data: Image[];
                  };
                };
              }[];
            };
          };
        };
      };
      reviews: {
        data: Review[];
      };
      images: {
        data: Image[];
      };
    };
  }

  interface CartProduct extends SimpleProduct {
    quantity: number;
    size: number;
  }

  interface Cart {
    id: string;
    attributes: {
      products: CartProduct[];
    };
    opened: boolean;
  }

  interface DiscountCode {
    code: string;
    value: number;
    type: 'flat' | 'percentage';
  }

  interface Order {
    data: {
      id: number;
      attributes: {
        email: string;
        totalValue: number;
        variants: { [slug: string]: number };
        products: { data: SimpleProduct[] };
      };
    };
  }

  interface Review {
    id: string;
    attributes: {
      content: string;
      stars: number;
      createdAt: string;
      user: {
        data: {
          attributes: {
            username: string;
          };
        };
      };
    };
  }

  interface User {
    id: string;
    username: string;
    email: string;
  }

  interface Color {
    id: number;
    name: string;
    image: string;
    quantity: number;
    product_id: number;
  }

  interface SizeColor {
    id: number;
    color: Color;
  }

  interface Size {
    id: number;
    size: string;
    product_id: number;
    size_color: SizeColor[];
  }

  interface ProductSample {
    id: number;
    name: string;
    description: string;
    quantity: number;
    image: string;
    import_price: number;
    sell_price: number;
    status: number;
    display_order: number;
    createdAt: string;
    category: {
      id: number;
      name: string;
    };
    brand: {
      id: number;
      name: string;
    };
    colors: Color[];
    sizes: Size[];
  }

}
