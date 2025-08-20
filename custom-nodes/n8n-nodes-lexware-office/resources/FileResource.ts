import { LexwareApiClient } from '../utils/api';
import { ILexwareFile, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class FileResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(fileId: string): Promise<ILexwareFile> {
		return this.apiClient.get<ILexwareFile>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}`);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareFile[]> {
		return this.apiClient.get<ILexwareFile[]>(LEXWARE_API_ENDPOINTS.FILES, params);
	}

	async upload(file: Buffer | string, fileName: string, contentType: string, voucherId?: string): Promise<ILexwareFile> {
		// For n8n environment, we'll send the file data directly
		// The actual implementation will depend on how n8n handles file uploads
		const fileData = {
			fileName,
			contentType,
			data: file,
			voucherId,
		};

		const response = await this.apiClient.makeRequest<ILexwareFile>(
			'POST',
			LEXWARE_API_ENDPOINTS.FILES,
			fileData
		);
		
		return response;
	}

	async delete(fileId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}`);
	}

	async download(fileId: string): Promise<Buffer> {
		const response = await this.apiClient.get<ArrayBuffer>(`${LEXWARE_API_ENDPOINTS.FILES}/${fileId}/download`);
		return Buffer.from(response);
	}

	async getForVoucher(voucherId: string): Promise<ILexwareFile[]> {
		return this.apiClient.get<ILexwareFile[]>(`${LEXWARE_API_ENDPOINTS.FILES}?voucherId=${voucherId}`);
	}

	validateUploadData(fileName: string, contentType: string): string[] {
		const missingFields: string[] = [];
		
		if (!fileName || fileName.trim() === '') {
			missingFields.push('fileName');
		}
		
		if (!contentType || contentType.trim() === '') {
			missingFields.push('contentType');
		}
		
		return missingFields;
	}
}
