# Lexware Office n8n Node

A comprehensive n8n node for interacting with the Lexware Office API, providing seamless integration for business automation workflows.

## Features

- **Full API Coverage**: Support for all major Lexware Office resources
- **Enhanced Delivery Notes**: Comprehensive delivery note management with advanced features
- **Type Safety**: Full TypeScript support with comprehensive interfaces
- **Error Handling**: Robust error handling and validation
- **Rate Limiting**: Built-in rate limiting compliance (2 requests/second)
- **Modern Architecture**: Clean, maintainable codebase with proper separation of concerns

## Enhanced Delivery Notes Functionality

The delivery notes endpoint has been significantly enhanced based on the [official Lexware API documentation](https://developers.lexware.io/docs/#delivery-notes-endpoint) to provide comprehensive delivery note management capabilities.

### Available Operations

#### 1. **Create Delivery Note**
- Create new delivery notes with full customization
- Support for line items, delivery conditions, and payment terms
- Automatic validation of required fields

#### 2. **Get Delivery Note**
- Retrieve delivery notes by ID
- Full delivery note details including status and metadata

#### 3. **Get All Delivery Notes**
- List all delivery notes with filtering and pagination
- Support for voucher list endpoint integration

#### 4. **Update Delivery Note**
- Modify existing delivery notes
- Support for partial updates with field validation

#### 5. **Pursue Delivery Note**
- Change status from "draft" to "open"
- Only available for delivery notes with "draft" status
- Includes validation to ensure proper state transitions

#### 6. **Render Document (PDF)**
- Generate PDF documents for delivery notes
- Only available for delivery notes with "open" status
- Support for custom print layouts and languages

#### 7. **Download File**
- Download delivery note files
- Support for different formats and print layouts

#### 8. **Get Deeplink**
- Generate direct links to delivery notes in the Lexware application
- Useful for integration with other systems

### Delivery Note Properties

#### Core Properties
- `id`: Unique identifier
- `voucherDate`: Date of the delivery note
- `contactId`: Associated contact ID
- `deliveryNoteStatus`: Current status (draft/open/delivered)
- `deliveryDate`: Scheduled delivery date
- `language`: Document language (de/en)
- `currency`: Currency code (default: EUR)

#### Delivery Conditions
- `deliveryType`: Type of delivery (standard/express/pickup/courier/postal)
- `shippingDate`: Date when shipping occurs
- `deliveryAddress`: Custom delivery address with full address details

#### Payment Terms
- `paymentTermsId`: Payment terms identifier
- `paymentTermsLabel`: Human-readable payment terms
- `discountPercentage`: Discount percentage
- `discountType`: Discount type (percentage/amount)

#### Line Items
- `type`: Item type (service/material/custom/text)
- `name`: Item name
- `quantity`: Quantity
- `unitName`: Unit of measurement
- `unitPrice`: Pricing information with tax rates

#### Related Data
- `relatedVouchers`: Associated vouchers
- `printLayoutId`: Print layout identifier
- `archived`: Archive status
- `createdDate`/`updatedDate`: Timestamps

### Status Management

#### Draft Status
- **Purpose**: Initial creation and editing
- **Capabilities**: Full editing, line item management
- **Limitations**: Cannot be pursued, no PDF rendering
- **Transitions**: Can be updated, can be pursued to "open"

#### Open Status
- **Purpose**: Active delivery notes
- **Capabilities**: PDF rendering, file download, delivery tracking
- **Limitations**: Limited editing capabilities
- **Transitions**: Can be marked as "delivered"

#### Delivered Status
- **Purpose**: Completed deliveries
- **Capabilities**: Read-only access, historical records
- **Limitations**: No further modifications
- **Transitions**: Final state

### Validation Rules

#### Creation Validation
- `voucherDate`: Required
- `contactId`: Required
- `lineItems`: At least one item required

#### Pursue Validation
- Status must be "draft"
- Contact ID must be present
- Line items must exist

#### Render Validation
- Status must be "open"
- Document must be properly configured

### API Endpoints

The delivery notes implementation uses the following Lexware API endpoints:

- **Base**: `/v1/delivery-notes`
- **Create**: `POST /v1/delivery-notes`
- **Get**: `GET /v1/delivery-notes/{id}`
- **Update**: `PUT /v1/delivery-notes/{id}`
- **Delete**: `DELETE /v1/delivery-notes/{id}`
- **Pursue**: `PUT /v1/delivery-notes/{id}/pursue`
- **Document**: `GET /v1/delivery-notes/{id}/document`
- **File**: `GET /v1/delivery-notes/{id}/file`
- **Deeplink**: `GET /v1/delivery-notes/{id}/deeplink`

### Usage Examples

#### Create a Delivery Note
```typescript
const deliveryNote = await deliveryNoteResource.create({
  voucherDate: '2024-01-15',
  contactId: 'contact-123',
  deliveryNoteStatus: 'draft',
  deliveryDate: '2024-01-22',
  language: 'en',
  currency: 'EUR',
  lineItems: [{
    type: 'service',
    name: 'Consulting Service',
    quantity: 1,
    unitName: 'hour',
    unitPrice: {
      currency: 'EUR',
      netAmount: 100.00,
      taxRatePercentage: 19
    }
  }]
});
```

#### Pursue a Delivery Note
```typescript
const pursuedNote = await deliveryNoteResource.pursue('delivery-note-123');
```

#### Render PDF Document
```typescript
const pdfDocument = await deliveryNoteResource.renderDocument('delivery-note-123', {
  printLayoutId: 'layout-456',
  language: 'en'
});
```

### Error Handling

The implementation includes comprehensive error handling:

- **Validation Errors**: Clear messages for missing or invalid fields
- **Status Errors**: Proper handling of invalid status transitions
- **API Errors**: Graceful handling of Lexware API errors
- **Rate Limiting**: Compliance with 2 requests/second limit

### Testing

A comprehensive test workflow is included (`comprehensive-test-workflow.json`) that demonstrates:

1. Creating delivery notes
2. Retrieving and updating notes
3. Pursuing delivery notes
4. Rendering PDF documents
5. Getting deeplinks
6. Error handling and validation

## Dunnings Functionality

The dunnings endpoint provides comprehensive dunning management capabilities based on the [official Lexware API documentation](https://developers.lexware.io/docs/#dunnings-endpoint).

### Available Operations

#### 1. **Create Dunning**
- Create new dunnings with full customization
- Support for line items, dunning levels, and status management
- Automatic validation of required fields (voucherDate, contactId, precedingSalesVoucherId, dunningLevel)

#### 2. **Get Dunning**
- Retrieve dunnings by ID
- Full dunning details including status and metadata

#### 3. **Get All Dunnings**
- List all dunnings with filtering and pagination
- Support for voucher list endpoint integration

#### 4. **Update Dunning**
- Modify existing dunnings
- Support for partial updates with field validation

#### 5. **Finalize Dunning**
- Change status from "draft" to "open"
- Only available for dunnings with "draft" status
- Includes validation to ensure proper state transitions

#### 6. **Render Document (PDF)**
- Generate PDF documents for dunnings
- Available for dunnings with "open" status
- Support for custom print layouts and languages

#### 7. **Download File**
- Download dunning files
- Support for different formats and print layouts

#### 8. **Get Deeplink**
- Generate direct links to dunnings in the Lexware application
- Useful for integration with other systems

### Dunning Properties

#### Core Properties
- `id`: Unique identifier
- `voucherDate`: Date of the dunning
- `contactId`: Associated contact ID
- `precedingSalesVoucherId`: ID of the preceding sales voucher
- `dunningLevel`: Dunning level (1-5)
- `dunningStatus`: Current status (draft/open/paid/voided)
- `currency`: Currency code (default: EUR)

#### Dunning-Specific Properties
- `dunningLevel`: Escalation level (1-5, where 1 is first reminder)
- `precedingSalesVoucherId`: Reference to the original invoice/credit note
- `dunningStatus`: Status management for workflow control

#### Line Items
- `type`: Item type (service/material/custom/text)
- `name`: Item name (e.g., "Dunning Fee")
- `quantity`: Quantity
- `unitName`: Unit of measurement
- `unitPrice`: Pricing information with tax rates

#### Related Data
- `relatedVouchers`: Associated vouchers
- `printLayoutId`: Print layout identifier
- `archived`: Archive status
- `createdDate`/`updatedDate`: Timestamps

### Status Management

#### Draft Status
- **Purpose**: Initial creation and editing
- **Capabilities**: Full editing, line item management
- **Limitations**: Cannot be finalized, no PDF rendering
- **Transitions**: Can be updated, can be finalized to "open"

#### Open Status
- **Purpose**: Active dunnings
- **Capabilities**: PDF rendering, file download, payment tracking
- **Limitations**: Limited editing capabilities
- **Transitions**: Can be marked as "paid" or "voided"

#### Paid Status
- **Purpose**: Completed dunnings
- **Capabilities**: Read-only access, reporting
- **Limitations**: No further modifications
- **Transitions**: Final state

#### Voided Status
- **Purpose**: Cancelled dunnings
- **Capabilities**: Read-only access, audit trail
- **Limitations**: No further modifications
- **Transitions**: Final state

### Dunning Level Management

#### Level 1 (First Reminder)
- **Purpose**: Initial payment reminder
- **Timing**: Typically sent 7-14 days after due date
- **Content**: Polite reminder with payment details

#### Level 2 (Second Reminder)
- **Purpose**: Escalated payment reminder
- **Timing**: Typically sent 14-21 days after due date
- **Content**: More urgent tone, late payment fees

#### Level 3 (Final Notice)
- **Purpose**: Final payment demand
- **Timing**: Typically sent 21-30 days after due date
- **Content**: Serious tone, legal implications

#### Level 4 (Legal Notice)
- **Purpose**: Pre-legal action notice
- **Timing**: Typically sent 30-45 days after due date
- **Content**: Legal language, collection agency notice

#### Level 5 (Collection)
- **Purpose**: Final collection attempt
- **Timing**: Typically sent 45+ days after due date
- **Content**: Collection agency involvement

### Testing Dunnings

A dedicated test workflow is included (`dunning-test-workflow.json`) that demonstrates:

1. Creating dunnings with required fields
2. Retrieving and updating dunning details
3. Finalizing dunnings (draft to open)
4. Rendering PDF documents
5. Downloading dunning files
6. Getting all dunnings with pagination
7. Error handling and validation

## Installation

1. Install the node in your n8n instance
2. Configure Lexware Office API credentials
3. Import the test workflow to verify functionality

## Configuration

### Required Credentials
- **API Key**: Your Lexware Office API key
- **Resource URL**: Lexware API base URL (https://api.lexware.io)

### Environment Variables
- `LEXWARE_API_KEY`: Your API key
- `LEXWARE_RESOURCE_URL`: API base URL

## Rate Limiting

The node automatically complies with Lexware's rate limiting:
- **Limit**: 2 requests per second
- **Handling**: Automatic retry with exponential backoff
- **Monitoring**: Built-in rate limit detection

## Support

For issues and questions:
- Check the [Lexware API documentation](https://developers.lexware.io/docs/)
- Review the test workflow examples
- Check the node's error logs for detailed information

## Changelog

### Latest Updates
- Enhanced delivery notes with full API coverage
- Added pursue functionality for status management
- Improved PDF rendering and file download support
- Enhanced validation and error handling
- Added comprehensive test workflow

### Previous Versions
- Initial release with basic functionality
- Core resource management
- Basic CRUD operations

## License

This project is licensed under the MIT License - see the LICENSE file for details.
