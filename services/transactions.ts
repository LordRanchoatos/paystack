import { PaystackClient } from '../client';
import { InitializeTransactionParams, TransactionResponse } from '../types';

export class TransactionService {
  constructor(private client: PaystackClient) {}

  // Initialize a payment
  async initialize(
    params: InitializeTransactionParams
  ): Promise<TransactionResponse> {
    const response = await this.client
      .getClient()
      .post('/transaction/initialize', params);
    return response.data;
  }

  // Verify a transaction
  async verify(reference: string): Promise<any> {
    const response = await this.client
      .getClient()
      .get(`/transaction/verify/${reference}`);
    return response.data;
  }

  // List transactions
  async list(query?: { perPage?: number; page?: number }): Promise<any> {
    const response = await this.client
      .getClient()
      .get('/transaction', { params: query });
    return response.data;
  }

  // Fetch transaction by ID
  async fetch(id: string): Promise<any> {
    const response = await this.client.getClient().get(`/transaction/${id}`);
    return response.data;
  }

  // Charge authorization (reuse saved card)
  async chargeAuthorization(params: {
    authorization_code: string;
    email: string;
    amount: number;
  }): Promise<any> {
    const response = await this.client
      .getClient()
      .post('/transaction/charge_authorization', params);
    return response.data;
  }

  // Transaction timeline
  async timeline(reference: string): Promise<any> {
    const response = await this.client
      .getClient()
      .get(`/transaction/timeline/${reference}`);
    return response.data;
  }

  // Transaction totals
  async totals(): Promise<any> {
    const response = await this.client.getClient().get('/transaction/totals');
    return response.data;
  }
}
