import { 
	LEXWARE_ERROR_CODES, 
	LEXWARE_ERROR_CODE_MESSAGES, 
	LEXWARE_ERROR_CATEGORIES,
	LEXWARE_ERROR_SEVERITY,
	LEXWARE_HTTP_STATUS_CODES
} from '../constants';
import { 
	ILexwareApiErrorResponse, 
	ILexwareErrorCodeInfo, 
	ILexwareErrorFieldValidation,
	ILexwareErrorContext 
} from '../types';

/**
 * Lexware API Error Code Utility
 * Based on the official Lexware API documentation for Error Codes
 * 
 * This utility provides comprehensive handling of Lexware API error codes,
 * including categorization, severity assessment, and user action recommendations.
 */
export class ErrorCodeManager {
	
	/**
	 * Get comprehensive error code information
	 * @param errorCode - The error code to analyze
	 * @returns ILexwareErrorCodeInfo - Detailed error code information
	 */
	static getErrorCodeInfo(errorCode: string): ILexwareErrorCodeInfo {
		const message = LEXWARE_ERROR_CODE_MESSAGES[errorCode as keyof typeof LEXWARE_ERROR_CODE_MESSAGES] || 'Unknown error code';
		const category = this.getErrorCategory(errorCode);
		const severity = this.getErrorSeverity(errorCode);
		const retryable = this.isRetryable(errorCode);
		const userActionable = this.isUserActionable(errorCode);
		const httpStatus = this.getHttpStatusForError(errorCode);
		const description = this.getErrorDescription(errorCode);
		const suggestedAction = this.getSuggestedAction(errorCode);
		
		return {
			code: errorCode,
			message,
			category,
			severity,
			retryable,
			userActionable,
			httpStatus,
			description,
			suggestedAction,
			documentationUrl: this.getDocumentationUrl(errorCode),
		};
	}

	/**
	 * Get error category
	 * @param errorCode - The error code to categorize
	 * @returns string - The error category
	 */
	static getErrorCategory(errorCode: string): string {
		// Authorization and Connection Errors
		if (errorCode.includes('AUTHENTICATION') || errorCode.includes('API_KEY') || errorCode.includes('PERMISSIONS')) {
			return LEXWARE_ERROR_CATEGORIES.AUTHENTICATION;
		}
		
		if (errorCode.includes('CONNECTION') || errorCode.includes('NETWORK')) {
			return LEXWARE_ERROR_CATEGORIES.CONNECTION;
		}
		
		// Resource and Data Errors
		if (errorCode.includes('RESOURCE')) {
			return LEXWARE_ERROR_CATEGORIES.RESOURCE;
		}
		
		// Validation Errors
		if (errorCode.includes('VALIDATION') || errorCode.includes('FIELD') || errorCode.includes('INVALID')) {
			return LEXWARE_ERROR_CATEGORIES.VALIDATION;
		}
		
		// Business Logic Errors
		if (errorCode.includes('BUSINESS') || errorCode.includes('WORKFLOW') || errorCode.includes('TRANSITION')) {
			return LEXWARE_ERROR_CATEGORIES.BUSINESS_LOGIC;
		}
		
		// Rate Limiting and Throttling
		if (errorCode.includes('RATE_LIMIT') || errorCode.includes('THROTTLE') || errorCode.includes('QUOTA')) {
			return LEXWARE_ERROR_CATEGORIES.RATE_LIMITING;
		}
		
		// Server and System Errors
		if (errorCode.includes('SERVER') || errorCode.includes('SYSTEM') || errorCode.includes('DATABASE')) {
			return LEXWARE_ERROR_CATEGORIES.SERVER;
		}
		
		// Optimistic Locking Errors
		if (errorCode.includes('VERSION') || errorCode.includes('CONCURRENT') || errorCode.includes('STALE')) {
			return LEXWARE_ERROR_CATEGORIES.OPTIMISTIC_LOCKING;
		}
		
		// File and Upload Errors
		if (errorCode.includes('FILE') || errorCode.includes('UPLOAD') || errorCode.includes('DOWNLOAD')) {
			return LEXWARE_ERROR_CATEGORIES.FILE;
		}
		
		// XRechnung and E-Invoice Errors
		if (errorCode.includes('XRECHNUNG') || errorCode.includes('EINVOICE')) {
			return LEXWARE_ERROR_CATEGORIES.XRECHNUNG;
		}
		
		return 'unknown';
	}

	/**
	 * Get error severity level
	 * @param errorCode - The error code to assess
	 * @returns string - The error severity level
	 */
	static getErrorSeverity(errorCode: string): string {
		// Critical errors - system cannot function
		if (errorCode.includes('AUTHENTICATION_FAILED') || 
			errorCode.includes('INVALID_API_KEY') || 
			errorCode.includes('API_KEY_EXPIRED')) {
			return LEXWARE_ERROR_SEVERITY.CRITICAL;
		}
		
		// High severity - major functionality affected
		if (errorCode.includes('INSUFFICIENT_PERMISSIONS') || 
			errorCode.includes('RESOURCE_LOCKED') || 
			errorCode.includes('BUSINESS_RULE_VIOLATION')) {
			return LEXWARE_ERROR_SEVERITY.HIGH;
		}
		
		// Medium severity - some functionality affected
		if (errorCode.includes('VALIDATION_FAILED') || 
			errorCode.includes('RESOURCE_NOT_FOUND') || 
			errorCode.includes('VERSION_CONFLICT')) {
			return LEXWARE_ERROR_SEVERITY.MEDIUM;
		}
		
		// Low severity - minor issues
		if (errorCode.includes('FIELD_TOO_LONG') || 
			errorCode.includes('INVALID_FORMAT') || 
			errorCode.includes('RATE_LIMIT_EXCEEDED')) {
			return LEXWARE_ERROR_SEVERITY.LOW;
		}
		
		return LEXWARE_ERROR_SEVERITY.MEDIUM;
	}

	/**
	 * Check if error is retryable
	 * @param errorCode - The error code to check
	 * @returns boolean - Whether the error is retryable
	 */
	static isRetryable(errorCode: string): boolean {
		// Retryable error codes
		const retryableCodes = [
			LEXWARE_ERROR_CODES.CONNECTION_TIMEOUT,
			LEXWARE_ERROR_CODES.CONNECTION_REFUSED,
			LEXWARE_ERROR_CODES.NETWORK_UNREACHABLE,
			LEXWARE_ERROR_CODES.RATE_LIMIT_EXCEEDED,
			LEXWARE_ERROR_CODES.THROTTLE_LIMIT_EXCEEDED,
			LEXWARE_ERROR_CODES.INTERNAL_SERVER_ERROR,
			LEXWARE_ERROR_CODES.SERVICE_UNAVAILABLE,
			LEXWARE_ERROR_CODES.SYSTEM_OVERLOAD,
			LEXWARE_ERROR_CODES.DATABASE_ERROR,
			LEXWARE_ERROR_CODES.EXTERNAL_SERVICE_ERROR,
		];
		
		return retryableCodes.includes(errorCode as any);
	}

	/**
	 * Check if error requires user action
	 * @param errorCode - The error code to check
	 * @returns boolean - Whether the user needs to take action
	 */
	static isUserActionable(errorCode: string): boolean {
		// User actionable error codes
		const userActionableCodes = [
			LEXWARE_ERROR_CODES.AUTHENTICATION_FAILED,
			LEXWARE_ERROR_CODES.INVALID_API_KEY,
			LEXWARE_ERROR_CODES.API_KEY_EXPIRED,
			LEXWARE_ERROR_CODES.INSUFFICIENT_PERMISSIONS,
			LEXWARE_ERROR_CODES.RESOURCE_NOT_FOUND,
			LEXWARE_ERROR_CODES.VALIDATION_FAILED,
			LEXWARE_ERROR_CODES.REQUIRED_FIELD_MISSING,
			LEXWARE_ERROR_CODES.INVALID_FIELD_VALUE,
			LEXWARE_ERROR_CODES.BUSINESS_RULE_VIOLATION,
			LEXWARE_ERROR_CODES.VERSION_CONFLICT,
			LEXWARE_ERROR_CODES.FILE_TOO_LARGE,
			LEXWARE_ERROR_CODES.INVALID_FILE_TYPE,
		];
		
		return userActionableCodes.includes(errorCode as any);
	}

	/**
	 * Get HTTP status code for error
	 * @param errorCode - The error code to map
	 * @returns number - The corresponding HTTP status code
	 */
	static getHttpStatusForError(errorCode: string): number {
		// Authorization and Connection Errors
		if (errorCode.includes('AUTHENTICATION') || errorCode.includes('API_KEY') || errorCode.includes('PERMISSIONS')) {
			return LEXWARE_HTTP_STATUS_CODES.UNAUTHORIZED;
		}
		
		if (errorCode.includes('CONNECTION') || errorCode.includes('NETWORK')) {
			return LEXWARE_HTTP_STATUS_CODES.REQUEST_TIMEOUT;
		}
		
		// Resource Errors
		if (errorCode.includes('RESOURCE_NOT_FOUND')) {
			return LEXWARE_HTTP_STATUS_CODES.NOT_FOUND;
		}
		
		if (errorCode.includes('RESOURCE_CONFLICT') || errorCode.includes('RESOURCE_LOCKED')) {
			return LEXWARE_HTTP_STATUS_CODES.CONFLICT;
		}
		
		// Validation Errors
		if (errorCode.includes('VALIDATION') || errorCode.includes('FIELD') || errorCode.includes('INVALID')) {
			return LEXWARE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
		}
		
		// Business Logic Errors
		if (errorCode.includes('BUSINESS') || errorCode.includes('WORKFLOW')) {
			return LEXWARE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
		}
		
		// Rate Limiting
		if (errorCode.includes('RATE_LIMIT') || errorCode.includes('THROTTLE') || errorCode.includes('QUOTA')) {
			return LEXWARE_HTTP_STATUS_CODES.TOO_MANY_REQUESTS;
		}
		
		// Server Errors
		if (errorCode.includes('SERVER') || errorCode.includes('SYSTEM') || errorCode.includes('DATABASE')) {
			return LEXWARE_HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
		}
		
		// Optimistic Locking
		if (errorCode.includes('VERSION') || errorCode.includes('CONCURRENT')) {
			return LEXWARE_HTTP_STATUS_CODES.CONFLICT;
		}
		
		// File Errors
		if (errorCode.includes('FILE')) {
			return LEXWARE_HTTP_STATUS_CODES.BAD_REQUEST;
		}
		
		// Default to bad request
		return LEXWARE_HTTP_STATUS_CODES.BAD_REQUEST;
	}

	/**
	 * Get detailed error description
	 * @param errorCode - The error code to describe
	 * @returns string - Detailed error description
	 */
	static getErrorDescription(errorCode: string): string {
		switch (errorCode) {
			// Authorization and Connection Errors
			case LEXWARE_ERROR_CODES.AUTHENTICATION_FAILED:
				return 'The authentication process failed due to invalid or expired credentials. This prevents access to protected resources.';
			case LEXWARE_ERROR_CODES.INVALID_API_KEY:
				return 'The provided API key is not valid or has been revoked. This is a critical error that prevents all API access.';
			case LEXWARE_ERROR_CODES.API_KEY_EXPIRED:
				return 'The API key has reached its expiration date and is no longer valid. A new key must be generated.';
			case LEXWARE_ERROR_CODES.INSUFFICIENT_PERMISSIONS:
				return 'The authenticated user does not have sufficient permissions to perform the requested operation.';
			case LEXWARE_ERROR_CODES.CONNECTION_TIMEOUT:
				return 'The connection to the Lexware API timed out. This may be due to network issues or server overload.';
			case LEXWARE_ERROR_CODES.CONNECTION_REFUSED:
				return 'The connection to the Lexware API was refused. This may indicate server maintenance or network issues.';
			case LEXWARE_ERROR_CODES.NETWORK_UNREACHABLE:
				return 'The network path to the Lexware API is unreachable. This may be due to network configuration issues.';
			
			// Resource and Data Errors
			case LEXWARE_ERROR_CODES.RESOURCE_NOT_FOUND:
				return 'The requested resource could not be found in the system. This may indicate an invalid ID or deleted resource.';
			case LEXWARE_ERROR_CODES.RESOURCE_ALREADY_EXISTS:
				return 'A resource with the specified identifier already exists. This prevents creation of duplicate resources.';
			case LEXWARE_ERROR_CODES.RESOURCE_IN_USE:
				return 'The resource is currently in use by another process and cannot be modified or deleted.';
			case LEXWARE_ERROR_CODES.RESOURCE_DELETED:
				return 'The requested resource has been deleted and is no longer available in the system.';
			case LEXWARE_ERROR_CODES.RESOURCE_LOCKED:
				return 'The resource is locked and cannot be accessed or modified. This may be due to ongoing operations.';
			case LEXWARE_ERROR_CODES.RESOURCE_CONFLICT:
				return 'A conflict was detected with the resource state. This may be due to concurrent modifications.';
			
			// Validation Errors
			case LEXWARE_ERROR_CODES.VALIDATION_FAILED:
				return 'The provided data failed validation checks. This prevents the operation from completing successfully.';
			case LEXWARE_ERROR_CODES.REQUIRED_FIELD_MISSING:
				return 'A required field is missing from the request data. All mandatory fields must be provided.';
			case LEXWARE_ERROR_CODES.INVALID_FIELD_VALUE:
				return 'The value provided for a field is invalid according to the field\'s constraints and validation rules.';
			case LEXWARE_ERROR_CODES.FIELD_TOO_LONG:
				return 'The field value exceeds the maximum allowed length. Please shorten the value and try again.';
			case LEXWARE_ERROR_CODES.FIELD_TOO_SHORT:
				return 'The field value is below the minimum required length. Please provide a longer value.';
			case LEXWARE_ERROR_CODES.INVALID_FORMAT:
				return 'The provided data format is invalid. Please check the expected format and try again.';
			case LEXWARE_ERROR_CODES.INVALID_DATE:
				return 'The provided date format is invalid. Please use the expected date format (ISO 8601).';
			case LEXWARE_ERROR_CODES.INVALID_EMAIL:
				return 'The provided email address format is invalid. Please provide a valid email address.';
			case LEXWARE_ERROR_CODES.INVALID_PHONE:
				return 'The provided phone number format is invalid. Please provide a valid phone number.';
			case LEXWARE_ERROR_CODES.INVALID_IBAN:
				return 'The provided IBAN format is invalid. Please provide a valid IBAN number.';
			case LEXWARE_ERROR_CODES.INVALID_BIC:
				return 'The provided BIC format is invalid. Please provide a valid BIC code.';
			case LEXWARE_ERROR_CODES.INVALID_TAX_RATE:
				return 'The provided tax rate is invalid. Please provide a valid tax rate value.';
			case LEXWARE_ERROR_CODES.INVALID_CURRENCY:
				return 'The provided currency code is invalid. Please provide a valid ISO currency code.';
			case LEXWARE_ERROR_CODES.INVALID_LANGUAGE:
				return 'The provided language code is invalid. Please provide a valid ISO language code.';
			
			// Business Logic Errors
			case LEXWARE_ERROR_CODES.BUSINESS_RULE_VIOLATION:
				return 'The operation violates a business rule or constraint. This prevents the operation from completing.';
			case LEXWARE_ERROR_CODES.INVALID_TRANSITION:
				return 'The requested state transition is not allowed by the current workflow rules.';
			case LEXWARE_ERROR_CODES.WORKFLOW_CONSTRAINT:
				return 'The operation violates a workflow constraint. The current workflow state does not allow this operation.';
			case LEXWARE_ERROR_CODES.DUPLICATE_ENTRY:
				return 'A duplicate entry was detected. This prevents creation of duplicate records in the system.';
			case LEXWARE_ERROR_CODES.CIRCULAR_REFERENCE:
				return 'A circular reference was detected in the data structure. This prevents the operation from completing.';
			
			// Rate Limiting and Throttling
			case LEXWARE_ERROR_CODES.RATE_LIMIT_EXCEEDED:
				return 'The rate limit for API requests has been exceeded. Please wait before making additional requests.';
			case LEXWARE_ERROR_CODES.THROTTLE_LIMIT_EXCEEDED:
				return 'The throttle limit for API requests has been exceeded. Please reduce your request frequency.';
			case LEXWARE_ERROR_CODES.QUOTA_EXCEEDED:
				return 'The quota for this operation has been exceeded. Please check your usage limits.';
			
			// Server and System Errors
			case LEXWARE_ERROR_CODES.INTERNAL_SERVER_ERROR:
				return 'An internal server error occurred. This is a system-level issue that requires investigation.';
			case LEXWARE_ERROR_CODES.SERVICE_UNAVAILABLE:
				return 'The service is temporarily unavailable. This may be due to maintenance or system overload.';
			case LEXWARE_ERROR_CODES.MAINTENANCE_MODE:
				return 'The service is currently in maintenance mode and is not available for requests.';
			case LEXWARE_ERROR_CODES.SYSTEM_OVERLOAD:
				return 'The system is currently overloaded and cannot process requests. Please try again later.';
			case LEXWARE_ERROR_CODES.DATABASE_ERROR:
				return 'A database error occurred. This may be due to data corruption or system issues.';
			case LEXWARE_ERROR_CODES.EXTERNAL_SERVICE_ERROR:
				return 'An error occurred in an external service that the API depends on.';
			
			// Optimistic Locking Errors
			case LEXWARE_ERROR_CODES.VERSION_CONFLICT:
				return 'A version conflict was detected. The resource has been modified by another process since it was retrieved.';
			case LEXWARE_ERROR_CODES.CONCURRENT_MODIFICATION:
				return 'A concurrent modification was detected. Multiple processes are trying to modify the same resource.';
			case LEXWARE_ERROR_CODES.STALE_DATA:
				return 'Stale data was detected. The resource data is outdated and needs to be refreshed.';
			
			// File and Upload Errors
			case LEXWARE_ERROR_CODES.FILE_TOO_LARGE:
				return 'The file size exceeds the maximum allowed limit. Please use a smaller file.';
			case LEXWARE_ERROR_CODES.INVALID_FILE_TYPE:
				return 'The file type is not supported. Please use a supported file format.';
			case LEXWARE_ERROR_CODES.FILE_CORRUPTED:
				return 'The file appears to be corrupted and cannot be processed. Please provide a valid file.';
			case LEXWARE_ERROR_CODES.UPLOAD_FAILED:
				return 'The file upload failed. This may be due to network issues or server problems.';
			case LEXWARE_ERROR_CODES.DOWNLOAD_FAILED:
				return 'The file download failed. This may be due to network issues or server problems.';
			
			// XRechnung and E-Invoice Errors
			case LEXWARE_ERROR_CODES.XRECHNUNG_VALIDATION_FAILED:
				return 'XRechnung validation failed. The e-invoice does not comply with XRechnung standards.';
			case LEXWARE_ERROR_CODES.EINVOICE_FORMAT_ERROR:
				return 'E-Invoice format error. The invoice format is not valid according to e-invoice standards.';
			case LEXWARE_ERROR_CODES.COMPANY_DATA_INVALID:
				return 'Company data validation failed. The company information does not meet validation requirements.';
			case LEXWARE_ERROR_CODES.PRINT_SETTINGS_INVALID:
				return 'Print settings validation failed. The print configuration is not valid.';
			
			default:
				return 'An unknown error occurred. Please check the error details for more information.';
		}
	}

	/**
	 * Get suggested action for error
	 * @param errorCode - The error code to get action for
	 * @returns string - Suggested action for the user
	 */
	static getSuggestedAction(errorCode: string): string {
		switch (errorCode) {
			// Authentication errors
			case LEXWARE_ERROR_CODES.AUTHENTICATION_FAILED:
			case LEXWARE_ERROR_CODES.INVALID_API_KEY:
			case LEXWARE_ERROR_CODES.API_KEY_EXPIRED:
				return 'Check your API credentials and ensure they are valid and not expired. Generate a new API key if necessary.';
			
			case LEXWARE_ERROR_CODES.INSUFFICIENT_PERMISSIONS:
				return 'Verify that your API key has the necessary permissions for this operation. Contact your administrator if needed.';
			
			// Connection errors
			case LEXWARE_ERROR_CODES.CONNECTION_TIMEOUT:
			case LEXWARE_ERROR_CODES.CONNECTION_REFUSED:
			case LEXWARE_ERROR_CODES.NETWORK_UNREACHABLE:
				return 'Check your network connection and try again. If the problem persists, contact your network administrator.';
			
			// Resource errors
			case LEXWARE_ERROR_CODES.RESOURCE_NOT_FOUND:
				return 'Verify the resource ID or endpoint URL is correct. Check if the resource has been deleted or moved.';
			
			case LEXWARE_ERROR_CODES.RESOURCE_ALREADY_EXISTS:
				return 'Use a different identifier or check if you are trying to create a duplicate resource.';
			
			case LEXWARE_ERROR_CODES.RESOURCE_IN_USE:
			case LEXWARE_ERROR_CODES.RESOURCE_LOCKED:
				return 'Wait for the resource to become available or check if other processes are using it.';
			
			// Validation errors
			case LEXWARE_ERROR_CODES.VALIDATION_FAILED:
			case LEXWARE_ERROR_CODES.REQUIRED_FIELD_MISSING:
			case LEXWARE_ERROR_CODES.INVALID_FIELD_VALUE:
				return 'Review your input data and ensure all required fields are provided with valid values.';
			
			case LEXWARE_ERROR_CODES.FIELD_TOO_LONG:
			case LEXWARE_ERROR_CODES.FIELD_TOO_SHORT:
				return 'Adjust the field value to meet the length requirements.';
			
			case LEXWARE_ERROR_CODES.INVALID_FORMAT:
			case LEXWARE_ERROR_CODES.INVALID_DATE:
			case LEXWARE_ERROR_CODES.INVALID_EMAIL:
			case LEXWARE_ERROR_CODES.INVALID_PHONE:
			case LEXWARE_ERROR_CODES.INVALID_IBAN:
			case LEXWARE_ERROR_CODES.INVALID_BIC:
			case LEXWARE_ERROR_CODES.INVALID_TAX_RATE:
			case LEXWARE_ERROR_CODES.INVALID_CURRENCY:
			case LEXWARE_ERROR_CODES.INVALID_LANGUAGE:
				return 'Check the field format and ensure it matches the expected format requirements.';
			
			// Business logic errors
			case LEXWARE_ERROR_CODES.BUSINESS_RULE_VIOLATION:
			case LEXWARE_ERROR_CODES.INVALID_TRANSITION:
			case LEXWARE_ERROR_CODES.WORKFLOW_CONSTRAINT:
				return 'Review the business rules and workflow constraints. Ensure the operation is allowed in the current state.';
			
			case LEXWARE_ERROR_CODES.DUPLICATE_ENTRY:
				return 'Check for existing records with the same identifier and use a different value if needed.';
			
			case LEXWARE_ERROR_CODES.CIRCULAR_REFERENCE:
				return 'Review your data structure and remove any circular references that may exist.';
			
			// Rate limiting errors
			case LEXWARE_ERROR_CODES.RATE_LIMIT_EXCEEDED:
			case LEXWARE_ERROR_CODES.THROTTLE_LIMIT_EXCEEDED:
			case LEXWARE_ERROR_CODES.QUOTA_EXCEEDED:
				return 'Wait before making additional requests. Consider implementing rate limiting in your application.';
			
			// Server errors
			case LEXWARE_ERROR_CODES.INTERNAL_SERVER_ERROR:
			case LEXWARE_ERROR_CODES.DATABASE_ERROR:
			case LEXWARE_ERROR_CODES.EXTERNAL_SERVICE_ERROR:
				return 'This is a system error. Please try again later or contact support if the problem persists.';
			
			case LEXWARE_ERROR_CODES.SERVICE_UNAVAILABLE:
			case LEXWARE_ERROR_CODES.MAINTENANCE_MODE:
			case LEXWARE_ERROR_CODES.SYSTEM_OVERLOAD:
				return 'The service is temporarily unavailable. Please try again later.';
			
			// Optimistic locking errors
			case LEXWARE_ERROR_CODES.VERSION_CONFLICT:
			case LEXWARE_ERROR_CODES.CONCURRENT_MODIFICATION:
			case LEXWARE_ERROR_CODES.STALE_DATA:
				return 'Refresh the resource data and try again. The resource has been modified by another process.';
			
			// File errors
			case LEXWARE_ERROR_CODES.FILE_TOO_LARGE:
				return 'Use a smaller file or compress the file to reduce its size.';
			
			case LEXWARE_ERROR_CODES.INVALID_FILE_TYPE:
				return 'Use a supported file format. Check the API documentation for allowed file types.';
			
			case LEXWARE_ERROR_CODES.FILE_CORRUPTED:
				return 'Provide a valid, uncorrupted file. Try downloading or recreating the file.';
			
			case LEXWARE_ERROR_CODES.UPLOAD_FAILED:
			case LEXWARE_ERROR_CODES.DOWNLOAD_FAILED:
				return 'Check your network connection and try again. If the problem persists, contact support.';
			
			// XRechnung errors
			case LEXWARE_ERROR_CODES.XRECHNUNG_VALIDATION_FAILED:
			case LEXWARE_ERROR_CODES.EINVOICE_FORMAT_ERROR:
				return 'Review the e-invoice format and ensure it complies with the required standards.';
			
			case LEXWARE_ERROR_CODES.COMPANY_DATA_INVALID:
				return 'Verify your company information and ensure it meets the validation requirements.';
			
			case LEXWARE_ERROR_CODES.PRINT_SETTINGS_INVALID:
				return 'Check your print settings configuration and ensure it is valid.';
			
			default:
				return 'Review the error details and try again. If the problem persists, contact support.';
		}
	}

	/**
	 * Get documentation URL for error
	 * @param errorCode - The error code to get documentation for
	 * @returns string - Documentation URL
	 */
	static getDocumentationUrl(errorCode: string): string {
		const baseUrl = 'https://developers.lexware.io/docs/#error-codes';
		
		// Map error codes to specific documentation sections
		const errorSections: Record<string, string> = {
			[LEXWARE_ERROR_CODES.AUTHENTICATION_FAILED]: `${baseUrl}#authorization-and-connection-error-responses`,
			[LEXWARE_ERROR_CODES.INVALID_API_KEY]: `${baseUrl}#authorization-and-connection-error-responses`,
			[LEXWARE_ERROR_CODES.API_KEY_EXPIRED]: `${baseUrl}#authorization-and-connection-error-responses`,
			[LEXWARE_ERROR_CODES.RATE_LIMIT_EXCEEDED]: `${baseUrl}#api-rate-limits`,
			[LEXWARE_ERROR_CODES.VERSION_CONFLICT]: `${baseUrl}#optimistic-locking`,
			[LEXWARE_ERROR_CODES.VALIDATION_FAILED]: `${baseUrl}#regular-error-response`,
		};
		
		return errorSections[errorCode] || baseUrl;
	}

	/**
	 * Parse error response and extract useful information
	 * @param error - The error object from API response
	 * @returns ILexwareApiErrorResponse - Parsed error response
	 */
	static parseErrorResponse(error: any): ILexwareApiErrorResponse {
		const status = error.response?.status || 0;
		const data = error.response?.data || {};
		
		// Extract error information
		const errorResponse: ILexwareApiErrorResponse = {
			error: data.error || 'Unknown error',
			code: data.code || this.inferErrorCode(status, data),
			message: data.message || error.message || 'An error occurred',
			status,
			timestamp: new Date().toISOString(),
			requestId: error.response?.headers?.['x-request-id'],
			path: error.config?.url,
			method: error.config?.method?.toUpperCase(),
			details: data.details,
			fieldErrors: data.fieldErrors || this.extractFieldErrors(data),
			businessRule: data.businessRule,
			workflowState: data.workflowState,
			constraintViolation: data.constraintViolation,
			resourceType: data.resourceType,
			resourceId: data.resourceId,
			resourceVersion: data.resourceVersion,
			rateLimitRemaining: error.response?.headers?.['x-ratelimit-remaining'] ? 
				parseInt(error.response.headers['x-ratelimit-remaining']) : undefined,
			rateLimitReset: error.response?.headers?.['x-ratelimit-reset'] ? 
				parseInt(error.response.headers['x-ratelimit-reset']) : undefined,
			retryAfter: error.response?.headers?.['retry-after'] ? 
				parseInt(error.response.headers['retry-after']) : undefined,
			userMessage: this.getUserMessage(data.code || this.inferErrorCode(status, data)),
			developerMessage: this.getDeveloperMessage(data.code || this.inferErrorCode(status, data)),
			suggestedAction: this.getSuggestedAction(data.code || this.inferErrorCode(status, data)),
			category: this.getErrorCategory(data.code || this.inferErrorCode(status, data)),
			severity: this.getErrorSeverity(data.code || this.inferErrorCode(status, data)),
			retryable: this.isRetryable(data.code || this.inferErrorCode(status, data)),
			legacyCode: data.legacyCode,
			legacyMessage: data.legacyMessage,
		};
		
		return errorResponse;
	}

	/**
	 * Infer error code from HTTP status and response data
	 * @param status - HTTP status code
	 * @param data - Response data
	 * @returns string - Inferred error code
	 */
	private static inferErrorCode(status: number, data: any): string {
		switch (status) {
			case 401:
				return LEXWARE_ERROR_CODES.AUTHENTICATION_FAILED;
			case 403:
				return LEXWARE_ERROR_CODES.INSUFFICIENT_PERMISSIONS;
			case 404:
				return LEXWARE_ERROR_CODES.RESOURCE_NOT_FOUND;
			case 409:
				return LEXWARE_ERROR_CODES.RESOURCE_CONFLICT;
			case 422:
				return LEXWARE_ERROR_CODES.VALIDATION_FAILED;
			case 429:
				return LEXWARE_ERROR_CODES.RATE_LIMIT_EXCEEDED;
			case 500:
				return LEXWARE_ERROR_CODES.INTERNAL_SERVER_ERROR;
			case 503:
				return LEXWARE_ERROR_CODES.SERVICE_UNAVAILABLE;
			default:
				return LEXWARE_ERROR_CODES.UNKNOWN_ERROR;
		}
	}

	/**
	 * Extract field errors from response data
	 * @param data - Response data
	 * @returns Array of field validation errors
	 */
	private static extractFieldErrors(data: any): ILexwareErrorFieldValidation[] {
		if (!data.errors || !Array.isArray(data.errors)) {
			return [];
		}
		
		return data.errors.map((error: any) => ({
			field: error.field || 'unknown',
			code: error.code || 'VALIDATION_ERROR',
			message: error.message || 'Field validation failed',
			value: error.value,
			expected: error.expected,
			constraints: error.constraints,
			path: error.path,
		}));
	}

	/**
	 * Get user-friendly message for error
	 * @param errorCode - The error code
	 * @returns string - User-friendly message
	 */
	private static getUserMessage(errorCode: string): string {
		return LEXWARE_ERROR_CODE_MESSAGES[errorCode as keyof typeof LEXWARE_ERROR_CODE_MESSAGES] || 
			   'An error occurred while processing your request.';
	}

	/**
	 * Get developer message for error
	 * @param errorCode - The error code
	 * @returns string - Developer message
	 */
	private static getDeveloperMessage(errorCode: string): string {
		return this.getErrorDescription(errorCode);
	}

	/**
	 * Create error context for logging and debugging
	 * @param operation - The operation being performed
	 * @param resourceType - The type of resource
	 * @param resourceId - The resource ID
	 * @param userId - The user ID
	 * @param organizationId - The organization ID
	 * @returns ILexwareErrorContext - Error context information
	 */
	static createErrorContext(
		operation: string,
		resourceType: string,
		resourceId?: string,
		userId?: string,
		organizationId?: string
	): ILexwareErrorContext {
		return {
			operation,
			resourceType,
			resourceId,
			userId,
			organizationId,
			environment: process.env.NODE_ENV || 'development',
			version: '1.0.0', // This should come from package.json
			requestData: {},
			responseData: {},
		};
	}
}
