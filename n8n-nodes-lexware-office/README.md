# n8n Lexware Office Custom Node

A comprehensive n8n custom node for interacting with the Lexware Office API, featuring enhanced country management capabilities.

## Features

### Enhanced Country Management

The Countries endpoint provides comprehensive country information and filtering capabilities based on the [Lexware API documentation](https://developers.lexware.io/docs/#countries-endpoint).

#### Available Operations

- **Get All Countries**: Retrieve all available countries
- **Get Country by Code**: Get specific country information by ISO 2-letter country code
- **Filtered Country Lists**: Get countries based on various criteria

#### Country Filtering Options

1. **EU Countries Only** (`eu`): Retrieve only European Union member countries
2. **Non-EU Countries** (`non-eu`): Retrieve countries outside the European Union
3. **XRechnung Support** (`xrechnung`): Get countries supporting the German e-invoice standard
4. **Distance Sales Support** (`distanceSales`): Get countries supporting distance sales
5. **Valid Tax Rates** (`validTaxRates`): Get countries with valid tax rates for specific dates

#### Advanced Filtering

- **Tax Type Filter**: Filter by specific tax classifications (e.g., `intraCommunitySupply`, `vatfree`)
- **Date Filter**: Check tax rate validity for specific dates
- **Combined Filters**: Use multiple filters together for precise results

#### Country Properties

Each country includes:
- `code`: ISO 2-letter country code (e.g., DE, US, FR)
- `name`: Full country name
- `taxClassification`: Tax-related information including rates and validity periods
- `euMember`: Boolean indicating EU membership
- `supportsXRechnung`: Support for German e-invoice standard
- `supportsDistanceSales`: Support for distance sales
- Additional metadata like currency, language, timezone, etc.

## Installation

1. Clone this repository
2. Navigate to the custom-nodes directory
3. Install dependencies:
   ```bash
   cd n8n-nodes-lexware-office
   npm install
   ```
4. Build the node:
   ```bash
   npm run build
   ```
5. Copy the built node to your n8n custom nodes directory

## Configuration

### Credentials

Create a credential with the following fields:
- **API Key**: Your Lexware Office API key
- **Resource URL**: The Lexware API base URL (e.g., `https://api.lexware.io`)

### Node Parameters

#### Resource Selection
- Choose `Country` from the resource dropdown

#### Operation Selection
- **Get**: Retrieve a specific country by code
- **Get All**: Retrieve multiple countries with optional filtering

#### Country-Specific Fields

##### For Get Operation
- **Country Code**: ISO 2-letter country code (e.g., DE, US, FR)

##### For Get All Operation
- **Country Filter**: Choose filtering criteria
  - All Countries
  - EU Countries Only
  - Non-EU Countries
  - XRechnung Support
  - Distance Sales Support
  - Valid Tax Rates

- **Tax Type Filter**: Specific tax classification (when using Valid Tax Rates filter)
- **Date Filter**: Date for tax rate validation (when using Valid Tax Rates filter)

## Usage Examples

### Get All Countries
```json
{
  "resource": "country",
  "operation": "getAll",
  "countryFilter": "all",
  "returnAll": true
}
```

### Get EU Countries Only
```json
{
  "resource": "country",
  "operation": "getAll",
  "countryFilter": "eu",
  "returnAll": true
}
```

### Get Countries with Valid Tax Rates
```json
{
  "resource": "country",
  "operation": "getAll",
  "countryFilter": "validTaxRates",
  "returnAll": true
}
```

### Get Countries by Tax Classification
```json
{
  "resource": "country",
  "operation": "getAll",
  "countryFilter": "validTaxRates",
  "taxTypeFilter": "intraCommunitySupply",
  "returnAll": true
}
```

### Get Specific Country
```json
{
  "resource": "country",
  "operation": "get",
  "countryCode": "DE"
}
```

## API Endpoints

The node uses the following Lexware API endpoints:
- **Countries**: `/v1/countries`
- **Country by Code**: `/v1/countries/{countryCode}`

## Rate Limiting

The Lexware API has a rate limit of **2 requests per second**. The node automatically handles rate limiting and provides appropriate error messages.

## Error Handling

The node provides comprehensive error handling for:
- Invalid credentials (401)
- Resource not found (404)
- Validation errors (422)
- Rate limit exceeded (429)
- Network errors
- Unknown errors

## Validation

The node includes built-in validation for:
- Country code format (2 uppercase letters)
- Required field validation
- API response validation

## Common Country Codes

The node provides quick access to common country codes:
- **DE**: Germany
- **AT**: Austria
- **CH**: Switzerland
- **FR**: France
- **IT**: Italy
- **ES**: Spain
- **US**: United States
- **GB**: United Kingdom
- **CA**: Canada
- **AU**: Australia

## Tax Classification Support

The node supports various tax classifications including:
- `vatfree`: VAT-free transactions
- `intraCommunitySupply`: Intra-community supplies
- `constructionService13b`: Construction services (13b)
- `externalService13b`: External services (13b)
- `thirdPartyCountryService`: Third-party country services
- `thirdPartyCountryDelivery`: Third-party country deliveries

## XRechnung Support

XRechnung is the German standard for electronic invoice transmission to public authorities. The node can identify countries that support this standard.

## Distance Sales Support

Distance sales refer to cross-border sales within the EU. The node can identify countries that support distance sales operations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the [Lexware API documentation](https://developers.lexware.io/docs/)
2. Review the error messages provided by the node
3. Check the n8n logs for detailed error information

## Changelog

### Version 1.0.0
- Initial release with basic country functionality
- Support for get and getAll operations
- Basic country filtering

### Version 1.1.0
- Enhanced country filtering options
- Tax classification support
- XRechnung and distance sales support
- Improved validation and error handling
- Comprehensive documentation
