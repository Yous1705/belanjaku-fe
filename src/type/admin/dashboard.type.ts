import { url } from "inspector";
export type SummaryType = {
  data: {
    totalUser: number;
    totalProduct: number;
    totalOrder: number;
    payment: {
      _sum: {
        amount: number;
      };
    };
    pendingOrder: number;
    completedOrder: number;
  };
};

export type SalesChartType = {
  data: {
    date: string;
    total: number;
  }[];
};

export type RecentOrderType = {
  data: {
    id: number;
    orderId: string;
    totalPrice: number;
    status: string;
    shippingRecipientName: string;
    shippingAddress: string;
    shippingCity: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
      avatar: string;
    };
    items: {
      id: number;
      productId: number;
      quantity: number;
      product: {
        name: string;
        category: {
          name: string;
        };
        price: number;
      };
    }[];
    payment: {
      amount: number;
      createdAt: string;
    };
  }[];
};

export type TopProductType = {
  data: {
    id: number;
    name: string;
    slug: string;
    description: string;
    category: string;
    images: {
      url: string;
    }[];
    price: number;
    stock: number;
  }[];
};

export type OrderStatusType = {
  data: {
    pending: number;
    paid: number;
    processing: number;
    shipped: number;
    completed: number;
    cancelled: number;
  };
};

export type RevenueType = {
  totalRevenue: number;
};

export type UserStats = {
  buyer: number;
  admin: number;
};
