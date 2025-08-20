import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwarePayment, ILexwareCredentials } from '../types';
import { 
	LEXWARE_API_ENDPOINTS,
	LEXWARE_PAYMENT_ITEM_TYPES
} from '../constants';

export class PaymentResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve a specific payment by ID
	 * @param paymentId - The unique identifier of the payment
	 * @returns Promise<ILexwarePayment> - The payment data
	 */
	async get(paymentId: string): Promise<ILexwarePayment> {
		return this.apiClient.get<ILexwarePayment>(`${LEXWARE_API_ENDPOINTS.PAYMENTS}/${paymentId}`);
	}

	/**
	 * Retrieve all payments with optional filtering and pagination
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwarePayment[]> - Array of payments
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, params);
	}

	/**
	 * Get payments by contact ID
	 * @param contactId - The contact ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const contactParams = {
			...params,
			contactId,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, contactParams);
	}

	/**
	 * Get payments by voucher ID
	 * @param voucherId - The voucher ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByVoucher(voucherId: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const voucherParams = {
			...params,
			voucherId,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, voucherParams);
	}

	/**
	 * Get payments by payment type
	 * @param paymentType - The payment type to filter by ('incoming' or 'outgoing')
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByType(paymentType: 'incoming' | 'outgoing', params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const typeParams = {
			...params,
			paymentType,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, typeParams);
	}

	/**
	 * Get payments by status
	 * @param paymentStatus - The payment status to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByStatus(paymentStatus: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const statusParams = {
			...params,
			paymentStatus,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, statusParams);
	}

	/**
	 * Get pending payments
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Pending payments
	 */
	async getPending(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.getByStatus('pending', params);
	}

	/**
	 * Get completed payments
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Completed payments
	 */
	async getCompleted(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.getByStatus('completed', params);
	}

	/**
	 * Get failed payments
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Failed payments
	 */
	async getFailed(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.getByStatus('failed', params);
	}

	/**
	 * Get cancelled payments
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Cancelled payments
	 */
	async getCancelled(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.getByStatus('cancelled', params);
	}

	/**
	 * Get incoming payments
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Incoming payments
	 */
	async getIncoming(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.getByType('incoming', params);
	}

	/**
	 * Get outgoing payments
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Outgoing payments
	 */
	async getOutgoing(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.getByType('outgoing', params);
	}

	/**
	 * Get payments by date range
	 * @param startDate - Start date for filtering
	 * @param endDate - End date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const dateParams = {
			...params,
			paymentDateFrom: startDate,
			paymentDateTo: endDate,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, dateParams);
	}

	/**
	 * Get payments by paid date range
	 * @param startDate - Start paid date for filtering
	 * @param endDate - End paid date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByPaidDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const paidDateParams = {
			...params,
			paidDateFrom: startDate,
			paidDateTo: endDate,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, paidDateParams);
	}

	/**
	 * Get payments by amount range
	 * @param minAmount - Minimum amount for filtering
	 * @param maxAmount - Maximum amount for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByAmountRange(minAmount: number, maxAmount: number, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const amountParams = {
			...params,
			amountFrom: minAmount,
			amountTo: maxAmount,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, amountParams);
	}

	/**
	 * Get payments by currency
	 * @param currency - The currency to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByCurrency(currency: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const currencyParams = {
			...params,
			currency,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, currencyParams);
	}

	/**
	 * Get payments by payment method
	 * @param paymentMethod - The payment method to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByPaymentMethod(paymentMethod: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const methodParams = {
			...params,
			paymentMethod,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, methodParams);
	}

	/**
	 * Get payments by payment item type
	 * @param itemType - The payment item type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByPaymentItemType(itemType: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const itemTypeParams = {
			...params,
			paymentItemType: itemType,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, itemTypeParams);
	}

	/**
	 * Get payments with receivables
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Payments with receivables
	 */
	async getWithReceivables(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.getByPaymentItemType(LEXWARE_PAYMENT_ITEM_TYPES.RECEIVABLE, params);
	}

	/**
	 * Get payments with payables
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Payments with payables
	 */
	async getWithPayables(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.getByPaymentItemType(LEXWARE_PAYMENT_ITEM_TYPES.PAYABLE, params);
	}

	/**
	 * Get payments with irrecoverable receivables
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Payments with irrecoverable receivables
	 */
	async getWithIrrecoverableReceivables(params?: Record<string, any>): Promise<ILexwarePayment[]> {
		return this.getByPaymentItemType(LEXWARE_PAYMENT_ITEM_TYPES.IRRECOVERABLE_RECEIVABLE, params);
	}

	/**
	 * Search payments by text
	 * @param searchTerm - The search term to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Search results
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const searchParams = {
			...params,
			q: searchTerm,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, searchParams);
	}

	/**
	 * Get payments by transaction ID
	 * @param transactionId - The transaction ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByTransactionId(transactionId: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const transactionParams = {
			...params,
			transactionId,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, transactionParams);
	}

	/**
	 * Get payments by reference
	 * @param reference - The reference to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByReference(reference: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const referenceParams = {
			...params,
			reference,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, referenceParams);
	}

	/**
	 * Get payments by clearing date range
	 * @param startDate - Start clearing date for filtering
	 * @param endDate - End clearing date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByClearingDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const clearingDateParams = {
			...params,
			clearingDateFrom: startDate,
			clearingDateTo: endDate,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, clearingDateParams);
	}

	/**
	 * Get payments by bank account
	 * @param iban - The IBAN to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePayment[]> - Filtered payments
	 */
	async getByBankAccount(iban: string, params?: Record<string, any>): Promise<ILexwarePayment[]> {
		const bankParams = {
			...params,
			iban,
		};
		return this.apiClient.get<ILexwarePayment[]>(LEXWARE_API_ENDPOINTS.PAYMENTS, bankParams);
	}

	/**
	 * Get payment statistics
	 * @param params - Additional parameters
	 * @returns Promise<any> - Payment statistics
	 */
	async getStatistics(params?: Record<string, any>): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PAYMENTS}/statistics`, params);
	}

	/**
	 * Get payment summary by period
	 * @param period - The period for summary (e.g., 'monthly', 'quarterly', 'yearly')
	 * @param params - Additional parameters
	 * @returns Promise<any> - Payment summary
	 */
	async getSummaryByPeriod(period: string, params?: Record<string, any>): Promise<any> {
		const periodParams = {
			...params,
			period,
		};
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PAYMENTS}/summary`, periodParams);
	}

	/**
	 * Validate payment data
	 * @param paymentData - The payment data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validatePaymentData(paymentData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Required fields validation
		if (!paymentData.amount || paymentData.amount <= 0) {
			errors.push('Payment amount is required and must be greater than 0');
		}
		
		if (!paymentData.currency) {
			errors.push('Payment currency is required');
		}
		
		if (!paymentData.paymentType || !['incoming', 'outgoing'].includes(paymentData.paymentType)) {
			errors.push('Payment type must be either "incoming" or "outgoing"');
		}
		
		if (!paymentData.paymentStatus || !['pending', 'completed', 'failed', 'cancelled'].includes(paymentData.paymentStatus)) {
			errors.push('Payment status must be one of: pending, completed, failed, cancelled');
		}
		
		// Date validation
		if (paymentData.paymentDate && !this.isValidDate(paymentData.paymentDate)) {
			errors.push('Invalid payment date format');
		}
		
		if (paymentData.paidDate && !this.isValidDate(paymentData.paidDate)) {
			errors.push('Invalid paid date format');
		}
		
		if (paymentData.clearingDate && !this.isValidDate(paymentData.clearingDate)) {
			errors.push('Invalid clearing date format');
		}
		
		// Payment items validation
		if (paymentData.paymentItems && Array.isArray(paymentData.paymentItems)) {
			paymentData.paymentItems.forEach((item: any, index: number) => {
				if (!item.type || !Object.values(LEXWARE_PAYMENT_ITEM_TYPES).includes(item.type)) {
					errors.push(`Invalid payment item type at index ${index}`);
				}
				
				if (!item.amount || item.amount <= 0) {
					errors.push(`Payment item amount at index ${index} must be greater than 0`);
				}
				
				if (!item.currency) {
					errors.push(`Payment item currency at index ${index} is required`);
				}
			});
		}
		
		// Bank account validation
		if (paymentData.bankAccount) {
			if (paymentData.bankAccount.iban && !this.isValidIBAN(paymentData.bankAccount.iban)) {
				errors.push('Invalid IBAN format');
			}
			
			if (paymentData.bankAccount.bic && !this.isValidBIC(paymentData.bankAccount.bic)) {
				errors.push('Invalid BIC format');
			}
		}
		
		return errors;
	}

	/**
	 * Check if date string is valid
	 * @param dateString - The date string to validate
	 * @returns boolean - True if valid date
	 */
	private isValidDate(dateString: string): boolean {
		const date = new Date(dateString);
		return date instanceof Date && !isNaN(date.getTime());
	}

	/**
	 * Check if IBAN is valid (basic format check)
	 * @param iban - The IBAN to validate
	 * @returns boolean - True if valid IBAN format
	 */
	private isValidIBAN(iban: string): boolean {
		// Basic IBAN format validation (2 letters + 2 digits + up to 30 alphanumeric)
		const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
		return ibanRegex.test(iban.replace(/\s/g, ''));
	}

	/**
	 * Check if BIC is valid (basic format check)
	 * @param bic - The BIC to validate
	 * @returns boolean - True if valid BIC format
	 */
	private isValidBIC(bic: string): boolean {
		// Basic BIC format validation (8 or 11 characters: 4 letters + 2 letters + 2 alphanumeric + 3 optional alphanumeric)
		const bicRegex = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
		return bicRegex.test(bic);
	}
}
