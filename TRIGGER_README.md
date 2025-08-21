# Lexware Office Trigger Node

The Lexware Office Trigger Node provides webhook-based event triggering capabilities for n8n workflows. This node allows you to listen to various events that occur in your Lexware Office system and automatically trigger workflows based on those events.

## Features

- **Real-time Event Monitoring**: Listen to events as they happen in Lexware Office
- **Comprehensive Event Types**: Support for all major business events (contacts, invoices, quotations, etc.)
- **Advanced Filtering**: Filter events by contact ID, voucher type, status, amount, and date ranges
- **Webhook Security**: Built-in signature verification for secure webhook delivery
- **Retry Mechanism**: Automatic retry of failed webhook deliveries
- **Event Logging**: Comprehensive logging and statistics for monitoring

## Event Types

### Contact Events
- `contact.created` - When a new contact is created
- `contact.updated` - When a contact is updated
- `contact.deleted` - When a contact is deleted

### Invoice Events
- `invoice.created` - When a new invoice is created
- `invoice.updated` - When an invoice is updated
- `invoice.status.changed` - When invoice status changes
- `invoice.paid` - When an invoice is marked as paid
- `invoice.overdue` - When an invoice becomes overdue

### Quotation Events
- `quotation.created` - When a new quotation is created
- `quotation.updated` - When a quotation is updated
- `quotation.status.changed` - When quotation status changes
- `quotation.accepted` - When a quotation is accepted
- `quotation.rejected` - When a quotation is rejected

### Article Events
- `article.created` - When a new article is created
- `article.updated` - When an article is updated
- `article.deleted` - When an article is deleted

### Voucher Events
- `voucher.created` - When a new voucher is created
- `voucher.updated` - When a voucher is updated
- `voucher.status.changed` - When voucher status changes

### Payment Events
- `payment.received` - When a payment is received
- `payment.processed` - When a payment is processed

### File Events
- `file.uploaded` - When a file is uploaded

### Dunning Events
- `dunning.created` - When a new dunning is created
- `dunning.status.changed` - When dunning status changes

### System Events
- `all` - Listen to all events (use with caution)

## Configuration

### Basic Setup

1. **Add the Trigger Node**: Drag and drop the "Lexware Office Trigger" node into your workflow
2. **Configure Credentials**: Select your Lexware Office API credentials
3. **Choose Event Type**: Select the specific event type you want to listen for
4. **Set Webhook Secret** (Optional): Add a secret key for webhook security

### Advanced Filtering

#### Contact ID Filter
Filter events to only those related to a specific contact:
```
Contact ID: "cont_12345"
```

#### Voucher Type Filter
Filter events by voucher type:
```
Voucher Type: "invoice" | "quotation" | "credit_note" | "delivery_note"
```

#### Status Filter
Filter events by status:
```
Status: "draft" | "open" | "paid" | "overdue" | "voided"
```

#### Amount Filter
Filter events by amount range:
```
Minimum Amount: 100
Maximum Amount: 1000
Currency: EUR
```

#### Date Filter
Filter events by date range:
```
Start Date: 2024-01-01
End Date: 2024-12-31
```

### Additional Options

#### Metadata and Related Data
- **Include Metadata**: Add additional metadata to webhook payloads
- **Include Related Data**: Include related data (e.g., contact info for invoices)

#### Retry Configuration
- **Retry on Failure**: Automatically retry failed webhook deliveries
- **Max Retries**: Maximum number of retry attempts (1-10)
- **Retry Delay**: Delay between retry attempts in seconds (10-3600)

## Webhook Payload Structure

### Standard Payload
```json
{
  "event_type": "invoice.created",
  "event_id": "evt_1703123456789_abc123def",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "data": {
    "invoiceId": "inv_12345",
    "invoiceNumber": "INV-2024-001",
    "contactId": "cont_67890",
    "contactName": "John Doe",
    "amount": 150.00,
    "totalAmount": 178.50,
    "currency": "EUR",
    "status": "draft"
  },
  "metadata": {
    "source": "lexware-office",
    "version": "1.0",
    "webhook_id": "wh_1703123456789_xyz789ghi",
    "delivery_timestamp": "2024-01-01T12:00:01.000Z"
  }
}
```

### Event-Specific Data

#### Contact Events
```json
{
  "event_type": "contact.created",
  "data": {
    "contactId": "cont_12345",
    "contactType": "company",
    "companyName": "Acme Corp",
    "email": "info@acme.com",
    "phone": "+49 123 456789",
    "street": "Main Street 123",
    "zipCode": "12345",
    "city": "Berlin",
    "country": "DE",
    "vatNumber": "DE123456789",
    "contactRole": "customer"
  }
}
```

#### Invoice Events
```json
{
  "event_type": "invoice.status.changed",
  "data": {
    "invoiceId": "inv_12345",
    "invoiceNumber": "INV-2024-001",
    "oldStatus": "draft",
    "newStatus": "open",
    "statusChangedAt": "2024-01-01T12:00:00.000Z",
    "amount": 150.00,
    "totalAmount": 178.50,
    "currency": "EUR",
    "dueDate": "2024-02-01T00:00:00.000Z"
  }
}
```

#### Payment Events
```json
{
  "event_type": "payment.received",
  "data": {
    "paymentId": "pay_12345",
    "contactId": "cont_67890",
    "contactName": "John Doe",
    "amount": 178.50,
    "currency": "EUR",
    "paymentMethod": "bank_transfer",
    "paymentReference": "REF-2024-001",
    "transactionId": "txn_98765",
    "paymentDate": "2024-01-15T00:00:00.000Z",
    "status": "completed"
  }
}
```

## Security Features

### Webhook Signature Verification
The trigger node supports HMAC-SHA256 signature verification for secure webhook delivery:

1. **Set Webhook Secret**: Configure a secret key in the trigger node
2. **Signature Header**: Lexware Office will send the signature in the `X-Lexware-Signature` header
3. **Automatic Verification**: The node automatically verifies the signature before processing

### Retry Headers
Webhook deliveries include retry information:
- `X-Lexware-Retry-Count`: Current retry attempt number
- `X-Lexware-Delivery-Id`: Unique delivery identifier
- `X-Lexware-Retry-After`: Suggested retry delay

## Use Cases

### 1. Automated Customer Communication
**Trigger**: `contact.created`
**Action**: Send welcome email, create CRM record, assign sales representative

### 2. Invoice Processing
**Trigger**: `invoice.status.changed` (status: "open")
**Action**: Send invoice to customer, create accounting entry, schedule payment reminder

### 3. Payment Reconciliation
**Trigger**: `payment.received`
**Action**: Update invoice status, send payment confirmation, create bank reconciliation entry

### 4. Quotation Follow-up
**Trigger**: `quotation.created`
**Action**: Send quotation to customer, schedule follow-up reminder, create sales opportunity

### 5. Overdue Invoice Management
**Trigger**: `invoice.overdue`
**Action**: Send overdue notice, create dunning entry, escalate to collections

### 6. File Management
**Trigger**: `file.uploaded`
**Action**: Process document, extract data, update related records

## Workflow Examples

### Example 1: New Contact Onboarding
```
Lexware Office Trigger (contact.created)
    ↓
Send Welcome Email (Gmail)
    ↓
Create CRM Record (HubSpot)
    ↓
Assign Sales Representative (Slack)
    ↓
Schedule Follow-up Task (Todoist)
```

### Example 2: Invoice Payment Processing
```
Lexware Office Trigger (payment.received)
    ↓
Update Invoice Status (Lexware Office)
    ↓
Send Payment Confirmation (Gmail)
    ↓
Create Accounting Entry (QuickBooks)
    ↓
Update Customer Record (CRM)
```

### Example 3: Quotation Management
```
Lexware Office Trigger (quotation.created)
    ↓
Send Quotation (Gmail)
    ↓
Create Sales Opportunity (CRM)
    ↓
Schedule Follow-up (Calendar)
    ↓
Notify Sales Team (Slack)
```

## Best Practices

### 1. Event Selection
- **Be Specific**: Choose specific event types rather than using "all events"
- **Consider Volume**: High-volume events (e.g., `contact.updated`) may generate many webhooks
- **Test First**: Start with low-volume events to test your workflow

### 2. Filtering
- **Use Filters**: Apply filters to reduce unnecessary webhook processing
- **Contact ID**: Filter by specific contacts for customer-specific workflows
- **Amount Ranges**: Use amount filters for financial workflows
- **Date Ranges**: Limit events to relevant time periods

### 3. Security
- **Webhook Secrets**: Always use webhook secrets for production workflows
- **HTTPS**: Ensure your webhook endpoint uses HTTPS
- **Rate Limiting**: Implement rate limiting on your webhook endpoint

### 4. Error Handling
- **Retry Logic**: Enable retry on failure for reliable delivery
- **Error Monitoring**: Monitor webhook delivery statistics
- **Fallback Actions**: Implement fallback actions for critical workflows

### 5. Performance
- **Queue Management**: Monitor event queue size and processing
- **Database Operations**: Minimize database operations in webhook handlers
- **Async Processing**: Use asynchronous processing for time-consuming operations

## Monitoring and Troubleshooting

### Event Statistics
Monitor event processing with built-in statistics:
- Total events processed
- Events by type
- Webhook delivery success/failure rates
- Retry counts and delays

### Common Issues

#### Webhook Not Triggering
1. Check event type configuration
2. Verify filters are not too restrictive
3. Ensure webhook endpoint is accessible
4. Check webhook secret configuration

#### High Failure Rate
1. Review webhook endpoint performance
2. Check network connectivity
3. Verify payload size limits
4. Monitor server resources

#### Missing Events
1. Check event type selection
2. Verify filter configuration
3. Review event retention settings
4. Check for event queue overflow

### Debug Mode
Enable debug logging to troubleshoot issues:
```typescript
// In your workflow configuration
const triggerNode = {
  // ... other configuration
  debug: true,
  logLevel: 'debug'
};
```

## API Reference

### WebhookService
```typescript
import { WebhookService } from 'n8n-nodes-lexware-office';

const webhookService = new WebhookService(credentials);

// Register webhook
const webhookId = await webhookService.registerWebhook(config);

// Send event
await webhookService.sendWebhookEvent(event);

// Get statistics
const stats = webhookService.getDeliveryStatistics();
```

### EventEmitter
```typescript
import { EventEmitter } from 'n8n-nodes-lexware-office';

const eventEmitter = new EventEmitter(credentials);

// Emit events
await eventEmitter.emitContactCreated(contactData);
await eventEmitter.emitInvoicePaid(invoiceData, paymentData);

// Get statistics
const stats = eventEmitter.getEventStatistics();
```

## Migration from Legacy Triggers

If you're using the old trigger functionality in the main Lexware Office node:

1. **Replace Old Triggers**: Replace `LEXWARE_RESOURCE_TYPES.TRIGGER` operations with the new trigger node
2. **Update Workflows**: Update existing workflows to use the new trigger node
3. **Migrate Configuration**: Transfer webhook configurations to the new trigger node
4. **Test Thoroughly**: Test all trigger scenarios before going live

## Support and Resources

- **Documentation**: [Lexware Office API Documentation](https://api.lexware.de)
- **Community**: [n8n Community Forum](https://community.n8n.io)
- **Issues**: [GitHub Issues](https://github.com/fwartner/n8n-nodes-lexware-office/issues)
- **Examples**: [Workflow Templates](https://n8n.io/workflows)

## Changelog

### Version 1.0.12
- Added dedicated trigger node for webhook events
- Implemented comprehensive event filtering
- Added webhook security with signature verification
- Introduced retry mechanism for failed deliveries
- Added event logging and statistics

### Version 1.0.11
- Basic trigger functionality in main node
- Simple webhook event simulation

---

For more information and examples, visit the [Lexware Office Node documentation](https://github.com/fwartner/n8n-nodes-lexware-office).
