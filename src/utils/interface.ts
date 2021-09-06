export interface ProductMapProps {
  id: number;
  product_url?: string;
  product_name: string;
  product_id?: string;
  listing_price?: number;
  sale_price: number;
  discount?: number;
  brand: string;
  description?: string;
  quantity?: number;
  rating?: number;
  reviews?: number;
  images: Array<string>;
  last_visited?: string;
  total_count?: string;
  results?: ProductMapProps[];
}

export interface responseProps {
  info?: {
    count?: number;
    page?: number;
    next?: string;
    prev?: string;
  };
  results: Array<any>;
}

export interface userProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
}
