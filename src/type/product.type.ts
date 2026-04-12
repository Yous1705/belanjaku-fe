export type ProductTypeDashboard = {
  id: number;
  name: string;
  description: string;
  category: {
    name: string;
  };
  price: number;
  images: string;
};

export type ProductCardProps = {
  name: string;
  description: string;
  price: number;
  images: string;
  category: {
    name: string;
  };
};

export type ProductTypeDetail = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
};
