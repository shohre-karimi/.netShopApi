export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface ProductFilter {
  searchTerm?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
}
