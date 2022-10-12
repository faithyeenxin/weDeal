export interface IDeal {
  id: string;
  userId: string;
  name: string;
  retailPrice: number;
  discountedPrice: number;
  location: string;
  dealLocation: string;
  dealPostedDate: Date;
  dealExpiry: Date;
  categoryId: string;
  totalUpvotes: number;
  totalDownvotes: number;
  DealImages: IDealImages[];
}

export interface IDealImages {
  dealId: string;
  image: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IUser {
  username: string;
  password: string;
  name: string;
  image: string;
  email: string;
  dateJoined: Date;
  Deals?: IDeal[];
}
