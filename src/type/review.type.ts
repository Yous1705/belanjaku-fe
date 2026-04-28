export type ReviewDto = {
  rating: number;
  comment: string;
};

export type myReviewType = {
  id: number;
  rating: number;
  comment: string;
  updatedAt: string;
  user: {
    name: string;
  };
  product: {
    name: string;
  };
};
