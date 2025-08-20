import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwarePrintLayout, ILexwareCredentials } from '../types';
import { 
	LEXWARE_API_ENDPOINTS,
	LEXWARE_PRINT_LAYOUT_TYPES,
	LEXWARE_PRINT_LAYOUT_STATUSES,
	LEXWARE_PRINT_LAYOUT_FORMATS
} from '../constants';

export class PrintLayoutResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve a specific print layout by ID
	 * @param printLayoutId - The unique identifier of the print layout
	 * @returns Promise<ILexwarePrintLayout> - The print layout data
	 */
	async get(printLayoutId: string): Promise<ILexwarePrintLayout> {
		return this.apiClient.get<ILexwarePrintLayout>(`${LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS}/${printLayoutId}`);
	}

	/**
	 * Retrieve all print layouts with optional filtering and pagination
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwarePrintLayout[]> - Array of print layouts
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, params);
	}

	/**
	 * Get print layouts by type
	 * @param type - The print layout type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByType(type: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const typeParams = {
			...params,
			type,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, typeParams);
	}

	/**
	 * Get invoice print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Invoice print layouts
	 */
	async getInvoiceLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.INVOICE, params);
	}

	/**
	 * Get quotation print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Quotation print layouts
	 */
	async getQuotationLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.QUOTATION, params);
	}

	/**
	 * Get order confirmation print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Order confirmation print layouts
	 */
	async getOrderConfirmationLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.ORDER_CONFIRMATION, params);
	}

	/**
	 * Get delivery note print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Delivery note print layouts
	 */
	async getDeliveryNoteLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.DELIVERY_NOTE, params);
	}

	/**
	 * Get credit note print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Credit note print layouts
	 */
	async getCreditNoteLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.CREDIT_NOTE, params);
	}

	/**
	 * Get dunning print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Dunning print layouts
	 */
	async getDunningLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.DUNNING, params);
	}

	/**
	 * Get down payment invoice print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Down payment invoice print layouts
	 */
	async getDownPaymentInvoiceLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.DOWN_PAYMENT_INVOICE, params);
	}

	/**
	 * Get receipt print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Receipt print layouts
	 */
	async getReceiptLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.RECEIPT, params);
	}

	/**
	 * Get reminder print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Reminder print layouts
	 */
	async getReminderLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.REMINDER, params);
	}

	/**
	 * Get confirmation print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Confirmation print layouts
	 */
	async getConfirmationLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByType(LEXWARE_PRINT_LAYOUT_TYPES.CONFIRMATION, params);
	}

	/**
	 * Get print layouts by status
	 * @param status - The print layout status to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByStatus(status: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const statusParams = {
			...params,
			status,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, statusParams);
	}

	/**
	 * Get active print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Active print layouts
	 */
	async getActive(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByStatus(LEXWARE_PRINT_LAYOUT_STATUSES.ACTIVE, params);
	}

	/**
	 * Get inactive print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Inactive print layouts
	 */
	async getInactive(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByStatus(LEXWARE_PRINT_LAYOUT_STATUSES.INACTIVE, params);
	}

	/**
	 * Get archived print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Archived print layouts
	 */
	async getArchived(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByStatus(LEXWARE_PRINT_LAYOUT_STATUSES.ARCHIVED, params);
	}

	/**
	 * Get draft print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Draft print layouts
	 */
	async getDrafts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByStatus(LEXWARE_PRINT_LAYOUT_STATUSES.DRAFT, params);
	}

	/**
	 * Get print layouts by format
	 * @param format - The print layout format to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByFormat(format: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const formatParams = {
			...params,
			format,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, formatParams);
	}

	/**
	 * Get PDF print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - PDF print layouts
	 */
	async getPDFLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByFormat(LEXWARE_PRINT_LAYOUT_FORMATS.PDF, params);
	}

	/**
	 * Get HTML print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - HTML print layouts
	 */
	async getHTMLLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByFormat(LEXWARE_PRINT_LAYOUT_FORMATS.HTML, params);
	}

	/**
	 * Get XML print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - XML print layouts
	 */
	async getXMLLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByFormat(LEXWARE_PRINT_LAYOUT_FORMATS.XML, params);
	}

	/**
	 * Get JSON print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - JSON print layouts
	 */
	async getJSONLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByFormat(LEXWARE_PRINT_LAYOUT_FORMATS.JSON, params);
	}

	/**
	 * Get print layouts by page size
	 * @param pageSize - The page size to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByPageSize(pageSize: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const pageSizeParams = {
			...params,
			pageSize,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, pageSizeParams);
	}

	/**
	 * Get A4 print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - A4 print layouts
	 */
	async getA4Layouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByPageSize('A4', params);
	}

	/**
	 * Get A3 print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - A3 print layouts
	 */
	async getA3Layouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByPageSize('A3', params);
	}

	/**
	 * Get letter print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Letter print layouts
	 */
	async getLetterLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByPageSize('letter', params);
	}

	/**
	 * Get print layouts by orientation
	 * @param orientation - The orientation to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByOrientation(orientation: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const orientationParams = {
			...params,
			orientation,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, orientationParams);
	}

	/**
	 * Get portrait print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Portrait print layouts
	 */
	async getPortraitLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByOrientation('portrait', params);
	}

	/**
	 * Get landscape print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Landscape print layouts
	 */
	async getLandscapeLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		return this.getByOrientation('landscape', params);
	}

	/**
	 * Get default print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Default print layouts
	 */
	async getDefaults(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const defaultParams = {
			...params,
			isDefault: true,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, defaultParams);
	}

	/**
	 * Get system print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - System print layouts
	 */
	async getSystemLayouts(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const systemParams = {
			...params,
			isSystem: true,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, systemParams);
	}

	/**
	 * Get editable print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Editable print layouts
	 */
	async getEditable(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const editableParams = {
			...params,
			isEditable: true,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, editableParams);
	}

	/**
	 * Get public print layouts
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Public print layouts
	 */
	async getPublic(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const publicParams = {
			...params,
			isPublic: true,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, publicParams);
	}

	/**
	 * Search print layouts by text
	 * @param searchTerm - The search term to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Search results
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const searchParams = {
			...params,
			q: searchTerm,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, searchParams);
	}

	/**
	 * Get print layouts by language
	 * @param language - The language to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByLanguage(language: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const languageParams = {
			...params,
			language,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, languageParams);
	}

	/**
	 * Get print layouts by usage count range
	 * @param minUsage - Minimum usage count for filtering
	 * @param maxUsage - Maximum usage count for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByUsageRange(minUsage: number, maxUsage: number, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const usageParams = {
			...params,
			usageCountFrom: minUsage,
			usageCountTo: maxUsage,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, usageParams);
	}

	/**
	 * Get print layouts by last used date range
	 * @param startDate - Start date for filtering
	 * @param endDate - End date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByLastUsedRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const lastUsedParams = {
			...params,
			lastUsedFrom: startDate,
			lastUsedTo: endDate,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, lastUsedParams);
	}

	/**
	 * Get print layouts by tag
	 * @param tag - The tag to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByTag(tag: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const tagParams = {
			...params,
			tag,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, tagParams);
	}

	/**
	 * Get print layouts by font
	 * @param font - The font to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByFont(font: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const fontParams = {
			...params,
			font,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, fontParams);
	}

	/**
	 * Get print layouts with header enabled
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Print layouts with headers
	 */
	async getWithHeaders(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const headerParams = {
			...params,
			headerEnabled: true,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, headerParams);
	}

	/**
	 * Get print layouts with footer enabled
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Print layouts with footers
	 */
	async getWithFooters(params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const footerParams = {
			...params,
			footerEnabled: true,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, footerParams);
	}

	/**
	 * Get print layouts by template version
	 * @param templateVersion - The template version to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByTemplateVersion(templateVersion: string, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const versionParams = {
			...params,
			templateVersion,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, versionParams);
	}

	/**
	 * Get print layouts by resolution
	 * @param resolution - The resolution to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePrintLayout[]> - Filtered print layouts
	 */
	async getByResolution(resolution: number, params?: Record<string, any>): Promise<ILexwarePrintLayout[]> {
		const resolutionParams = {
			...params,
			resolution,
		};
		return this.apiClient.get<ILexwarePrintLayout[]>(LEXWARE_API_ENDPOINTS.PRINT_LAYOUTS, resolutionParams);
	}

	/**
	 * Validate print layout creation data
	 * @param printLayoutData - The data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateCreateData(printLayoutData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Required fields validation
		if (!printLayoutData.name || printLayoutData.name.trim() === '') {
			errors.push('Print layout name is required');
		}
		
		if (!printLayoutData.type || !Object.values(LEXWARE_PRINT_LAYOUT_TYPES).includes(printLayoutData.type)) {
			errors.push('Valid print layout type is required');
		}
		
		if (!printLayoutData.status || !Object.values(LEXWARE_PRINT_LAYOUT_STATUSES).includes(printLayoutData.status)) {
			errors.push('Valid print layout status is required');
		}
		
		if (!printLayoutData.format || !Object.values(LEXWARE_PRINT_LAYOUT_FORMATS).includes(printLayoutData.format)) {
			errors.push('Valid print layout format is required');
		}
		
		// Name length validation
		if (printLayoutData.name && printLayoutData.name.length > 100) {
			errors.push('Print layout name must be 100 characters or less');
		}
		
		// Description length validation
		if (printLayoutData.description && printLayoutData.description.length > 500) {
			errors.push('Print layout description must be 500 characters or less');
		}
		
		// Number format validation
		if (printLayoutData.number && !/^[A-Z0-9\-_]+$/i.test(printLayoutData.number)) {
			errors.push('Print layout number must contain only alphanumeric characters, hyphens, and underscores');
		}
		
		// Page size validation
		if (printLayoutData.pageSize && !['A4', 'A3', 'A5', 'letter', 'legal', 'custom'].includes(printLayoutData.pageSize)) {
			errors.push('Invalid page size specified');
		}
		
		// Custom page size validation
		if (printLayoutData.pageSize === 'custom' && printLayoutData.customPageSize) {
			if (!printLayoutData.customPageSize.width || !printLayoutData.customPageSize.height) {
				errors.push('Custom page size requires width and height');
			}
			if (!['mm', 'cm', 'inch', 'pt'].includes(printLayoutData.customPageSize.unit)) {
				errors.push('Invalid custom page size unit');
			}
		}
		
		// Orientation validation
		if (printLayoutData.orientation && !['portrait', 'landscape'].includes(printLayoutData.orientation)) {
			errors.push('Invalid orientation specified');
		}
		
		// Font size validation
		if (printLayoutData.defaultFontSize && (isNaN(printLayoutData.defaultFontSize) || printLayoutData.defaultFontSize < 6 || printLayoutData.defaultFontSize > 72)) {
			errors.push('Default font size must be between 6 and 72');
		}
		
		// Resolution validation
		if (printLayoutData.renderSettings?.resolution && (isNaN(printLayoutData.renderSettings.resolution) || printLayoutData.renderSettings.resolution < 72 || printLayoutData.renderSettings.resolution > 600)) {
			errors.push('Resolution must be between 72 and 600 DPI');
		}
		
		// Quality validation
		if (printLayoutData.renderSettings?.quality && (isNaN(printLayoutData.renderSettings.quality) || printLayoutData.renderSettings.quality < 1 || printLayoutData.renderSettings.quality > 100)) {
			errors.push('Quality must be between 1 and 100');
		}
		
		return errors;
	}

	/**
	 * Validate print layout update data
	 * @param updateData - The data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(updateData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Name length validation
		if (updateData.name && updateData.name.length > 100) {
			errors.push('Print layout name must be 100 characters or less');
		}
		
		// Description length validation
		if (updateData.description && updateData.description.length > 500) {
			errors.push('Print layout description must be 500 characters or less');
		}
		
		// Type validation
		if (updateData.type && !Object.values(LEXWARE_PRINT_LAYOUT_TYPES).includes(updateData.type)) {
			errors.push('Invalid print layout type');
		}
		
		// Status validation
		if (updateData.status && !Object.values(LEXWARE_PRINT_LAYOUT_STATUSES).includes(updateData.status)) {
			errors.push('Invalid print layout status');
		}
		
		// Format validation
		if (updateData.format && !Object.values(LEXWARE_PRINT_LAYOUT_FORMATS).includes(updateData.format)) {
			errors.push('Invalid print layout format');
		}
		
		// Number format validation
		if (updateData.number && !/^[A-Z0-9\-_]+$/i.test(updateData.number)) {
			errors.push('Print layout number must contain only alphanumeric characters, hyphens, and underscores');
		}
		
		// Page size validation
		if (updateData.pageSize && !['A4', 'A3', 'A5', 'letter', 'legal', 'custom'].includes(updateData.pageSize)) {
			errors.push('Invalid page size specified');
		}
		
		// Custom page size validation
		if (updateData.pageSize === 'custom' && updateData.customPageSize) {
			if (!updateData.customPageSize.width || !updateData.customPageSize.height) {
				errors.push('Custom page size requires width and height');
			}
			if (!['mm', 'cm', 'inch', 'pt'].includes(updateData.customPageSize.unit)) {
				errors.push('Invalid custom page size unit');
			}
		}
		
		// Orientation validation
		if (updateData.orientation && !['portrait', 'landscape'].includes(updateData.orientation)) {
			errors.push('Invalid orientation specified');
		}
		
		// Font size validation
		if (updateData.defaultFontSize && (isNaN(updateData.defaultFontSize) || updateData.defaultFontSize < 6 || updateData.defaultFontSize > 72)) {
			errors.push('Default font size must be between 6 and 72');
		}
		
		// Resolution validation
		if (updateData.renderSettings?.resolution && (isNaN(updateData.renderSettings.resolution) || updateData.renderSettings.resolution < 72 || updateData.renderSettings.resolution > 600)) {
			errors.push('Resolution must be between 72 and 600 DPI');
		}
		
		// Quality validation
		if (updateData.renderSettings?.quality && (isNaN(updateData.renderSettings.quality) || updateData.renderSettings.quality < 1 || updateData.renderSettings.quality > 100)) {
			errors.push('Quality must be between 1 and 100');
		}
		
		return errors;
	}
}
