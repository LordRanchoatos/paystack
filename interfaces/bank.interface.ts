// Type definitions for the API responses
export interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankListResponse {
  status: boolean;
  message: string;
  data: Bank[];
  meta: {
    next: string | null;
    previous: string | null;
    perPage: number;
  };
}

export interface BankListOptions {
  country?: string;
  use_cursor?: boolean;
  perPage?: number;
  next?: string;
  previous?: string;
  gateway?: string;
  type?: string;
  currency?: string;
}
