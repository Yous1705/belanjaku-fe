export type OrderType = {
  id: number;
  totalPrice: number;
  items: OrderItem[];
};

export type OrderItem = {
  quantity: number;
  price: number;
  product: {
    name: string;
  };
  total: number;
};

export type PaymentResponseType = {
  success: boolean;
  message: string;
  data: {
    token: string;
    redirect_url: string;
  };
};
