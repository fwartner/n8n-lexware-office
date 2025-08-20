import { LexwareApiClient } from '../utils/api';
import { ILexwareFile, ILexwareCredentials } from '../types';
import { 
	LEXWARE_API_ENDPOINTS, 
	LEXWARE_FILE_TYPES, 
	LEXWARE_FILE_CATEGORIES,
	LEXWARE_FILE_ACCESS_LEVELS,
	LEXWARE_FILE_PROCESSING_STATUSES,
	LEXWARE_SUPPORTED_CONTENT_TYPES
} from '../constants';

export class FileResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve a specific file by ID
	 * @param fileId - The unique identifier of the file
	 * @returns Promise<ILexwareFile> - The file data
	 */
	async get(fileId: string): Promise<ILexwareFile> {
		return this.apiClient.get<ILexwareFile>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}`);
	}

	/**
	 * Retrieve all files with optional filtering and pagination
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwareFile[]> - Array of files
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareFile[]> {
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, params);
	}

	/**
	 * Upload a new file
	 * @param file - File content as Buffer or string
	 * @param fileName - Name of the file
	 * @param contentType - MIME type of the file
	 * @param voucherId - Optional voucher ID to associate with
	 * @param additionalFields - Additional file metadata
	 * @returns Promise<ILexwareFile> - The uploaded file
	 */
	async upload(
		file: Buffer | string, 
		fileName: string, 
		contentType: string, 
		voucherId?: string,
		additionalFields?: Record<string, any>
	): Promise<ILexwareFile> {
		const fileData = {
			fileName,
			contentType,
			data: file,
			voucherId,
			...additionalFields,
		};

		const response = await this.apiClient.makeRequest<ILexwareFile>(
			'POST',
			LEXWARE_API_ENDPOINTS.FILES,
			fileData
		);
		
		return response;
	}

	/**
	 * Delete a file
	 * @param fileId - The unique identifier of the file to delete
	 * @returns Promise<void>
	 */
	async delete(fileId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}`);
	}

	/**
	 * Download a file
	 * @param fileId - The unique identifier of the file to download
	 * @returns Promise<Buffer> - File content as Buffer
	 */
	async download(fileId: string): Promise<Buffer> {
		const response = await this.apiClient.get<ArrayBuffer>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}/download`);
		return Buffer.from(response);
	}

	/**
	 * Get files associated with a specific voucher
	 * @param voucherId - The voucher ID to filter by
	 * @returns Promise<ILexwareFile[]> - Array of associated files
	 */
	async getForVoucher(voucherId: string): Promise<ILexwareFile[]> {
		return this.apiClient.get<ILexwareFile[]>(`${LEXWARE_API_ENDPOINTS.FILES}?voucherId=${voucherId}`);
	}

	/**
	 * Get files by type
	 * @param fileType - The file type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Filtered files
	 */
	async getByType(fileType: string, params?: Record<string, any>): Promise<ILexwareFile[]> {
		const typeParams = {
			...params,
			type: fileType,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, typeParams);
	}

	/**
	 * Get files by category
	 * @param category - The file category to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Filtered files
	 */
	async getByCategory(category: string, params?: Record<string, any>): Promise<ILexwareFile[]> {
		const categoryParams = {
			...params,
			category,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, categoryParams);
	}

	/**
	 * Get files by content type
	 * @param contentType - The MIME type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Filtered files
	 */
	async getByContentType(contentType: string, params?: Record<string, any>): Promise<ILexwareFile[]> {
		const contentTypeParams = {
			...params,
			contentType,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, contentTypeParams);
	}

	/**
	 * Get files by access level
	 * @param accessLevel - The access level to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Filtered files
	 */
	async getByAccessLevel(accessLevel: string, params?: Record<string, any>): Promise<ILexwareFile[]> {
		const accessParams = {
			...params,
			accessLevel,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, accessParams);
	}

	/**
	 * Get files by processing status
	 * @param status - The processing status to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Filtered files
	 */
	async getByProcessingStatus(status: string, params?: Record<string, any>): Promise<ILexwareFile[]> {
		const statusParams = {
			...params,
			processingStatus: status,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, statusParams);
	}

	/**
	 * Get e-invoice files
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - E-invoice files
	 */
	async getEInvoices(params?: Record<string, any>): Promise<ILexwareFile[]> {
		const einvoiceParams = {
			...params,
			isEInvoice: true,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, einvoiceParams);
	}

	/**
	 * Get files by contact ID
	 * @param contactId - The contact ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Filtered files
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareFile[]> {
		const contactParams = {
			...params,
			contactId,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, contactParams);
	}

	/**
	 * Get files by article ID
	 * @param articleId - The article ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Filtered files
	 */
	async getByArticle(articleId: string, params?: Record<string, any>): Promise<ILexwareFile[]> {
		const articleParams = {
			...params,
			articleId,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, articleParams);
	}

	/**
	 * Search files by text
	 * @param searchTerm - The search term to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Search results
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwareFile[]> {
		const searchParams = {
			...params,
			q: searchTerm,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, searchParams);
	}

	/**
	 * Get files by date range
	 * @param startDate - Start date for filtering
	 * @param endDate - End date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Filtered files
	 */
	async getByDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareFile[]> {
		const dateParams = {
			...params,
			createdAtFrom: startDate,
			createdAtTo: endDate,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, dateParams);
	}

	/**
	 * Get archived files
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Archived files
	 */
	async getArchived(params?: Record<string, any>): Promise<ILexwareFile[]> {
		const archivedParams = {
			...params,
			isArchived: true,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, archivedParams);
	}

	/**
	 * Get public files
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareFile[]> - Public files
	 */
	async getPublic(params?: Record<string, any>): Promise<ILexwareFile[]> {
		const publicParams = {
			...params,
			isPublic: true,
		};
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, publicParams);
	}

	/**
	 * Update file metadata
	 * @param fileId - The file ID to update
	 * @param metadata - Updated metadata
	 * @returns Promise<ILexwareFile> - Updated file
	 */
	async updateMetadata(fileId: string, metadata: Partial<ILexwareFile>): Promise<ILexwareFile> {
		return this.apiClient.put<ILexwareFile>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}`, metadata);
	}

	/**
	 * Archive a file
	 * @param fileId - The file ID to archive
	 * @returns Promise<ILexwareFile> - Archived file
	 */
	async archive(fileId: string): Promise<ILexwareFile> {
		return this.apiClient.put<ILexwareFile>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}`, { isArchived: true });
	}

	/**
	 * Unarchive a file
	 * @param fileId - The file ID to unarchive
	 * @returns Promise<ILexwareFile> - Unarchived file
	 */
	async unarchive(fileId: string): Promise<ILexwareFile> {
		return this.apiClient.put<ILexwareFile>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}`, { isArchived: false });
	}

	/**
	 * Change file access level
	 * @param fileId - The file ID to update
	 * @param accessLevel - New access level
	 * @returns Promise<ILexwareFile> - Updated file
	 */
	async changeAccessLevel(fileId: string, accessLevel: string): Promise<ILexwareFile> {
		return this.apiClient.put<ILexwareFile>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}`, { accessLevel });
	}

	/**
	 * Get file preview URL
	 * @param fileId - The file ID
	 * @returns Promise<string> - Preview URL
	 */
	async getPreviewUrl(fileId: string): Promise<string> {
		const file = await this.get(fileId);
		return file.previewUrl || '';
	}

	/**
	 * Get file thumbnail URL
	 * @param fileId - The file ID
	 * @returns Promise<string> - Thumbnail URL
	 */
	async getThumbnailUrl(fileId: string): Promise<string> {
		const file = await this.get(fileId);
		return file.thumbnailUrl || '';
	}

	/**
	 * Get file deeplink
	 * @param fileId - The file ID
	 * @returns Promise<string> - Deeplink URL
	 */
	async getDeeplink(fileId: string): Promise<string> {
		const file = await this.get(fileId);
		return `https://app.lexware.de/files/${fileId}`;
	}

	/**
	 * Validate file upload data
	 * @param fileName - File name to validate
	 * @param contentType - Content type to validate
	 * @param additionalFields - Additional fields to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUploadData(fileName: string, contentType: string, additionalFields?: Record<string, any>): string[] {
		const errors: string[] = [];
		
		if (!fileName || fileName.trim() === '') {
			errors.push('fileName is required');
		}
		
		if (!contentType || contentType.trim() === '') {
			errors.push('contentType is required');
		}
		
		// Validate content type (basic MIME type format)
		if (contentType && !contentType.includes('/')) {
			errors.push('Invalid content type format. Must be in MIME type format (e.g., image/jpeg)');
		}
		
		// Validate file type if provided
		if (additionalFields?.type && !Object.values(LEXWARE_FILE_TYPES).includes(additionalFields.type)) {
			errors.push(`Invalid file type: ${additionalFields.type}`);
		}
		
		// Validate category if provided
		if (additionalFields?.category && !Object.values(LEXWARE_FILE_CATEGORIES).includes(additionalFields.category)) {
			errors.push(`Invalid file category: ${additionalFields.category}`);
		}
		
		// Validate access level if provided
		if (additionalFields?.accessLevel && !Object.values(LEXWARE_FILE_ACCESS_LEVELS).includes(additionalFields.accessLevel)) {
			errors.push(`Invalid access level: ${additionalFields.accessLevel}`);
		}
		
		return errors;
	}

	/**
	 * Validate file update data
	 * @param updateData - The data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(updateData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Validate file type if provided
		if (updateData.type && !Object.values(LEXWARE_FILE_TYPES).includes(updateData.type)) {
			errors.push(`Invalid file type: ${updateData.type}`);
		}
		
		// Validate category if provided
		if (updateData.category && !Object.values(LEXWARE_FILE_CATEGORIES).includes(updateData.category)) {
			errors.push(`Invalid file category: ${updateData.category}`);
		}
		
		// Validate access level if provided
		if (updateData.accessLevel && !Object.values(LEXWARE_FILE_ACCESS_LEVELS).includes(updateData.accessLevel)) {
			errors.push(`Invalid access level: ${updateData.accessLevel}`);
		}
		
		// Validate processing status if provided
		if (updateData.processingStatus && !Object.values(LEXWARE_FILE_PROCESSING_STATUSES).includes(updateData.processingStatus)) {
			errors.push(`Invalid processing status: ${updateData.processingStatus}`);
		}
		
		return errors;
	}
}
