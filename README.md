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
- Lexware Office API credentials
- Docker (for local development)

## Installation

### Option 1: Local Development Setup

1. Clone this repository:
```bash
git clone <repository-url>
cd n8n-lexware-office
```

2. Install dependencies:
```bash
cd custom-nodes/n8n-nodes-lexware-office
npm install
```

3. Build the node:
```bash
npm run build
```

4. Start the development environment:
```bash
cd ../..
docker compose up -d
```

5. Access n8n at `http://localhost:5678`

### Option 2: Production Installation

1. Copy the built node to your n8n custom nodes directory:
```bash
cp -r custom-nodes/n8n-nodes-lexware-office/dist /path/to/n8n/custom/n8n-nodes-lexware-office
```

2. Restart your n8n instance

## Configuration

### 1. Add Lexware Office API Credentials

1. In n8n, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Search for "Lexware Office API"
4. Fill in:
   - **API Key**: Your Lexware Office API key
   - **Resource URL**: Usually `https://api.lexware.io`

### 2. Create a Workflow

1. Create a new workflow in n8n
2. Add the **Lexware Office** node
3. Configure the node:
   - **Resource**: Choose the type of data to work with
   - **Operation**: Select the action (Create, Get, Get All, Update)
   - **Additional Fields**: Configure resource-specific parameters

## Usage Examples

### Create a Contact

1. Set **Resource** to "Contact"
2. Set **Operation** to "Create"
3. Set **Contact Type** to "Company" or "Person"
4. Add **Additional Fields**:
   - `name`: Company or person name
   - `street`: Address street
   - `zipCode`: Postal code
   - `city`: City name

### Get All Articles

1. Set **Resource** to "Article"
2. Set **Operation** to "Get All"
3. Configure pagination:
   - **Return All**: false
   - **Limit**: 50 (or your preferred limit)

### Create an Invoice

1. Set **Resource** to "Voucher"
2. Set **Operation** to "Create"
3. Set **Voucher Type** to "Invoice"
4. Add **Additional Fields**:
   - `contactId`: ID of the contact
   - `lineItems`: Array of invoice items
   - `voucherDate`: Invoice date

## API Endpoints Supported

- `/v1/contacts` - Contact management
- `/v1/articles` - Article/product management
- `/v1/vouchers` - Voucher operations
- `/v1/voucherlist` - List all vouchers
- `/v1/invoices` - Invoice management
- `/v1/quotations` - Quotation management
- `/v1/credit-notes` - Credit note management
- `/v1/delivery-notes` - Delivery note management
- `/v1/dunnings` - Dunning management
- `/v1/files` - File management
- `/v1/profile` - User profile
- `/v1/countries` - Country list
- `/v1/payment-conditions` - Payment terms
- `/v1/event-subscriptions` - Webhook subscriptions

## Architecture

The node is built with a modular architecture:

- **Types**: TypeScript interfaces and type definitions
- **Constants**: API endpoints, resource types, and configuration values
- **Utils**: Common utility functions for API calls and data transformation
- **Resources**: Individual resource handlers for each API endpoint
- **ResourceFactory**: Central factory for managing all resource operations

## Development

### Project Structure

```
custom-nodes/n8n-nodes-lexware-office/
├── constants/          # API endpoints and configuration
├── credentials/        # Authentication credentials
├── nodes/             # Main node implementation
├── resources/          # Resource handlers
├── types/             # TypeScript interfaces
├── utils/             # Utility functions
├── dist/              # Compiled JavaScript (generated)
├── package.json       # Dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

### Building

```bash
npm run build          # Build the project
npm run dev            # Watch mode for development
```

### Testing

1. Start the development environment:
```bash
docker compose up -d
```

2. Access n8n at `http://localhost:5678`
3. Create a test workflow with the Lexware Office node
4. Test different operations and resources

## Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed and TypeScript is properly configured
2. **Credential Errors**: Verify your API key and resource URL are correct
3. **API Errors**: Check the Lexware Office API documentation for endpoint requirements

### Debug Mode

Enable debug logging in n8n by setting:
```bash
N8N_LOG_LEVEL=debug
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue in the repository
- Check the Lexware Office API documentation
- Review n8n custom node development guides

## Changelog

### v1.0.0
- Initial release
- Support for all major Lexware Office API endpoints
- Modular architecture for easy maintenance
- Comprehensive TypeScript support
- Docker development environment
