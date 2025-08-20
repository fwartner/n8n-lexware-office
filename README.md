# n8n Lexware Office Custom Node

A comprehensive n8n custom node for interacting with the Lexware Office API, providing seamless integration for accounting and business management workflows.

## 🚀 Quick Start

### Installation

```bash
# Navigate to your n8n custom nodes directory
cd ~/.n8n/custom

# Install the package
npm install n8n-nodes-lexware-office

# Restart n8n
```

### Usage

1. **Add Credentials**: Create a "Lexware Office API" credential with your API key and base URL
2. **Add Node**: Use the "Lexware Office" node in your workflows
3. **Configure**: Select resource type and operation
4. **Execute**: Run your workflow with Lexware Office integration

## 📁 Project Structure

```
n8n-lexware-office/
├── custom-nodes/
│   └── n8n-nodes-lexware-office/     # Main package directory
│       ├── dist/                      # Compiled JavaScript files
│       ├── nodes/                     # Node implementations
│       ├── credentials/               # Credential types
│       ├── resources/                 # API resource handlers
│       ├── utils/                     # Utility functions
│       ├── types/                     # TypeScript type definitions
│       ├── constants/                 # Constants and enums
│       ├── package.json              # Package configuration
│       ├── tsconfig.json             # TypeScript configuration
│       └── README.md                 # Detailed documentation
└── README.md                         # This file
```

## 🔧 Features

### Supported Resources

- **Articles**: Product and service management
- **Contacts**: Customer and vendor management
- **Countries**: Geographic and tax information
- **Invoices**: Invoice creation and management
- **Orders**: Order confirmation handling
- **Payments**: Payment processing
- **Quotations**: Quote management
- **Vouchers**: Accounting voucher handling
- **Files**: Document management
- **And more...**

### Operations

- **Get**: Retrieve single items
- **Get All**: Retrieve multiple items with filtering
- **Create**: Add new items
- **Update**: Modify existing items
- **Delete**: Remove items

### Advanced Features

- **Rate Limiting**: Automatic API rate limit handling
- **Error Handling**: Comprehensive error management
- **Validation**: Input validation and sanitization
- **Filtering**: Advanced search and filter capabilities
- **Tax Support**: EU tax compliance features

## 📚 Documentation

- **[Installation Guide](custom-nodes/n8n-nodes-lexware-office/INSTALLATION.md)**: Detailed setup instructions
- **[API Documentation](custom-nodes/n8n-nodes-lexware-office/README.md)**: Complete API reference
- **[Resource Guides](custom-nodes/n8n-nodes-lexware-office/CONTACT_RESOURCE_README.md)**: Specific resource documentation

## 🛠️ Development

### Prerequisites

- Node.js 18.0.0+
- npm 8.0.0+
- n8n 0.125.0+

### Setup

```bash
# Clone the repository
git clone https://github.com/fwartner/n8n-nodes-lexware-office.git
cd n8n-nodes-lexware-office/custom-nodes/n8n-nodes-lexware-office

# Install dependencies
npm install

# Build the package
npm run build

# Development mode (watch for changes)
npm run dev
```

### Scripts

- `npm run build`: Compile TypeScript and copy assets
- `npm run dev`: Watch mode for development
- `npm run clean`: Remove build artifacts
- `npm run prepublishOnly`: Build before publishing

## 🔑 Configuration

### Credentials

Create a "Lexware Office API" credential with:

- **API Key**: Your Lexware Office API key
- **Resource URL**: API base URL (e.g., `https://api.lexware.io`)

### Environment Variables

- `LEXWARE_API_KEY`: API key for testing
- `LEXWARE_BASE_URL`: Base URL for testing

## 🧪 Testing

The package includes comprehensive test workflows and examples. Test your integration with:

1. **Simple operations** (get, getAll)
2. **Complex filtering** (tax rates, country codes)
3. **Error scenarios** (invalid credentials, rate limits)

## 📦 Publishing

### NPM Package

```bash
# Build and pack
npm run build
npm pack

# Publish (if you have access)
npm publish
```

### Local Installation

```bash
# Install locally for testing
npm install -g .
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](custom-nodes/n8n-nodes-lexware-office/LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/fwartner/n8n-nodes-lexware-office/issues)
- **Documentation**: [Lexware API Docs](https://developers.lexware.io/docs/)
- **n8n Community**: [n8n Community Forum](https://community.n8n.io/)

## 🔄 Changelog

### Version 1.0.0
- Initial release with comprehensive Lexware Office API support
- Support for all major resource types
- Advanced filtering and validation
- Professional error handling and rate limiting

## ⚡ Performance

- **Lightweight**: Minimal bundle size
- **Efficient**: Optimized API calls
- **Reliable**: Robust error handling
- **Scalable**: Built for production use

---

**Built with ❤️ for the n8n community**

*This custom node provides enterprise-grade integration with Lexware Office, enabling powerful automation workflows for accounting and business management.*
