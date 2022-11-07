import { string } from "yup";

export interface IDeal {
  id: string;
  userId: string;
  name: string;
  retailPrice: number;
  discountedPrice: number;
  location: string;
  locationAddress?: string;
  locationLat?: number;
  locationLong?: number;
  dealLocation: string;
  dealPostedDate: Date;
  dealExpiry: Date;
  categoryId: string;
  DealImages: IDealImages[];
  Votes: IVotes[];
}

export interface IVotes {
  dealId: string;
  userId: string;
  voteStatus: number;
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
  id: string;
  username: string;
  password: string;
  name: string;
  image: string;
  email: string;
  dateJoined: Date;
  Deals?: IDeal[];
  Votes?: IVotes[];
}
