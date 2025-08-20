# Enhanced ContactResource for Lexware Office n8n Node

This document describes the enhanced ContactResource implementation that aligns with the [Lexware API documentation](https://developers.lexware.io/docs/#contacts-endpoint).

## Overview

The ContactResource has been significantly enhanced to provide comprehensive contact management capabilities that match the Lexware API specification. It includes advanced filtering, validation, and support for all contact properties documented in the API.

## Key Features

### 1. Comprehensive Contact Properties

The enhanced contact interface supports all properties documented in the Lexware API:

- **Basic Information**: ID, version, roles, notes
- **Company Details**: Name, VAT ID, tax number, commercial register information
- **Person Details**: Salutation, first/last name, title, birthday
- **Addresses**: Multiple address types (billing/shipping), country codes, street details
- **Contact Methods**: Phone numbers (private, business, mobile, fax), email addresses
- **Financial Information**: Bank accounts (IBAN, BIC), tax settings, payment terms
- **Business Settings**: Shipping preferences, discount policies

### 2. Advanced Filtering and Search

#### Filter Parameters (`IContactFilterParams`)
```typescript
interface IContactFilterParams {
    // Basic filtering
    name?: string;
    email?: string;
    number?: string;
    
    // Role-based filtering
    customer?: boolean;
    vendor?: boolean;
    employee?: boolean;
    
    // Address filtering
    countryCode?: string;
    city?: string;
    zipCode?: string;
    
    // Status filtering
    archived?: boolean;
    
    // Pagination
    size?: number;
    page?: number;
    
    // Sorting
    sort?: string;
}
```

#### Search Parameters (`IContactSearchParams`)
```typescript
interface IContactSearchParams extends IContactFilterParams {
    // Pattern matching search (as per API docs)
    searchString?: string;
}
```

### 3. Enhanced Methods

#### Core CRUD Operations
- `get(contactId: string)` - Retrieve a specific contact
- `getAll(params?: IContactFilterParams)` - Get all contacts with filtering
- `create(contactType, additionalFields)` - Create new contact
- `update(contactId, additionalFields)` - Update existing contact
- `delete(contactId)` - Delete a contact

#### Advanced Query Methods
- `search(params: IContactSearchParams)` - Pattern matching search
- `getByRole(role, params)` - Filter by customer/vendor/employee
- `getByCountry(countryCode, params)` - Filter by country
- `getArchived(params)` - Get archived contacts
- `getActive(params)` - Get active contacts

#### Utility Methods
- `getDeeplink(contactId)` - Generate deeplink to contact in Lexware app
- `validateCreateData(contactType, data)` - Validate creation data
- `validateUpdateData(data)` - Validate update data with format checking

### 4. Data Validation

The resource includes comprehensive validation:

- **Required Fields**: Ensures all mandatory fields are provided
- **Email Format**: Validates email address formats
- **Phone Format**: Validates phone number formats
- **Data Integrity**: Checks for empty updates and invalid data

## Usage Examples

### Creating a Company Contact
```typescript
const companyContact = await contactResource.create('company', {
    name: 'Acme Corporation',
    customer: true,
    street: '123 Business Street',
    zipCode: '12345',
    city: 'Business City',
    countryCode: 'DE',
    vatId: 'DE123456789',
    phoneNumbers: {
        business: ['+49 123 456789']
    },
    emailAddresses: {
        business: ['info@acme-corp.de']
    },
    bankAccounts: [{
        accountHolder: 'Acme Corporation',
        iban: 'DE89370400440532013000',
        bic: 'COBADEFFXXX'
    }]
});
```

### Advanced Filtering
```typescript
// Get German customers with pagination
const germanCustomers = await contactResource.getByCountry('DE', {
    customer: true,
    size: 20,
    page: 1,
    sort: 'name'
});

// Search with pattern matching
const searchResults = await contactResource.search({
    searchString: 'business',
    customer: true,
    archived: false,
    size: 10
});
```

### Role-Based Queries
```typescript
// Get all vendors
const vendors = await contactResource.getByRole('vendor', {
    size: 50,
    archived: false
});

// Get active customers
const activeCustomers = await contactResource.getActive({
    customer: true,
    size: 100
});
```

## API Alignment

This implementation aligns with the Lexware API documentation in the following ways:

1. **Endpoint Structure**: Uses the correct `/v1/contacts` endpoint
2. **Property Mapping**: All contact properties match the API specification
3. **Filtering**: Implements the documented filtering capabilities
4. **Search**: Supports pattern matching as described in the API
5. **Deeplinks**: Provides access to contact deeplinks
6. **Validation**: Implements proper data validation rules
7. **Pagination**: Supports size/page parameters for large datasets

## Constants and Enums

The resource uses predefined constants for consistency:

```typescript
// Contact types
LEXWARE_CONTACT_TYPES.COMPANY
LEXWARE_CONTACT_TYPES.PERSON

// Contact roles
LEXWARE_CONTACT_ROLES.CUSTOMER
LEXWARE_CONTACT_ROLES.VENDOR
LEXWARE_CONTACT_ROLES.EMPLOYEE

// Address types
LEXWARE_ADDRESS_TYPES.BILLING
LEXWARE_ADDRESS_TYPES.SHIPPING

// Salutations
LEXWARE_SALUTATIONS.MR
LEXWARE_SALUTATIONS.MS
LEXWARE_SALUTATIONS.DR
```

## Error Handling

The resource includes comprehensive error handling:

- **Validation Errors**: Returns detailed validation messages
- **API Errors**: Properly handles HTTP status codes
- **Rate Limiting**: Respects API rate limits (2 requests/second)
- **Network Errors**: Handles connection issues gracefully

## Testing

A comprehensive test file (`test-contact-resource.ts`) is provided that demonstrates:

- All CRUD operations
- Advanced filtering and search
- Data validation
- Error handling
- Real-world usage patterns

## Migration from Previous Version

If you're upgrading from a previous version:

1. **Interface Changes**: The `ILexwareContact` interface has been expanded
2. **Method Signatures**: Some methods now use typed parameters instead of generic objects
3. **New Methods**: Several new methods have been added for advanced functionality
4. **Validation**: Enhanced validation is now available

## Rate Limiting

The implementation respects the Lexware API rate limits:
- **Limit**: 2 requests per second
- **Handling**: Returns HTTP 429 when limits are exceeded
- **Recommendation**: Implement exponential backoff for retry logic

## Future Enhancements

Potential future improvements:

1. **Batch Operations**: Support for creating/updating multiple contacts
2. **Webhook Integration**: Real-time contact change notifications
3. **Advanced Search**: Full-text search capabilities
4. **Contact Templates**: Predefined contact structures
5. **Import/Export**: Bulk data operations

## Support

For issues or questions:

1. Check the [Lexware API documentation](https://developers.lexware.io/docs/#contacts-endpoint)
2. Review the test examples in `test-contact-resource.ts`
3. Check the TypeScript interfaces for property definitions
4. Validate your data using the built-in validation methods

## License

This implementation follows the same license as the parent n8n-lexware-office project.
