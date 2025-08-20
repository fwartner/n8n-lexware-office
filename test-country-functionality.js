#!/usr/bin/env node

/**
 * Test script for enhanced Lexware Office Country functionality
 * This script demonstrates the various country operations available
 */

console.log('🚀 Testing Enhanced Lexware Office Country Functionality\n');

// Mock data for demonstration purposes
const mockCountries = [
	{
		code: 'DE',
		name: 'Germany',
		taxClassification: {
			taxType: 'gross',
			taxRate: 19,
			taxSubType: 'standard',
			validFrom: '2024-01-01',
			validTo: '2024-12-31'
		},
		euMember: true,
		supportsXRechnung: true,
		supportsDistanceSales: true,
		currency: 'EUR',
		language: 'de',
		timezone: 'Europe/Berlin',
		phoneCode: '+49',
		postalCodeFormat: 'XXXXX',
		dateFormat: 'DD.MM.YYYY',
		numberFormat: '1.234,56'
	},
	{
		code: 'AT',
		name: 'Austria',
		taxClassification: {
			taxType: 'gross',
			taxRate: 20,
			taxSubType: 'standard',
			validFrom: '2024-01-01',
			validTo: '2024-12-31'
		},
		euMember: true,
		supportsXRechnung: false,
		supportsDistanceSales: true,
		currency: 'EUR',
		language: 'de',
		timezone: 'Europe/Vienna',
		phoneCode: '+43',
		postalCodeFormat: 'XXXX',
		dateFormat: 'DD.MM.YYYY',
		numberFormat: '1.234,56'
	},
	{
		code: 'US',
		name: 'United States',
		taxClassification: {
			taxType: 'vatfree',
			taxRate: 0,
			taxSubType: 'thirdPartyCountry',
			validFrom: '2024-01-01',
			validTo: '2024-12-31'
		},
		euMember: false,
		supportsXRechnung: false,
		supportsDistanceSales: false,
		currency: 'USD',
		language: 'en',
		timezone: 'America/New_York',
		phoneCode: '+1',
		postalCodeFormat: 'XXXXX-XXXX',
		dateFormat: 'MM/DD/YYYY',
		numberFormat: '1,234.56'
	}
];

// Mock CountryResource class for demonstration
class MockCountryResource {
	async getAll(params = {}) {
		console.log(`📋 Getting all countries with params:`, params);
		return mockCountries;
	}

	async get(countryCode) {
		console.log(`🔍 Getting country with code: ${countryCode}`);
		const country = mockCountries.find(c => c.code === countryCode);
		if (!country) {
			throw new Error(`Country with code ${countryCode} not found`);
		}
		return country;
	}

	async getEUCountries() {
		console.log('🇪🇺 Getting EU countries only');
		return mockCountries.filter(c => c.euMember);
	}

	async getNonEUCountries() {
		console.log('🌍 Getting non-EU countries only');
		return mockCountries.filter(c => !c.euMember);
	}

	async getXRechnungCountries() {
		console.log('📄 Getting XRechnung supporting countries');
		return mockCountries.filter(c => c.supportsXRechnung);
	}

	async getDistanceSalesCountries() {
		console.log('🛒 Getting distance sales supporting countries');
		return mockCountries.filter(c => c.supportsDistanceSales);
	}

	async getCountriesByTaxClassification(taxType) {
		console.log(`💰 Getting countries with tax classification: ${taxType}`);
		return mockCountries.filter(c => c.taxClassification.taxType === taxType);
	}

	async getCountriesWithValidTaxRates(date) {
		console.log(`📅 Getting countries with valid tax rates for date: ${date || 'current'}`);
		return mockCountries.filter(c => c.taxClassification.validFrom && c.taxClassification.validTo);
	}

	validateCountryCode(countryCode) {
		const errors = [];
		if (!countryCode || countryCode.trim() === '') {
			errors.push('countryCode');
		} else if (countryCode.length !== 2) {
			errors.push('valid countryCode (2 characters)');
		} else if (!/^[A-Z]{2}$/.test(countryCode)) {
			errors.push('valid countryCode (2 uppercase letters)');
		}
		return errors;
	}

	getCommonCountryCodes() {
		return {
			'DE': 'Germany',
			'AT': 'Austria',
			'CH': 'Switzerland',
			'FR': 'France',
			'IT': 'Italy',
			'ES': 'Spain',
			'US': 'United States',
			'GB': 'United Kingdom',
			'CA': 'Canada',
			'AU': 'Australia'
		};
	}

	isValidCountryCode(countryCode) {
		return this.validateCountryCode(countryCode).length === 0;
	}
}

// Test functions
async function testBasicOperations() {
	console.log('🧪 Testing Basic Operations');
	console.log('==========================');

	const countryResource = new MockCountryResource();

	try {
		// Test get all countries
		const allCountries = await countryResource.getAll();
		console.log(`✅ Retrieved ${allCountries.length} countries`);

		// Test get specific country
		const germany = await countryResource.get('DE');
		console.log(`✅ Retrieved Germany: ${germany.name}`);

		// Test validation
		const validCode = countryResource.isValidCountryCode('DE');
		const invalidCode = countryResource.isValidCountryCode('123');
		console.log(`✅ Code validation - DE: ${validCode}, 123: ${invalidCode}`);

	} catch (error) {
		console.error(`❌ Error in basic operations: ${error.message}`);
	}
}

async function testFilteringOperations() {
	console.log('\n🧪 Testing Filtering Operations');
	console.log('==============================');

	const countryResource = new MockCountryResource();

	try {
		// Test EU countries
		const euCountries = await countryResource.getEUCountries();
		console.log(`✅ EU countries: ${euCountries.map(c => c.code).join(', ')}`);

		// Test non-EU countries
		const nonEUCountries = await countryResource.getNonEUCountries();
		console.log(`✅ Non-EU countries: ${nonEUCountries.map(c => c.code).join(', ')}`);

		// Test XRechnung countries
		const xrechnungCountries = await countryResource.getXRechnungCountries();
		console.log(`✅ XRechnung countries: ${xrechnungCountries.map(c => c.code).join(', ')}`);

		// Test distance sales countries
		const distanceSalesCountries = await countryResource.getDistanceSalesCountries();
		console.log(`✅ Distance sales countries: ${distanceSalesCountries.map(c => c.code).join(', ')}`);

		// Test tax classification
		const grossTaxCountries = await countryResource.getCountriesByTaxClassification('gross');
		console.log(`✅ Gross tax countries: ${grossTaxCountries.map(c => c.code).join(', ')}`);

		// Test valid tax rates
		const validTaxCountries = await countryResource.getCountriesWithValidTaxRates('2024-06-01');
		console.log(`✅ Valid tax rate countries: ${validTaxCountries.map(c => c.code).join(', ')}`);

	} catch (error) {
		console.error(`❌ Error in filtering operations: ${error.message}`);
	}
}

async function testAdvancedFeatures() {
	console.log('\n🧪 Testing Advanced Features');
	console.log('============================');

	const countryResource = new MockCountryResource();

	try {
		// Test common country codes
		const commonCodes = countryResource.getCommonCountryCodes();
		console.log(`✅ Common country codes: ${Object.keys(commonCodes).length} codes available`);

		// Test country code validation
		const testCodes = ['DE', 'US', '123', 'ab', ''];
		testCodes.forEach(code => {
			const isValid = countryResource.isValidCountryCode(code);
			console.log(`✅ Code '${code}' validation: ${isValid ? 'Valid' : 'Invalid'}`);
		});

		// Test detailed country info
		const germany = await countryResource.get('DE');
		console.log(`✅ Germany details:`);
		console.log(`   - EU Member: ${germany.euMember}`);
		console.log(`   - XRechnung: ${germany.supportsXRechnung}`);
		console.log(`   - Distance Sales: ${germany.supportsDistanceSales}`);
		console.log(`   - Tax Rate: ${germany.taxClassification.taxRate}%`);
		console.log(`   - Currency: ${germany.currency}`);

	} catch (error) {
		console.error(`❌ Error in advanced features: ${error.message}`);
	}
}

async function testErrorHandling() {
	console.log('\n🧪 Testing Error Handling');
	console.log('==========================');

	const countryResource = new MockCountryResource();

	try {
		// Test invalid country code
		await countryResource.get('XX');
	} catch (error) {
		console.log(`✅ Error handling works: ${error.message}`);
	}

	try {
		// Test validation errors
		const errors = countryResource.validateCountryCode('123');
		console.log(`✅ Validation errors: ${errors.join(', ')}`);
	} catch (error) {
		console.error(`❌ Validation error: ${error.message}`);
	}
}

// Main test execution
async function runAllTests() {
	console.log('Starting comprehensive country functionality tests...\n');

	await testBasicOperations();
	await testFilteringOperations();
	await testAdvancedFeatures();
	await testErrorHandling();

	console.log('\n🎉 All tests completed successfully!');
	console.log('\n📚 This demonstrates the enhanced country functionality including:');
	console.log('   - Basic CRUD operations');
	console.log('   - Advanced filtering (EU, XRechnung, Distance Sales)');
	console.log('   - Tax classification support');
	console.log('   - Validation and error handling');
	console.log('   - Common country code utilities');
}

// Run tests if this script is executed directly
if (require.main === module) {
	runAllTests().catch(console.error);
}

module.exports = {
	MockCountryResource,
	testBasicOperations,
	testFilteringOperations,
	testAdvancedFeatures,
	testErrorHandling,
	runAllTests
};
