export type Category = {
  id: string;
  name: string;
};

export type Tire = {
  id: string;
  width: string;
  height: string;
  diameter: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: Category;
  addedBy?: {
    firstName: string;
    lastName: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type Highlights = {
  recent: Tire[];
  premium: Tire[];
};
