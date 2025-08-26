// ---------------- Transactions ----------------
export interface InitializeTransactionParams {
  email: string;
  amount: number; // kobo
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
  currency?: string;
  channels?: string[];
}

export interface TransactionData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface TransactionResponse {
  status: boolean;
  message: string;
  data: TransactionData;
}

// ---------------- Customers ----------------
export interface CreateCustomerParams {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface CustomerData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: string;
}

export interface CustomerResponse {
  status: boolean;
  message: string;
  data: CustomerData;
}
