export type ProductType = {
  id: number;
  name: string;
  slug: string;
  category: string;
  stock: number;
  price: number;
  displayPrice: number;
  image: string;
  reviews: {
    rating: number | null;
  };
};

export type TableProductProps = {
  data: ProductType[];
};

export type updateProductDetailType = {
  id: number;
  name: string;
  slug: string;
  images: string[];
  description: string;
  category: string;
  stock: number;
  price: number;
  discountPercent: number;
  displayPrice: number;
  discountPrice: number;
};

export type UpdateProductProps = {
  data: updateProductDetailType;
};

export type AddProductDto = {
  name: string;
  price: number;
  description: string;
  stock: number;
  category: number;
  images: File[];
  specifications: { key: string; value: string }[];
};

export type CategoryType = {
  id: number;
  name: string;
};
