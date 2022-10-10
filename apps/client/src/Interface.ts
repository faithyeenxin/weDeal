export interface IDeal {
  id: string;
  userId: string;
  name: string;
  retailPrice: number;
  discountedPrice: number;
  location: string;
  dealLocation: string;
  dealPostedDate: string;
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
