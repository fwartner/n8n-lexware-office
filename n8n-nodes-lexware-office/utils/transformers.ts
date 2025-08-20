import { 
	ILexwareContact, 
	ILexwareArticle, 
	ILexwareVoucher,
	ILexwareInvoice,
	ILexwareQuotation,
	ILexwareOrderConfirmation,
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
			roles: {
				customer: additionalFields.customer || false,
				vendor: additionalFields.vendor || false,
				employee: additionalFields.employee || false,
			},
			addresses: [{
				type: additionalFields.addressType || 'billing',
				countryCode: additionalFields.countryCode || LEXWARE_DEFAULT_VALUES.DEFAULT_COUNTRY_CODE,
				street: additionalFields.street,
				zipCode: additionalFields.zipCode,
				city: additionalFields.city,
				address: additionalFields.address,
				addressAddition: additionalFields.addressAddition,
				state: additionalFields.state,
				primary: true,
			}],
			note: additionalFields.note,
			phoneNumbers: {
				private: additionalFields.phoneNumbers?.private || additionalFields.privatePhone,
				business: additionalFields.phoneNumbers?.business || additionalFields.businessPhone,
				mobile: additionalFields.phoneNumbers?.mobile || additionalFields.mobilePhone,
				fax: additionalFields.phoneNumbers?.fax || additionalFields.fax,
				other: additionalFields.phoneNumbers?.other || additionalFields.otherPhone,
			},
			emailAddresses: {
				business: additionalFields.emailAddresses?.business || additionalFields.businessEmail,
				office: additionalFields.emailAddresses?.office || additionalFields.officeEmail,
				private: additionalFields.emailAddresses?.private || additionalFields.privateEmail,
				other: additionalFields.emailAddresses?.other || additionalFields.otherEmail,
			},
			bankAccounts: additionalFields.bankAccounts ? [{
				accountHolder: additionalFields.bankAccounts.accountHolder,
				iban: additionalFields.bankAccounts.iban,
				bic: additionalFields.bankAccounts.bic,
				bankName: additionalFields.bankAccounts.bankName,
				accountNumber: additionalFields.bankAccounts.accountNumber,
				bankCode: additionalFields.bankAccounts.bankCode,
				primary: true,
			}] : undefined,
			taxSettings: additionalFields.taxSettings ? {
				taxNumber: additionalFields.taxSettings.taxNumber,
				vatId: additionalFields.taxSettings.vatId,
				taxType: additionalFields.taxSettings.taxType,
				taxRate: additionalFields.taxSettings.taxRate || LEXWARE_DEFAULT_VALUES.DEFAULT_TAX_RATE,
				smallBusiness: additionalFields.taxSettings.smallBusiness || false,
			} : undefined,
			shippingSettings: additionalFields.shippingSettings ? {
				shippingType: additionalFields.shippingSettings.shippingType || LEXWARE_SHIPPING_TYPES.STANDARD,
				shippingCosts: additionalFields.shippingSettings.shippingCosts,
				shippingConditions: additionalFields.shippingSettings.shippingConditions,
			} : undefined,
			paymentSettings: additionalFields.paymentSettings ? {
				paymentTerms: additionalFields.paymentSettings.paymentTerms,
				paymentMethod: additionalFields.paymentSettings.paymentMethod,
				discountPercentage: additionalFields.paymentSettings.discountPercentage,
				discountType: additionalFields.paymentSettings.discountType || 'percentage',
			} : undefined,
			archived: additionalFields.archived || false,
		};

		if (contactType === 'company') {
			baseContact.company = {
				name: additionalFields.name || '',
				contactPersons: additionalFields.contactPersons ? additionalFields.contactPersons.map((person: any) => ({
					salutation: person.salutation,
					firstName: person.firstName,
					lastName: person.lastName || person.name || '',
					primary: person.primary || false,
				})) : [{
					salutation: additionalFields.salutation,
					lastName: additionalFields.name || '',
					primary: true,
				}],
				vatId: additionalFields.vatId,
				taxNumber: additionalFields.taxNumber,
				commercialRegisterNumber: additionalFields.commercialRegisterNumber,
				commercialRegisterCourt: additionalFields.commercialRegisterCourt,
			};
		} else {
			baseContact.person = {
				salutation: additionalFields.salutation,
				firstName: additionalFields.firstName || additionalFields.name || '',
				lastName: additionalFields.lastName || additionalFields.name || '',
				title: additionalFields.title,
				birthday: additionalFields.birthday,
			};
		}

		return baseContact;
	}

	static transformArticleData(additionalFields: Record<string, any>): ILexwareArticle {
		return {
			version: LEXWARE_DEFAULT_VALUES.DEFAULT_VERSION,
			title: additionalFields.name || additionalFields.title || '',
			type: additionalFields.type || LEXWARE_ARTICLE_TYPES.SERVICE,
			unitName: additionalFields.unitName || LEXWARE_DEFAULT_VALUES.DEFAULT_UNIT_NAME,
			price: {
				netPrice: additionalFields.netPrice || 0,
				grossPrice: additionalFields.grossPrice,
				leadingPrice: additionalFields.leadingPrice || LEXWARE_PRICE_TYPES.NET,
				taxRate: additionalFields.taxRate || LEXWARE_DEFAULT_VALUES.DEFAULT_TAX_RATE,
				currency: additionalFields.currency || LEXWARE_DEFAULT_VALUES.DEFAULT_CURRENCY,
			},
			description: additionalFields.description,
			note: additionalFields.note,
			archived: additionalFields.archived || false,
			// Additional properties from the official API
			articleNumber: additionalFields.articleNumber,
			categoryId: additionalFields.categoryId,
			weight: additionalFields.weight,
			dimensions: additionalFields.dimensions ? {
				length: additionalFields.dimensions.length,
				width: additionalFields.dimensions.width,
				height: additionalFields.dimensions.height,
			} : undefined,
			shippingInfo: additionalFields.shippingInfo ? {
				shippingType: additionalFields.shippingInfo.shippingType || LEXWARE_SHIPPING_TYPES.STANDARD,
				shippingCosts: additionalFields.shippingInfo.shippingCosts,
			} : undefined,
			taxInfo: additionalFields.taxInfo ? {
				taxType: additionalFields.taxInfo.taxType || LEXWARE_TAX_TYPES.NET,
				taxRate: additionalFields.taxInfo.taxRate || LEXWARE_DEFAULT_VALUES.DEFAULT_TAX_RATE,
				smallBusiness: additionalFields.taxInfo.smallBusiness || false,
			} : undefined,
		};
	}

	static transformVoucherData(
		voucherType: string,
		additionalFields: Record<string, any>
	): ILexwareVoucher {
		return {
			voucherType,
			version: additionalFields.version || LEXWARE_DEFAULT_VALUES.DEFAULT_VERSION,
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

	static transformOrderConfirmationData(additionalFields: Record<string, any>): ILexwareOrderConfirmation {
		const baseVoucher = this.transformVoucherData('orderconfirmation', additionalFields);
		return {
			...baseVoucher,
			orderConfirmationStatus: additionalFields.orderConfirmationStatus || 'draft',
			validUntil: additionalFields.validUntil,
			deliveryDate: additionalFields.deliveryDate,
			shippingDate: additionalFields.shippingDate,
			// Enhanced line items with additional properties
			lineItems: additionalFields.lineItems?.map((item: any) => ({
				id: item.id,
				type: item.type || LEXWARE_LINE_ITEM_TYPES.SERVICE,
				name: item.name,
				description: item.description,
				quantity: item.quantity || 1,
				unitName: item.unitName || LEXWARE_DEFAULT_VALUES.DEFAULT_UNIT_NAME,
				unitPrice: item.unitPrice ? {
					currency: item.unitPrice.currency || LEXWARE_DEFAULT_VALUES.DEFAULT_CURRENCY,
					netAmount: item.unitPrice.netAmount,
					grossAmount: item.unitPrice.grossAmount,
					taxRatePercentage: item.unitPrice.taxRatePercentage || LEXWARE_DEFAULT_VALUES.DEFAULT_TAX_RATE,
				} : undefined,
				totalPrice: item.totalPrice ? {
					currency: item.totalPrice.currency || LEXWARE_DEFAULT_VALUES.DEFAULT_CURRENCY,
					netAmount: item.totalPrice.netAmount,
					grossAmount: item.totalPrice.grossAmount,
					taxAmount: item.totalPrice.taxAmount,
				} : undefined,
				articleId: item.articleId,
				articleNumber: item.articleNumber,
			})) || [],
			// Additional properties
			note: additionalFields.note,
			title: additionalFields.title,
			language: additionalFields.language || 'de',
			// Print layout
			printLayoutId: additionalFields.printLayoutId,
		};
	}

	static transformCreditNoteData(additionalFields: Record<string, any>): ILexwareCreditNote {
		const baseVoucher = this.transformVoucherData('creditnote', additionalFields);
		return {
			...baseVoucher,
			creditNoteStatus: additionalFields.creditNoteStatus || 'draft',
			precedingSalesVoucherId: additionalFields.precedingSalesVoucherId,
			// Additional credit note specific properties
			creditNoteNumber: additionalFields.creditNoteNumber,
			originalInvoiceId: additionalFields.originalInvoiceId,
			originalInvoiceNumber: additionalFields.originalInvoiceNumber,
			// Enhanced line items with additional properties
			lineItems: additionalFields.lineItems?.map((item: any) => ({
				id: item.id,
				type: item.type || LEXWARE_LINE_ITEM_TYPES.SERVICE,
				name: item.name,
				description: item.description,
				quantity: item.quantity || 1,
				unitName: item.unitName || LEXWARE_DEFAULT_VALUES.DEFAULT_UNIT_NAME,
				unitPrice: item.unitPrice ? {
					currency: item.unitPrice.currency || LEXWARE_DEFAULT_VALUES.DEFAULT_CURRENCY,
					netAmount: item.unitPrice.netAmount,
					grossAmount: item.unitPrice.grossAmount,
					taxRatePercentage: item.unitPrice.taxRatePercentage || LEXWARE_DEFAULT_VALUES.DEFAULT_TAX_RATE,
				} : undefined,
				totalPrice: item.totalPrice ? {
					currency: item.totalPrice.currency || LEXWARE_DEFAULT_VALUES.DEFAULT_CURRENCY,
					netAmount: item.totalPrice.netAmount,
					grossAmount: item.totalPrice.grossAmount,
					taxAmount: item.totalPrice.taxAmount,
				} : undefined,
				articleId: item.articleId,
				articleNumber: item.articleNumber,
			})) || [],
			// Additional properties
			note: additionalFields.note,
			title: additionalFields.title,
			language: additionalFields.language || 'de',
			// Print layout
			printLayoutId: additionalFields.printLayoutId,
		};
	}

	static transformDeliveryNoteData(additionalFields: Record<string, any>): ILexwareDeliveryNote {
		const baseVoucher = this.transformVoucherData('deliverynote', additionalFields);
		return {
			...baseVoucher,
			deliveryNoteStatus: additionalFields.deliveryNoteStatus || 'draft',
			deliveryDate: additionalFields.deliveryDate,
			deliveryConditions: additionalFields.deliveryConditions ? {
				deliveryType: additionalFields.deliveryConditions.deliveryType || LEXWARE_SHIPPING_TYPES.STANDARD,
				deliveryDate: additionalFields.deliveryConditions.deliveryDate,
				shippingDate: additionalFields.deliveryConditions.shippingDate,
				deliveryAddress: additionalFields.deliveryConditions.deliveryAddress ? {
					type: additionalFields.deliveryConditions.deliveryAddress.type || 'shipping',
					countryCode: additionalFields.deliveryConditions.deliveryAddress.countryCode || LEXWARE_DEFAULT_VALUES.DEFAULT_COUNTRY_CODE,
					street: additionalFields.deliveryConditions.deliveryAddress.street,
					zipCode: additionalFields.deliveryConditions.deliveryAddress.zipCode,
					city: additionalFields.deliveryConditions.deliveryAddress.city,
					address: additionalFields.deliveryConditions.deliveryAddress.address,
					addressAddition: additionalFields.deliveryConditions.deliveryAddress.addressAddition,
					state: additionalFields.deliveryConditions.deliveryAddress.state,
				} : undefined,
			} : undefined,
			paymentTerms: additionalFields.paymentTerms ? {
				paymentTermsId: additionalFields.paymentTerms.paymentTermsId,
				paymentTermsLabel: additionalFields.paymentTerms.paymentTermsLabel,
				paymentTermsLabelTemplate: additionalFields.paymentTerms.paymentTermsLabelTemplate,
				discountPercentage: additionalFields.paymentTerms.discountPercentage,
				discountType: additionalFields.paymentTerms.discountType || 'percentage',
			} : undefined,
			relatedVouchers: additionalFields.relatedVouchers,
			language: additionalFields.language || 'de',
			archived: additionalFields.archived || false,
			createdDate: additionalFields.createdDate,
			updatedDate: additionalFields.updatedDate,
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
