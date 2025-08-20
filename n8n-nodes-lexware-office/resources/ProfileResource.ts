import { LexwareApiClient } from '../utils/api';
import { ILexwareProfile, ILexwareCredentials } from '../types';
import { 
	LEXWARE_API_ENDPOINTS,
	LEXWARE_PROFILE_ORGANIZATION_TYPES,
	LEXWARE_PROFILE_ORGANIZATION_SIZES,
	LEXWARE_PROFILE_USER_STATUSES,
	LEXWARE_PROFILE_SUBSCRIPTION_PLAN_TYPES,
	LEXWARE_PROFILE_SUBSCRIPTION_STATUSES,
	LEXWARE_PROFILE_SUBSCRIPTION_BILLING_CYCLES,
	LEXWARE_PROFILE_SYSTEM_ENVIRONMENTS
} from '../constants';

export class ProfileResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve the complete profile information
	 * @returns Promise<ILexwareProfile> - The complete profile data
	 */
	async get(): Promise<ILexwareProfile> {
		return this.apiClient.get<ILexwareProfile>(LEXWARE_API_ENDPOINTS.PROFILE);
	}

	/**
	 * Update profile information
	 * @param profileData - The profile data to update
	 * @returns Promise<ILexwareProfile> - The updated profile data
	 */
	async update(profileData: Partial<ILexwareProfile>): Promise<ILexwareProfile> {
		return this.apiClient.put<ILexwareProfile>(LEXWARE_API_ENDPOINTS.PROFILE, profileData);
	}

	/**
	 * Get organization settings
	 * @returns Promise<any> - Organization settings
	 */
	async getSettings(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/settings`);
	}

	/**
	 * Update organization settings
	 * @param settings - The settings to update
	 * @returns Promise<any> - Updated settings
	 */
	async updateSettings(settings: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/settings`, settings);
	}

	/**
	 * Get business features and capabilities
	 * @returns Promise<any> - Business features
	 */
	async getFeatures(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/features`);
	}

	/**
	 * Get subscription information
	 * @returns Promise<any> - Subscription details
	 */
	async getSubscription(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/subscription`);
	}

	/**
	 * Get usage limits and quotas
	 * @returns Promise<any> - Usage limits
	 */
	async getLimits(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/limits`);
	}

	/**
	 * Get company information
	 * @returns Promise<any> - Company details
	 */
	async getCompany(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/company`);
	}

	/**
	 * Update company information
	 * @param companyData - The company data to update
	 * @returns Promise<any> - Updated company data
	 */
	async updateCompany(companyData: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/company`, companyData);
	}

	/**
	 * Get user information
	 * @returns Promise<any> - User details
	 */
	async getUser(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/user`);
	}

	/**
	 * Update user information
	 * @param userData - The user data to update
	 * @returns Promise<any> - Updated user data
	 */
	async updateUser(userData: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/user`, userData);
	}

	/**
	 * Get organization information
	 * @returns Promise<any> - Organization details
	 */
	async getOrganization(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/organization`);
	}

	/**
	 * Update organization information
	 * @param organizationData - The organization data to update
	 * @returns Promise<any> - Updated organization data
	 */
	async updateOrganization(organizationData: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/organization`, organizationData);
	}

	/**
	 * Get tax configuration
	 * @returns Promise<any> - Tax configuration
	 */
	async getTaxConfiguration(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/tax-configuration`);
	}

	/**
	 * Update tax configuration
	 * @param taxConfig - The tax configuration to update
	 * @returns Promise<any> - Updated tax configuration
	 */
	async updateTaxConfiguration(taxConfig: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/tax-configuration`, taxConfig);
	}

	/**
	 * Get payment configuration
	 * @returns Promise<any> - Payment configuration
	 */
	async getPaymentConfiguration(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/payment-configuration`);
	}

	/**
	 * Update payment configuration
	 * @param paymentConfig - The payment configuration to update
	 * @returns Promise<any> - Updated payment configuration
	 */
	async updatePaymentConfiguration(paymentConfig: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/payment-configuration`, paymentConfig);
	}

	/**
	 * Get document settings
	 * @returns Promise<any> - Document settings
	 */
	async getDocumentSettings(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/document-settings`);
	}

	/**
	 * Update document settings
	 * @param documentSettings - The document settings to update
	 * @returns Promise<any> - Updated document settings
	 */
	async updateDocumentSettings(documentSettings: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/document-settings`, documentSettings);
	}

	/**
	 * Get API settings
	 * @returns Promise<any> - API settings
	 */
	async getApiSettings(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/api-settings`);
	}

	/**
	 * Update API settings
	 * @param apiSettings - The API settings to update
	 * @returns Promise<any> - Updated API settings
	 */
	async updateApiSettings(apiSettings: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/api-settings`, apiSettings);
	}

	/**
	 * Get system information
	 * @returns Promise<any> - System information
	 */
	async getSystemInfo(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/system`);
	}

	/**
	 * Get usage statistics
	 * @returns Promise<any> - Usage statistics
	 */
	async getUsageStats(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/usage`);
	}

	/**
	 * Get performance metrics
	 * @returns Promise<any> - Performance metrics
	 */
	async getPerformanceMetrics(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/performance`);
	}

	/**
	 * Get compliance information
	 * @returns Promise<any> - Compliance details
	 */
	async getCompliance(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/compliance`);
	}

	/**
	 * Update compliance information
	 * @param complianceData - The compliance data to update
	 * @returns Promise<any> - Updated compliance data
	 */
	async updateCompliance(complianceData: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/compliance`, complianceData);
	}

	/**
	 * Get integration status
	 * @returns Promise<any> - Integration status
	 */
	async getIntegrations(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/integrations`);
	}

	/**
	 * Update integration configuration
	 * @param integrationName - The name of the integration
	 * @param config - The integration configuration
	 * @returns Promise<any> - Updated integration configuration
	 */
	async updateIntegration(integrationName: string, config: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/integrations/${integrationName}`, config);
	}

	/**
	 * Enable integration
	 * @param integrationName - The name of the integration
	 * @returns Promise<any> - Integration status
	 */
	async enableIntegration(integrationName: string): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/integrations/${integrationName}/enable`, {});
	}

	/**
	 * Disable integration
	 * @param integrationName - The name of the integration
	 * @returns Promise<any> - Integration status
	 */
	async disableIntegration(integrationName: string): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/integrations/${integrationName}/disable`, {});
	}

	/**
	 * Get API key information
	 * @returns Promise<any> - API key details
	 */
	async getApiKeys(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/api-keys`);
	}

	/**
	 * Create new API key
	 * @param keyData - The API key data
	 * @returns Promise<any> - Created API key
	 */
	async createApiKey(keyData: Record<string, any>): Promise<any> {
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/api-keys`, keyData);
	}

	/**
	 * Delete API key
	 * @param keyId - The API key ID
	 * @returns Promise<void> - Success status
	 */
	async deleteApiKey(keyId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.PROFILE}/api-keys/${keyId}`);
	}

	/**
	 * Get webhook configuration
	 * @returns Promise<any> - Webhook configuration
	 */
	async getWebhookConfig(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/webhook`);
	}

	/**
	 * Update webhook configuration
	 * @param webhookConfig - The webhook configuration
	 * @returns Promise<any> - Updated webhook configuration
	 */
	async updateWebhookConfig(webhookConfig: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/webhook`, webhookConfig);
	}

	/**
	 * Test webhook configuration
	 * @returns Promise<any> - Test result
	 */
	async testWebhook(): Promise<any> {
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/webhook/test`, {});
	}

	/**
	 * Get logo information
	 * @returns Promise<any> - Logo details
	 */
	async getLogo(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/logo`);
	}

	/**
	 * Upload logo
	 * @param logoFile - The logo file data
	 * @returns Promise<any> - Upload result
	 */
	async uploadLogo(logoFile: Buffer | string): Promise<any> {
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/logo`, logoFile);
	}

	/**
	 * Delete logo
	 * @returns Promise<void> - Success status
	 */
	async deleteLogo(): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.PROFILE}/logo`);
	}

	/**
	 * Get custom fields configuration
	 * @returns Promise<any> - Custom fields configuration
	 */
	async getCustomFields(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/custom-fields`);
	}

	/**
	 * Update custom fields configuration
	 * @param customFields - The custom fields configuration
	 * @returns Promise<any> - Updated custom fields configuration
	 */
	async updateCustomFields(customFields: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/custom-fields`, customFields);
	}

	/**
	 * Get workflow automation settings
	 * @returns Promise<any> - Workflow automation settings
	 */
	async getWorkflowAutomation(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/workflow-automation`);
	}

	/**
	 * Update workflow automation settings
	 * @param workflowSettings - The workflow automation settings
	 * @returns Promise<any> - Updated workflow automation settings
	 */
	async updateWorkflowAutomation(workflowSettings: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/workflow-automation`, workflowSettings);
	}

	/**
	 * Get backup configuration
	 * @returns Promise<any> - Backup configuration
	 */
	async getBackupConfig(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/backup`);
	}

	/**
	 * Update backup configuration
	 * @param backupConfig - The backup configuration
	 * @returns Promise<any> - Updated backup configuration
	 */
	async updateBackupConfig(backupConfig: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/backup`, backupConfig);
	}

	/**
	 * Trigger manual backup
	 * @returns Promise<any> - Backup status
	 */
	async triggerBackup(): Promise<any> {
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/backup/trigger`, {});
	}

	/**
	 * Get maintenance schedule
	 * @returns Promise<any> - Maintenance schedule
	 */
	async getMaintenanceSchedule(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/maintenance`);
	}

	/**
	 * Update maintenance schedule
	 * @param maintenanceSchedule - The maintenance schedule
	 * @returns Promise<any> - Updated maintenance schedule
	 */
	async updateMaintenanceSchedule(maintenanceSchedule: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/maintenance`, maintenanceSchedule);
	}

	/**
	 * Validate profile update data
	 * @param profileData - The profile data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(profileData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Email validation
		if (profileData.userEmail && !this.isValidEmail(profileData.userEmail)) {
			errors.push('Valid userEmail format is required');
		}
		
		// Company name validation
		if (profileData.company?.name && profileData.company.name.length > 200) {
			errors.push('Company name must be 200 characters or less');
		}
		
		// Legal name validation
		if (profileData.company?.legalName && profileData.company.legalName.length > 200) {
			errors.push('Legal name must be 200 characters or less');
		}
		
		// Trade name validation
		if (profileData.company?.tradeName && profileData.company.tradeName.length > 200) {
			errors.push('Trade name must be 200 characters or less');
		}
		
		// Registration number validation
		if (profileData.company?.registrationNumber && !/^[A-Z0-9\-_\/]+$/i.test(profileData.company.registrationNumber)) {
			errors.push('Registration number must contain only alphanumeric characters, hyphens, underscores, and forward slashes');
		}
		
		// Tax number validation
		if (profileData.company?.taxNumber && !/^[A-Z0-9\-_]+$/i.test(profileData.company.taxNumber)) {
			errors.push('Tax number must contain only alphanumeric characters, hyphens, and underscores');
		}
		
		// VAT number validation (EU format)
		if (profileData.company?.vatNumber && !/^[A-Z]{2}[A-Z0-9]+$/i.test(profileData.company.vatNumber)) {
			errors.push('VAT number must be in valid EU format (2 letters followed by alphanumeric characters)');
		}
		
		// Phone validation
		if (profileData.company?.contact?.phone && !this.isValidPhone(profileData.company.contact.phone)) {
			errors.push('Valid phone number format is required');
		}
		
		// Website validation
		if (profileData.company?.contact?.website && !this.isValidUrl(profileData.company.contact.website)) {
			errors.push('Valid website URL format is required');
		}
		
		// IBAN validation
		if (profileData.company?.banking?.iban && !this.isValidIBAN(profileData.company.banking.iban)) {
			errors.push('Valid IBAN format is required');
		}
		
		// BIC validation
		if (profileData.company?.banking?.bic && !this.isValidBIC(profileData.company.banking.bic)) {
			errors.push('Valid BIC format is required');
		}
		
		// User name validation
		if (profileData.user?.firstName && profileData.user.firstName.length > 100) {
			errors.push('First name must be 100 characters or less');
		}
		
		if (profileData.user?.lastName && profileData.user.lastName.length > 100) {
			errors.push('Last name must be 100 characters or less');
		}
		
		// Organization name validation
		if (profileData.organization?.name && profileData.organization.name.length > 200) {
			errors.push('Organization name must be 200 characters or less');
		}
		
		// Industry validation
		if (profileData.organization?.industry && profileData.organization.industry.length > 100) {
			errors.push('Industry must be 100 characters or less');
		}
		
		// Founding date validation
		if (profileData.organization?.foundingDate && !this.isValidDate(profileData.organization.foundingDate)) {
			errors.push('Valid founding date format is required (YYYY-MM-DD)');
		}
		
		// Timezone validation
		if (profileData.organization?.timezone && !this.isValidTimezone(profileData.organization.timezone)) {
			errors.push('Valid timezone format is required');
		}
		
		// Language validation
		if (profileData.organization?.language && !this.isValidLanguage(profileData.organization.language)) {
			errors.push('Valid language code is required (e.g., de, en, fr)');
		}
		
		// Currency validation
		if (profileData.organization?.currency && !this.isValidCurrency(profileData.organization.currency)) {
			errors.push('Valid currency code is required (e.g., EUR, USD, CHF)');
		}
		
		// Tax rate validation
		if (profileData.taxConfiguration?.defaultTaxRate && (isNaN(profileData.taxConfiguration.defaultTaxRate) || profileData.taxConfiguration.defaultTaxRate < 0 || profileData.taxConfiguration.defaultTaxRate > 100)) {
			errors.push('Default tax rate must be between 0 and 100');
		}
		
		// Small business threshold validation
		if (profileData.taxConfiguration?.smallBusinessThreshold && (isNaN(profileData.taxConfiguration.smallBusinessThreshold) || profileData.taxConfiguration.smallBusinessThreshold < 0)) {
			errors.push('Small business threshold must be a positive number');
		}
		
		// Subscription amount validation
		if (profileData.subscription?.amount && (isNaN(profileData.subscription.amount) || profileData.subscription.amount < 0)) {
			errors.push('Subscription amount must be a positive number');
		}
		
		// System version validation
		if (profileData.system?.version && !this.isValidVersion(profileData.system.version)) {
			errors.push('Valid version format is required (e.g., 1.0.0)');
		}
		
		// Performance metrics validation
		if (profileData.system?.performance?.responseTime && (isNaN(profileData.system.performance.responseTime) || profileData.system.performance.responseTime < 0)) {
			errors.push('Response time must be a positive number');
		}
		
		if (profileData.system?.performance?.throughput && (isNaN(profileData.system.performance.throughput) || profileData.system.performance.throughput < 0)) {
			errors.push('Throughput must be a positive number');
		}
		
		if (profileData.system?.performance?.errorRate && (isNaN(profileData.system.performance.errorRate) || profileData.system.performance.errorRate < 0 || profileData.system.performance.errorRate > 100)) {
			errors.push('Error rate must be between 0 and 100');
		}
		
		return errors;
	}

	/**
	 * Validate profile creation data
	 * @param profileData - The profile data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateCreateData(profileData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Required fields validation
		if (!profileData.userEmail || !this.isValidEmail(profileData.userEmail)) {
			errors.push('Valid userEmail is required');
		}
		
		if (!profileData.company?.name || profileData.company.name.trim() === '') {
			errors.push('Company name is required');
		}
		
		if (!profileData.organization?.name || profileData.organization.name.trim() === '') {
			errors.push('Organization name is required');
		}
		
		// Additional validation from update method
		const updateErrors = this.validateUpdateData(profileData);
		errors.push(...updateErrors);
		
		return errors;
	}

	/**
	 * Validate email format
	 * @param email - The email to validate
	 * @returns boolean - True if valid
	 */
	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	/**
	 * Validate phone number format
	 * @param phone - The phone number to validate
	 * @returns boolean - True if valid
	 */
	private isValidPhone(phone: string): boolean {
		const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
		return phoneRegex.test(phone);
	}

	/**
	 * Validate URL format
	 * @param url - The URL to validate
	 * @returns boolean - True if valid
	 */
	private isValidUrl(url: string): boolean {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Validate IBAN format
	 * @param iban - The IBAN to validate
	 * @returns boolean - True if valid
	 */
	private isValidIBAN(iban: string): boolean {
		const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
		return ibanRegex.test(iban.replace(/\s/g, '').toUpperCase());
	}

	/**
	 * Validate BIC format
	 * @param bic - The BIC to validate
	 * @returns boolean - True if valid
	 */
	private isValidBIC(bic: string): boolean {
		const bicRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
		return bicRegex.test(bic.toUpperCase());
	}

	/**
	 * Validate date format
	 * @param date - The date to validate
	 * @returns boolean - True if valid
	 */
	private isValidDate(date: string): boolean {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(date)) return false;
		
		const dateObj = new Date(date);
		return dateObj instanceof Date && !isNaN(dateObj.getTime());
	}

	/**
	 * Validate timezone format
	 * @param timezone - The timezone to validate
	 * @returns boolean - True if valid
	 */
	private isValidTimezone(timezone: string): boolean {
		const validTimezones = [
			'UTC', 'Europe/Berlin', 'Europe/London', 'America/New_York', 'Asia/Tokyo',
			'Europe/Paris', 'Europe/Rome', 'Europe/Madrid', 'Europe/Amsterdam', 'Europe/Vienna'
		];
		return validTimezones.includes(timezone);
	}

	/**
	 * Validate language code
	 * @param language - The language to validate
	 * @returns boolean - True if valid
	 */
	private isValidLanguage(language: string): boolean {
		const validLanguages = ['de', 'en', 'fr', 'it', 'es', 'nl', 'pl', 'cs', 'hu', 'ro'];
		return validLanguages.includes(language.toLowerCase());
	}

	/**
	 * Validate currency code
	 * @param currency - The currency to validate
	 * @returns boolean - True if valid
	 */
	private isValidCurrency(currency: string): boolean {
		const validCurrencies = ['EUR', 'USD', 'CHF', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY'];
		return validCurrencies.includes(currency.toUpperCase());
	}

	/**
	 * Validate version format
	 * @param version - The version to validate
	 * @returns boolean - True if valid
	 */
	private isValidVersion(version: string): boolean {
		const versionRegex = /^\d+\.\d+\.\d+$/;
		return versionRegex.test(version);
	}
}
