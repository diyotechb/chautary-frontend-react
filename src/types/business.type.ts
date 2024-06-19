import { Category } from "./category.type";

interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Business {
  createdAt: string;
  modifiedAt: string | null;
  createdBy: string | null;
  modifiedBy: string | null;
  id: number;
  user: string | null;
  owner: string | null;
  name: string;
  email: string;
  phone: string;
  description: string;
  logo: string | null;
  coverImage: string | null;
  bannerImage: string | null;
  address: Address;
  distance: number | null;
  slogan: string | null;
  keywords: string | null;
  establishedDate: string | null;
  category: Category;
  verified: boolean;
  featured: boolean;
  popular: boolean;
  status: string | null;
  remarks: string | null;
  website: string | null;
  linkedin: string | null;
  instagram: string | null;
  twitter: string | null;
  facebook: string | null;
  tiktok: string | null;
  youtube: string | null;
  gallery: any[];
}

export interface IPaginatedBusiness {
  data: Business[];
  pageNo: number;
  pageSize: number;
  totalPages: number;
  totalElement: number;
}

export interface BusinessCountry {
  name: string;
  alpha3Code: string;
}
