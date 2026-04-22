export type ProfileType = {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
};

export type ProfileOrdertype = {
  orderId: string;
  totalPrice: number;
  status: string;
  updatedAt: string;
};

export type AddressType = {
  id: number;
  address: string;
  city: string;
  postal: string;
  isMain: boolean;
};

export type AddressDto = {
  address: string;
  city: string;
  postal: string;
};

export type setMainResponse = {
  isMain: boolean;
};
