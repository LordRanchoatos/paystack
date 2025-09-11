import { PaystackClient } from '../client';
import { AxiosResponse } from 'axios';
import { BankListOptions, BankListResponse } from '../interfaces/bank.interface';


export class BankService {
  private paystackClient: PaystackClient;

  constructor(paystackClient: PaystackClient) {
    this.paystackClient = paystackClient;
  }

  /**
   * Get a list of all supported banks and their properties
   * @param options - Optional parameters for filtering and pagination
   * @returns Promise containing the list of banks
   */
  async listBanks(options: BankListOptions = {}): Promise<BankListResponse> {
    const client = this.paystackClient.getClient();

    const params = new URLSearchParams();

    if (options.country) params.append('country', options.country);
    if (options.use_cursor !== undefined)
      params.append('use_cursor', options.use_cursor.toString());
    if (options.perPage) params.append('perPage', options.perPage.toString());
    if (options.next) params.append('next', options.next);
    if (options.previous) params.append('previous', options.previous);
    if (options.gateway) params.append('gateway', options.gateway);
    if (options.type) params.append('type', options.type);
    if (options.currency) params.append('currency', options.currency);

    const queryString = params.toString();
    const url = queryString ? `/bank?${queryString}` : '/bank';

    const response: AxiosResponse<BankListResponse> = await client.get(url);
    return response.data;
  }

  /**
   * Get banks for a specific country (convenience method)
   * @param country - The country to get banks for (e.g., "Nigeria", "Ghana", "South Africa")
   * @returns Promise containing the list of banks for the specified country
   */
  async getBanksByCountry(country: string): Promise<BankListResponse> {
    return this.listBanks({ country });
  }

  /**
   * Get Nigerian banks (convenience method)
   * @returns Promise containing the list of Nigerian banks
   */
  async getNigerianBanks(): Promise<BankListResponse> {
    return this.getBanksByCountry('Nigeria');
  }

  /**
   * Search for banks by name
   * @param searchTerm - The term to search for in bank names
   * @param country - Optional country filter
   * @returns Promise containing filtered banks
   */
  async searchBanksByName(
    searchTerm: string,
    country?: string
  ): Promise<Bank[]> {
    const response = await this.listBanks({ country });
    const searchTermLower = searchTerm.toLowerCase();

    return response.data.filter(
      (bank) =>
        bank.name.toLowerCase().includes(searchTermLower) ||
        bank.slug.toLowerCase().includes(searchTermLower)
    );
  }

  /**
   * Find a bank by its code
   * @param bankCode - The bank code to search for
   * @param country - Optional country filter
   * @returns Promise containing the bank if found, null otherwise
   */
  async getBankByCode(
    bankCode: string,
    country?: string
  ): Promise<Bank | null> {
    const response = await this.listBanks({ country });

    const bank = response.data.find(
      (bank) => bank.code === bankCode || bank.longcode === bankCode
    );

    return bank || null;
  }

  /**
   * Get all active banks
   * @param country - Optional country filter
   * @returns Promise containing only active banks
   */
  async getActiveBanks(country?: string): Promise<Bank[]> {
    const response = await this.listBanks({ country });
    return response.data.filter((bank) => bank.active && !bank.is_deleted);
  }

  /**
   * Get banks that support pay with bank feature
   * @param country - Optional country filter
   * @returns Promise containing banks that support pay with bank
   */
  async getPayWithBankSupportedBanks(country?: string): Promise<Bank[]> {
    const response = await this.listBanks({ country });
    return response.data.filter(
      (bank) => bank.pay_with_bank && bank.active && !bank.is_deleted
    );
  }
}
