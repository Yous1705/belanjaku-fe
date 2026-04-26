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

export type BuyNowResponseType = {
  order: {
    id: number;
    orderId: string;
    userId: number;

    totalPrice: number;

    status: string;

    shippingRecipientName: string;
    shippingPhoneNumber: string;
    shippingAddress: string;
    shippingCity: string;
    shippingPostal: string;

    createdAt: string;
    updatedAt: string;
  };

  payment: {
    id: number;
    orderId: number;

    amount: number;
    status: string;
    method: string;

    snapToken: string;
    redirectUrl: string;
    midtransOrderId: string;

    expiresAt: string | null;
    createdAt: string;
  };
};

export type CheckoutResponseType = {
  order: {
    id: number;
    orderId: string;
    userId: number;

    totalPrice: number;

    status: string;

    shippingRecipientName: string;
    shippingPhoneNumber: string;
    shippingAddress: string;
    shippingCity: string;
    shippingPostal: string;

    createdAt: string;
    updatedAt: string;
  };

  payment: {
    id: number;
    orderId: number;

    amount: number;
    status: string;
    method: string;

    snapToken: string;
    redirectUrl: string;
    midtransOrderId: string;

    expiresAt: string | null;
    createdAt: string;
  };
};
