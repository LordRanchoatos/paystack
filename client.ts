import axios, { AxiosInstance } from 'axios';

export class PaystackClient {
  private client: AxiosInstance;

  constructor(privateKey: string) {
    this.client = axios.create({
      baseURL: 'https://api.paystack.co',
      headers: {
        Authorization: `Bearer ${privateKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  public getClient(): AxiosInstance {
    return this.client;
  }
}
