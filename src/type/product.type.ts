export type ProductTypeDashboard = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  images: string;
  isWishlisted: boolean;
};

export type ProductCardProps = {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string;
  category: string;
  isWishlisted: boolean;
  onWishlistToggle?: () => void;
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

export type ToggleWishlistResponse = {
  message: string;
  isWishlisted: boolean;
  productId: number;
};

export type MyWishlistType = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  images: string[];
};
