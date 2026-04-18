export type ProductDetailType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  currentPrice: number;
  stock: number;
  category: {
    name: string;
  };
  images: {
    url: string;
  }[];
  specifications: {
    key: string;
    value: string;
  }[];
  reviews: {
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type ProductDetailProps = {
  images: {
    url: string;
  }[];
  category: {
    name: string;
  };
  name: string;
  slug: string;
  price: number;
  currentPrice: number;
  description: string;
  stock: number;
  reviews: {
    rating: number;
    comment?: string;
    createdAt?: string;
    updatedAt?: string;
  }[];
  specifications: {
    key: string;
    value: string;
  }[];
};

export type ProductTypeDashboard = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  displayPrice: number;
  images: string;
  isWishlisted: boolean;
  reviews: {
    rating: number;
  }[];
};

export type ProductCardProps = {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string;
  category: string;
  displayPrice: number;
  isWishlisted: boolean;
  onWishlistToggle?: () => void;
  reviews: {
    rating: number;
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
  images: string;
};

export type MyWishlistProps = {
  name: string;
  // slug: string;
  price: number;
  category: string;
  images: string;
};

export type PageProps = {
  slug: string;
};

export type CartItemType = {
  product: {
    id: number;
    name: string;
    slug: string;
    // price: number;
    category: { name: string };

    images: {
      url: string;
    };
  };
  quantity: number;
  currentPrice: number;
  totalPrice: number;
};

export interface CartResponse {
  items: CartItemType[];
  grandTotal: number;
}

export type CartItemDto = {
  slug: string;
  quantity: number;
};
