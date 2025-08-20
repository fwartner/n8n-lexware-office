# n8n Lexware Office Node

This is an n8n community node that integrates with the Lexware Office API, allowing you to interact with Lexware's business management system directly from your n8n workflows.

## Features

- **Contacts Management**: Create, read, update contacts (companies and persons)
- **Articles Management**: Manage products and services
- **Vouchers**: Handle various types of business vouchers
- **Invoices**: Create and manage invoices
- **Quotations**: Handle quotations and estimates
- **Credit Notes**: Manage credit notes and refunds
- **Delivery Notes**: Track deliveries
- **Dunnings**: Handle payment reminders
- **Files**: Upload and manage documents
- **Profile & Settings**: Access user profile and system settings

## Prerequisites

- n8n instance (local or cloud)
- Lexware Office API key
- Lexware Office account

## Installation

### Local Development

1. Clone this repository to your n8n custom nodes directory:
   ```bash
   cd ~/.n8n/custom
   git clone <repository-url> n8n-nodes-lexware-office
   ```

2. Install dependencies:
   ```bash
   cd n8n-nodes-lexware-office
   npm install
   ```

3. Build the node:
   ```bash
   npm run build
   ```

4. Restart your n8n instance

### Docker Development

1. Use the provided `docker-compose.yml` file:
   ```bash
   docker-compose up -d
   ```

2. The custom node will be automatically loaded from the `./custom-nodes` volume.

## Configuration

### Credentials

1. In your n8n workflow, add the "Lexware Office" node
2. Click on the credentials field and create new credentials
3. Enter your Lexware Office API key
4. Set the resource URL (usually `https://api.lexware.io`)

### API Key

To get your Lexware Office API key:

1. Log into your Lexware Office account
2. Go to Settings > API
3. Generate a new API key
4. Copy the key and use it in the credentials

## Usage

### Basic Operations

The node supports four main operations for most resources:

- **Create**: Create new resources
- **Get**: Retrieve a specific resource by ID
- **Get All**: Retrieve multiple resources with pagination
- **Update**: Modify existing resources

### Resource Types

#### Contacts
- **Company**: Business entities with contact persons
- **Person**: Individual contacts
- **Operations**: Create, read, update

#### Articles
- **Products**: Physical items for sale
- **Services**: Service offerings
- **Operations**: Create, read, update

#### Vouchers
- **Sales Invoice**: Customer invoices
- **Purchase Invoice**: Supplier invoices
- **Credit Notes**: Refunds and adjustments
- **Quotations**: Price estimates
- **Order Confirmations**: Order acknowledgments
- **Delivery Notes**: Shipping documents

#### Invoices
- **Draft**: Work-in-progress invoices
- **Open**: Finalized invoices
- **PDF Generation**: Automatic document creation

### Example Workflows

#### 1. Contact Management
```
Webhook → Lexware Office (Create Contact) → Slack (Notify)
```

#### 2. Invoice Automation
```
Schedule Trigger → Lexware Office (Get All Invoices) → Filter (Unpaid) → Email (Reminder)
```

#### 3. Article Sync
```
HTTP Request (External System) → Lexware Office (Create/Update Article) → Database (Log)
```

## API Endpoints

The node integrates with the following Lexware Office API endpoints:

- `/v1/contacts` - Contact management
- `/v1/articles` - Article management
- `/v1/vouchers` - Voucher operations
- `/v1/invoices` - Invoice management
- `/v1/quotations` - Quotation handling
- `/v1/credit-notes` - Credit note operations
- `/v1/delivery-notes` - Delivery tracking
- `/v1/dunnings` - Payment reminders
- `/v1/files` - File management
- `/v1/profile` - User profile
- `/v1/countries` - Country codes
- `/v1/payment-conditions` - Payment terms
- `/v1/event-subscriptions` - Webhook subscriptions

## Error Handling

The node includes comprehensive error handling:

- **Authentication Errors**: Invalid API keys or expired tokens
- **Validation Errors**: Missing required fields or invalid data
- **Rate Limiting**: API quota exceeded
- **Network Errors**: Connection issues

## Development

### Project Structure

```
n8n-nodes-lexware-office/
├── credentials/
│   └── LexwareOfficeApi.credentials.ts
├── nodes/
│   └── LexwareOffice/
│       ├── LexwareOffice.node.ts
│       └── lexware.svg
├── package.json
├── tsconfig.json
└── README.md
```

### Building

```bash
# Development build with watch
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Formatting
npm run format
```

### Testing

1. Start your n8n instance
2. Create a new workflow
3. Add the Lexware Office node
4. Configure credentials and parameters
5. Test the execution

## Troubleshooting

### Common Issues

1. **Node not appearing**: Ensure the node is built and n8n is restarted
2. **Authentication errors**: Verify API key and resource URL
3. **Type errors**: Check TypeScript compilation
4. **Missing dependencies**: Run `npm install`

### Debug Mode

Enable debug logging in n8n:
```bash
N8N_LOG_LEVEL=debug n8n start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

- **Documentation**: [Lexware Office API Docs](https://developers.lexware.io/)
- **Issues**: GitHub Issues
- **Community**: n8n Community Forum

## Changelog

### v1.0.0
- Initial release
- Support for all major Lexware Office resources
- CRUD operations for contacts, articles, vouchers, and more
- Comprehensive error handling
- TypeScript implementation
