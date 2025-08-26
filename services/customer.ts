import { PaystackClient } from '../client';
import { CreateCustomerParams, CustomerResponse } from '../types';

export class CustomerService {
  constructor(private client: PaystackClient) {}

  // Create a customer
  async create(params: CreateCustomerParams): Promise<CustomerResponse> {
    const response = await this.client.getClient().post('/customer', params);
    return response.data;
  }

  // List customers
  async list(query?: { perPage?: number; page?: number }): Promise<any> {
    const response = await this.client
      .getClient()
      .get('/customer', { params: query });
    return response.data;
  }

  // Fetch customer by code/email
  async fetch(codeOrEmail: string): Promise<any> {
    const response = await this.client
      .getClient()
      .get(`/customer/${codeOrEmail}`);
    return response.data;
  }

  // Update customer
  async update(
    code: string,
    data: Partial<{ first_name: string; last_name: string; phone: string }>
  ): Promise<any> {
    const response = await this.client
      .getClient()
      .put(`/customer/${code}`, data);
    return response.data;
  }
}
