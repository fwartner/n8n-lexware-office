import { 
	ILexwareContact, 
	ILexwareArticle, 
	ILexwareVoucher,
	ILexwareInvoice,
	ILexwareQuotation,
	ILexwareCreditNote,
	ILexwareDeliveryNote,
	ILexwareDunning
} from '../types';
import { 
	LEXWARE_DEFAULT_VALUES, 
	LEXWARE_ARTICLE_TYPES, 
	LEXWARE_PRICE_TYPES,
	LEXWARE_LINE_ITEM_TYPES,
	LEXWARE_TAX_TYPES,
	LEXWARE_SHIPPING_TYPES
} from '../constants';

export class LexwareDataTransformer {
	static transformContactData(
		contactType: 'company' | 'person',
		additionalFields: Record<string, any>
	): ILexwareContact {
		const baseContact: ILexwareContact = {
			version: LEXWARE_DEFAULT_VALUES.DEFAULT_VERSION,
			roles: {},
			addresses: [{
				countryCode: LEXWARE_DEFAULT_VALUES.DEFAULT_COUNTRY_CODE,
				street: additionalFields.street,
				zipCode: additionalFields.zipCode,
				city: additionalFields.city,
			}],
			note: additionalFields.note,
			phoneNumbers: additionalFields.phoneNumbers,
			emailAddresses: additionalFields.emailAddresses,
		};

		if (contactType === 'company') {
			baseContact.company = {
				name: additionalFields.name || '',
				contactPersons: [{
					salutation: additionalFields.salutation,
					lastName: additionalFields.name || '',
				}],
			};
		} else {
			baseContact.person = {
				salutation: additionalFields.salutation,
				firstName: additionalFields.firstName || additionalFields.name || '',
				lastName: additionalFields.lastName || additionalFields.name || '',
			};
		}

		return baseContact;
	}

	static transformArticleData(additionalFields: Record<string, any>): ILexwareArticle {
		return {
			title: additionalFields.name || additionalFields.title || '',
			type: additionalFields.type || LEXWARE_ARTICLE_TYPES.SERVICE,
			unitName: additionalFields.unitName || LEXWARE_DEFAULT_VALUES.DEFAULT_UNIT_NAME,
			price: {
				netPrice: additionalFields.netPrice || 0,
				grossPrice: additionalFields.grossPrice,
				leadingPrice: additionalFields.leadingPrice || LEXWARE_PRICE_TYPES.NET,
				taxRate: additionalFields.taxRate || LEXWARE_DEFAULT_VALUES.DEFAULT_TAX_RATE,
			},
			description: additionalFields.description,
			archived: additionalFields.archived || false,
		};
	}

	static transformVoucherData(
		voucherType: string,
		additionalFields: Record<string, any>
	): ILexwareVoucher {
		return {
			voucherType,
			voucherDate: additionalFields.voucherDate || new Date().toISOString().split('T')[0],
			voucherNumber: additionalFields.voucherNumber,
			contactId: additionalFields.contactId,
			contactName: additionalFields.contactName,
			lineItems: additionalFields.lineItems?.map((item: any) => ({
				id: item.id,
				type: item.type || LEXWARE_LINE_ITEM_TYPES.SERVICE,
				name: item.name,
				quantity: item.quantity || 1,
				unitName: item.unitName || LEXWARE_DEFAULT_VALUES.DEFAULT_UNIT_NAME,
				unitPrice: item.unitPrice ? {
					currency: item.unitPrice.currency || LEXWARE_DEFAULT_VALUES.DEFAULT_CURRENCY,
					netAmount: item.unitPrice.netAmount,
					grossAmount: item.unitPrice.grossAmount,
					taxRatePercentage: item.unitPrice.taxRatePercentage || LEXWARE_DEFAULT_VALUES.DEFAULT_TAX_RATE,
				} : undefined,
			})) || [],
			taxConditions: additionalFields.taxConditions ? {
				taxType: additionalFields.taxConditions.taxType || LEXWARE_TAX_TYPES.NET,
			} : undefined,
			shippingConditions: additionalFields.shippingConditions ? {
				shippingType: additionalFields.shippingConditions.shippingType || LEXWARE_SHIPPING_TYPES.STANDARD,
			} : undefined,
			totalAmount: additionalFields.totalAmount,
			openAmount: additionalFields.openAmount,
			currency: additionalFields.currency || LEXWARE_DEFAULT_VALUES.DEFAULT_CURRENCY,
			archived: additionalFields.archived || false,
		};
	}

	static transformInvoiceData(additionalFields: Record<string, any>): ILexwareInvoice {
		const baseVoucher = this.transformVoucherData('invoice', additionalFields);
		return {
			...baseVoucher,
			invoiceStatus: additionalFields.invoiceStatus || 'draft',
			dueDate: additionalFields.dueDate,
		};
	}

	static transformQuotationData(additionalFields: Record<string, any>): ILexwareQuotation {
		const baseVoucher = this.transformVoucherData('quotation', additionalFields);
		return {
			...baseVoucher,
			quotationStatus: additionalFields.quotationStatus || 'draft',
			validUntil: additionalFields.validUntil,
		};
	}

	static transformCreditNoteData(additionalFields: Record<string, any>): ILexwareCreditNote {
		const baseVoucher = this.transformVoucherData('creditnote', additionalFields);
		return {
			...baseVoucher,
			creditNoteStatus: additionalFields.creditNoteStatus || 'draft',
			precedingSalesVoucherId: additionalFields.precedingSalesVoucherId,
		};
	}

	static transformDeliveryNoteData(additionalFields: Record<string, any>): ILexwareDeliveryNote {
		const baseVoucher = this.transformVoucherData('deliverynote', additionalFields);
		return {
			...baseVoucher,
			deliveryNoteStatus: additionalFields.deliveryNoteStatus || 'draft',
			deliveryDate: additionalFields.deliveryDate,
		};
	}

	static transformDunningData(additionalFields: Record<string, any>): ILexwareDunning {
		const baseVoucher = this.transformVoucherData('dunning', additionalFields);
		return {
			...baseVoucher,
			dunningStatus: additionalFields.dunningStatus || 'draft',
			dunningLevel: additionalFields.dunningLevel || 1,
			precedingSalesVoucherId: additionalFields.precedingSalesVoucherId,
		};
	}

	static sanitizeUpdateData(data: Record<string, any>): Record<string, any> {
		// Remove read-only fields that shouldn't be updated
		const { id, version, organizationId, createdAt, updatedAt, ...sanitizedData } = data;
		return sanitizedData;
	}

	static validateRequiredFields(data: Record<string, any>, requiredFields: string[]): string[] {
		const missingFields: string[] = [];
		
		for (const field of requiredFields) {
			if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
				missingFields.push(field);
			}
		}
		
		return missingFields;
	}
}
