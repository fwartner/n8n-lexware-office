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

## Enhanced Invoice Endpoints

The Invoice endpoints have been significantly enhanced based on the [official Lexware API documentation](https://developers.lexware.io/docs/#invoices-endpoint) to provide comprehensive invoice management capabilities:

### **Advanced Invoice Management**
- **Comprehensive Status Support**: Full lifecycle management from draft to paid/voided with overdue and partially paid statuses
- **Smart Filtering**: Filter by status, contact, date ranges, due dates, amounts, and business criteria
- **Search Capabilities**: Text-based search across invoice descriptions and metadata
- **Multi-Currency Support**: Handle invoices in different currencies with proper validation

### **Enhanced Data Structure**
- **Extended Properties**: Support for all official API fields including version, organization ID, and timestamps
- **Payment Conditions**: Comprehensive payment terms, discounts, and due date management
- **Tax Conditions**: Advanced tax handling with subtypes, rates, and calculations
- **Shipping & Delivery**: Full shipping information with addresses and delivery terms
- **Line Items**: Enhanced line item support with discounts, article references, and pricing

### **Available Operations**
- **`getAll`** with advanced filtering options
- **`get`** by invoice ID
- **`create`** with comprehensive validation
- **`update`** with field-level validation
- **`delete`** invoices
- **`finalize`** draft invoices
- **`document`** PDF rendering
- **`downloadFile`** file download
- **`getDeeplink`** direct Lexware access
- **`getByStatus`** for status filtering
- **`getOverdue`** / **`getPaid`** / **`getDrafts`** / **`getOpen`** for specific statuses
- **`getByContact`** for contact-based filtering
- **`getByDateRange`** for invoice date filtering
- **`getByDueDateRange`** for due date filtering
- **`getByAmountRange`** for amount-based filtering
- **`search`** by text term
- **`getXRechnungInvoices`** for e-invoice filtering
- **`getRecurringInvoices`** for recurring invoice filtering
- **`getClosingInvoices`** for closing invoice filtering
- **`getByTaxType`** for tax type filtering
- **`getByCurrency`** for currency filtering
- **`getByLanguage`** for language filtering
- **`markAsPaid`** for payment status updates
- **`void`** for invoice cancellation
- **`sendReminder`** for payment reminders

### **Invoice Statuses Supported**
- **Draft**: Invoices in preparation stage
- **Open**: Finalized invoices awaiting payment
- **Paid**: Fully paid invoices
- **Voided**: Cancelled invoices
- **Overdue**: Past due date invoices
- **Partially Paid**: Invoices with partial payments

### **Special Invoice Types**
- **XRechnung**: German e-invoice standard support
- **Recurring**: Automated recurring invoice management
- **Closing**: Year-end closing invoice support
- **Down Payment**: Partial payment invoice handling

### **Usage Examples**

#### Create Invoice with Line Items
```json
{
  "resource": "invoice",
  "operation": "create",
  "additionalFields": {
    "voucherDate": "2024-01-15",
    "contactId": "contact-123",
    "invoiceNumber": "INV-2024-001",
    "dueDate": "2024-02-15",
    "title": "Consulting Services Q1 2024",
    "language": "en",
    "currency": "EUR",
    "lineItems": [
      {
        "type": "service",
        "name": "Strategic Consulting",
        "description": "Business strategy development",
        "quantity": 40,
        "unitName": "hour",
        "unitPrice": {
          "currency": "EUR",
          "netAmount": 150,
          "taxRatePercentage": 19
        }
      }
    ],
    "paymentConditions": {
      "paymentTerms": 30,
      "discountPercentage": 2,
      "discountDays": 10
    }
  }
}
```

#### Filter Overdue Invoices
```json
{
  "resource": "invoice",
  "operation": "getAll",
  "invoiceStatus": "overdue",
  "dueDateStart": "2024-01-01",
  "dueDateEnd": "2024-12-31",
  "minAmount": 1000,
  "currency": "EUR"
}
```

#### Search XRechnung Invoices
```json
{
  "resource": "invoice",
  "operation": "getAll",
  "isXRechnung": true,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "language": "de"
}
```

#### Update Invoice Status
```json
{
  "resource": "invoice",
  "operation": "update",
  "invoiceId": "invoice-123",
  "additionalFields": {
    "note": "Payment received via bank transfer",
    "tags": ["paid", "bank-transfer", "q1-2024"]
  }
}
```

## Enhanced File Endpoints

The File endpoints have been significantly enhanced based on the [official Lexware API documentation](https://developers.lexware.io/docs/#files-endpoint) to provide comprehensive file management capabilities:

### **Advanced File Management**
- **Comprehensive File Types**: Support for all business document types (invoices, credit notes, quotations, delivery notes, dunnings, receipts, vouchers)
- **Smart Categorization**: Business-focused categories (sales, purchase, financial, administrative)
- **Content Type Support**: Full MIME type support including images, documents, PDFs, and e-invoices
- **Access Control**: Granular access levels (private, public, restricted)

### **Enhanced Data Structure**
- **File Metadata**: Extended properties including description, tags, category, and custom fields
- **Processing Status**: Track file processing from pending to completed/failed
- **E-Invoice Support**: Native support for XRechnung, ZUGFeRD, and other e-invoice formats
- **File Relationships**: Associate files with contacts, articles, and vouchers
- **Security Features**: Checksum validation and file integrity verification

### **Available Operations**
- **`getAll`** with advanced filtering options
- **`get`** by file ID
- **`upload`** with comprehensive metadata
- **`update`** metadata and properties
- **`delete`** files
- **`download`** file content
- **`getByType`** for type-based filtering
- **`getByCategory`** for category-based filtering
- **`getByContentType`** for MIME type filtering
- **`getByAccessLevel`** for access control filtering
- **`getByProcessingStatus`** for status filtering
- **`getEInvoices`** for e-invoice files
- **`getByContact`** for contact-associated files
- **`getByArticle`** for article-associated files
- **`search`** by text term
- **`getByDateRange`** for date-based filtering
- **`getArchived`** / **`getPublic`** for status filtering
- **`updateMetadata`** for property updates
- **`archive`** / **`unarchive`** for status management
- **`changeAccessLevel`** for security management
- **`getPreviewUrl`** / **`getThumbnailUrl`** for file access
- **`getDeeplink`** for direct Lexware access

### **File Types Supported**
- **Business Documents**: Invoices, credit notes, quotations, delivery notes, dunnings
- **Receipts & Vouchers**: Receipts, vouchers, bookkeeping documents
- **E-Invoices**: XRechnung, ZUGFeRD, XML formats
- **Images & Media**: JPEG, PNG, GIF, TIFF, WEBP, PDF
- **Office Documents**: Word, Excel, PowerPoint
- **Archives**: ZIP, RAR, 7-Zip

### **Usage Examples**

#### Upload File with Metadata
```json
{
  "resource": "file",
  "operation": "upload",
  "additionalFields": {
    "fileName": "invoice-2024-001.pdf",
    "contentType": "application/pdf",
    "type": "invoice",
    "category": "sales",
    "description": "Q1 2024 invoice for consulting services",
    "tags": ["invoice", "consulting", "q1-2024"],
    "accessLevel": "private"
  }
}
```

#### Filter Files by Type and Category
```json
{
  "resource": "file",
  "operation": "getAll",
  "fileType": "invoice",
  "category": "sales",
  "isArchived": false,
  "limit": 20
}
```

#### Search E-Invoice Files
```json
{
  "resource": "file",
  "operation": "getAll",
  "isEInvoice": true,
  "contentType": "application/xml",
  "processingStatus": "completed"
}
```

#### Update File Metadata
```json
{
  "resource": "file",
  "operation": "update",
  "fileId": "file-123",
  "additionalFields": {
    "description": "Updated invoice description",
    "category": "financial",
    "tags": ["updated", "financial", "api"],
    "accessLevel": "restricted"
  }
}
```

## Enhanced Event Subscription Endpoints

The Event Subscription endpoints have been significantly enhanced based on the [official Lexware API documentation](https://developers.lexware.io/docs/#event-subscriptions-endpoint) to provide comprehensive webhook and event management capabilities:

### **Advanced Event Management**
- **Comprehensive Event Types**: Support for all Lexware business events (vouchers, invoices, contacts, articles, files, payments)
- **Smart Filtering**: Filter subscriptions by event type, contact ID, voucher type, and status
- **Search Capabilities**: Text-based search across subscription descriptions and tags
- **Active/Inactive Management**: Separate handling of active and inactive subscriptions

### **Enhanced Data Structure**
- **Webhook Security**: Built-in signature verification and webhook authenticity validation
- **Retry Management**: Configurable retry policies with exponential backoff
- **Delivery Tracking**: Comprehensive delivery history and status monitoring
- **Metadata Support**: Tags, priority levels, and expiration dates

### **Available Operations**
- **`getAll`** with advanced filtering options
- **`get`** by subscription ID
- **`create`** with comprehensive validation
- **`update`** with field-level validation
- **`delete`** (hard delete)
- **`activate`** / **`deactivate** for status management
- **`test`** webhook delivery
- **`getByEventType`** for event-specific filtering
- **`getActive`** / **`getInactive`** for status filtering
- **`getByContact`** for contact-based filtering
- **`getByVoucherType`** for voucher type filtering
- **`search`** by text term
- **`getDeliveryHistory`** for delivery tracking
- **`retryDelivery`** for failed deliveries
- **`getStatistics`** for performance monitoring
- **`bulkActivate`** / **`bulkDeactivate`** for batch operations

### **Webhook Security Features**
- **Signature Verification**: HMAC-SHA256 signature validation
- **Secret Management**: Secure webhook secret handling
- **Retry Headers**: Standard retry mechanism with proper headers
- **Delivery IDs**: Unique tracking for each webhook delivery

### **Usage Examples**

#### Create Event Subscription
```json
{
  "resource": "eventSubscription",
  "operation": "create",
  "additionalFields": {
    "eventType": "invoice.created",
    "url": "https://webhook.site/your-unique-url",
    "description": "Invoice creation notifications",
    "priority": "high",
    "maxRetries": 5,
    "retryDelay": 600,
    "tags": ["invoice", "webhook", "notifications"]
  }
}
```

#### Filter by Event Type
```json
{
  "resource": "eventSubscription",
  "operation": "getAll",
  "eventType": "invoice.created",
  "active": "true",
  "limit": 20
}
```

#### Search Subscriptions
```json
{
  "resource": "eventSubscription",
  "operation": "getAll",
  "searchTerm": "payment",
  "voucherType": "invoice"
}
```

#### Bulk Operations
```json
{
  "resource": "eventSubscription",
  "operation": "activate",
  "eventSubscriptionId": "sub-123"
}
```

### **Event Types Available**
- **Voucher Events**: `voucher.created`, `voucher.changed`, `voucher.status.changed`
- **Invoice Events**: `invoice.created`, `invoice.changed`, `invoice.paid`, `invoice.overdue`
- **Quotation Events**: `quotation.created`, `quotation.accepted`, `quotation.rejected`
- **Credit Note Events**: `credit-note.created`, `credit-note.status.changed`
- **Delivery Note Events**: `delivery-note.created`, `delivery-note.delivered`
- **Dunning Events**: `dunning.created`, `dunning.level.changed`
- **Contact Events**: `contact.created`, `contact.changed`
- **Article Events**: `article.created`, `article.changed`
- **File Events**: `file.uploaded`, `file.deleted`
- **Payment Events**: `payment.received`, `payment.processed`
- **System Events**: `subscription.verified`, `subscription.expired`

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
- **NEW**: Enhanced Invoice endpoints with comprehensive invoice management capabilities
- **NEW**: Advanced invoice filtering, status management, and business logic support
- **NEW**: Support for all invoice types including XRechnung, recurring, and closing invoices
- **NEW**: Enhanced payment conditions, tax handling, and line item management
- **NEW**: Enhanced File endpoints with comprehensive file management capabilities
- **NEW**: Advanced file filtering, categorization, and e-invoice support
- **NEW**: Support for all file types including business documents, images, and archives
- **NEW**: File access control, processing status tracking, and metadata management
- **NEW**: Enhanced Event Subscription endpoints with comprehensive webhook management
- **NEW**: Advanced filtering, search, and security features for event subscriptions
- **NEW**: Support for all Lexware business event types with comprehensive coverage
- **NEW**: Webhook signature verification and delivery tracking
- **NEW**: Bulk operations and advanced subscription management
- Comprehensive dunnings functionality with full API coverage
- Enhanced delivery notes with full API coverage
- Enhanced Article endpoints with advanced filtering and categorization
- Added pursue functionality for status management
- Improved PDF rendering and file download support
- Enhanced validation and error handling
- Added comprehensive test workflows for all enhanced endpoints

### Previous Versions
- Initial release with basic functionality
- Core resource management
- Basic CRUD operations

## License

This project is licensed under the MIT License - see the LICENSE file for details.
