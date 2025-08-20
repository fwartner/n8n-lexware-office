# n8n Lexware Office Custom Node

[![npm version](https://badge.fury.io/js/n8n-nodes-lexware-office.svg)](https://badge.fury.io/js/n8n-nodes-lexware-office)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n Community](https://img.shields.io/badge/n8n-Community-Node-green.svg)](https://n8n.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A comprehensive n8n custom node for interacting with the Lexware Office API, providing seamless integration for accounting and business management workflows. This node enables powerful automation of accounting processes, contact management, and business operations through n8n workflows.

## ✨ Features

- **🔌 Full API Coverage**: Support for all major Lexware Office resources
- **🔄 Advanced Operations**: Create, read, update, delete, and specialized operations
- **🔍 Smart Filtering**: Advanced search and filter capabilities across all resources
- **⚡ Rate Limiting**: Built-in API rate limit handling (2 requests/second)
- **🛡️ Error Handling**: Comprehensive error management and validation
- **🌍 EU Tax Support**: Built-in support for EU tax compliance and XRechnung
- **📊 Type Safety**: Full TypeScript support with comprehensive interfaces
- **🚀 Modern Architecture**: Clean, maintainable codebase with proper separation of concerns

## 🚀 Quick Start

### Prerequisites

- [n8n](https://n8n.io/) instance running (version 0.125.0 or higher)
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

#### Method 1: NPM Install (Recommended)

```bash
# Navigate to your n8n custom nodes directory
cd ~/.n8n/custom

# Install the package
npm install n8n-nodes-lexware-office

# Restart n8n
```

#### Method 2: Manual Installation

```bash
# Clone the repository
git clone https://github.com/fwartner/n8n-nodes-lexware-office.git
cd n8n-nodes-lexware-office

# Install dependencies
npm install

# Build the package
npm run build

# Copy to n8n custom directory
cp -r dist ~/.n8n/custom/n8n-nodes-lexware-office
```

### Configuration

1. **Create Credentials**: Go to Settings → Credentials → Add Credential
2. **Select Type**: Choose "Lexware Office API"
3. **Fill Details**:
   - **API Key**: Your Lexware Office API key
   - **Resource URL**: API base URL (e.g., `https://api.lexware.io`)

### Usage

1. **Add Node**: Use the "Lexware Office" node in your workflows
2. **Select Resource**: Choose from available resource types
3. **Configure Operation**: Set up the desired operation and parameters
4. **Execute**: Run your workflow with Lexware Office integration

## 📁 Project Structure

```
n8n-lexware-office/
├── 📁 dist/                    # Compiled JavaScript files
├── 📁 nodes/                   # Node implementations
├── 📁 credentials/             # Credential types
├── 📁 resources/               # API resource handlers
├── 📁 utils/                   # Utility functions
├── 📁 types/                   # TypeScript type definitions
├── 📁 constants/               # Constants and enums
├── 📁 scripts/                 # Build scripts
├── 📄 package.json             # Package configuration
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 README.md                # Detailed API documentation
├── 📄 INSTALLATION.md          # Installation guide
├── 📄 LICENSE                  # MIT license
└── 📄 .gitignore               # Git ignore rules
```

## 🔧 Supported Resources

| Resource | Operations | Description |
|----------|------------|-------------|
| **Articles** | CRUD + Specialized | Product and service management |
| **Contacts** | CRUD + Advanced Filtering | Customer and vendor management |
| **Countries** | Get + Filtered Lists | Geographic and tax information |
| **Invoices** | Full Lifecycle + Status Management | Invoice creation and management |
| **Orders** | CRUD + Document Generation | Order confirmation handling |
| **Payments** | CRUD + Processing | Payment processing and tracking |
| **Quotations** | CRUD + Status Management | Quote management and conversion |
| **Vouchers** | CRUD + Accounting | Accounting voucher handling |
| **Files** | Upload/Download + Metadata | Document management and storage |
| **Dunnings** | CRUD + Level Management | Payment reminder management |
| **Delivery Notes** | CRUD + Status Management | Delivery tracking and management |
| **Credit Notes** | CRUD + Invoice Linking | Credit and refund management |

## 🎯 Available Operations

- **Get**: Retrieve single items by ID
- **Get All**: Retrieve multiple items with advanced filtering
- **Create**: Add new items with validation
- **Update**: Modify existing items with field-level validation
- **Delete**: Remove items with proper cleanup
- **Specialized**: Resource-specific operations (pursue, finalize, render, etc.)

## 🌟 Advanced Features

### Smart Filtering & Search
- **Multi-criteria filtering** across all resources
- **Text-based search** with relevance scoring
- **Date range filtering** with flexible formats
- **Status-based filtering** for workflow automation
- **Tax classification filtering** for compliance

### EU Tax Compliance
- **XRechnung support** for German e-invoices
- **EU country detection** and tax rate management
- **Distance sales support** for cross-border operations
- **Tax classification** with automatic validation

### Error Handling & Validation
- **Comprehensive error messages** with actionable guidance
- **Input validation** with field-level feedback
- **API error handling** with retry mechanisms
- **Rate limit compliance** with automatic throttling

## 📚 Documentation

- **[📖 Installation Guide](INSTALLATION.md)**: Detailed setup instructions for all environments
- **[🔌 API Documentation](README.md)**: Complete API reference and examples
- **[📋 Resource Guides](CONTACT_RESOURCE_README.md)**: Specific resource documentation
- **[🌐 Lexware API Docs](https://developers.lexware.io/docs/)**: Official API documentation

## 🛠️ Development

### Prerequisites

- Node.js 18.0.0+
- npm 8.0.0+
- n8n 0.125.0+

### Setup

```bash
# Clone the repository
git clone https://github.com/fwartner/n8n-nodes-lexware-office.git
cd n8n-nodes-lexware-office

# Install dependencies
npm install

# Build the package
npm run build

# Development mode (watch for changes)
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript and copy assets |
| `npm run dev` | Watch mode for development |
| `npm run clean` | Remove build artifacts |
| `npm run prepublishOnly` | Build before publishing |

### Building for Production

```bash
# Clean and build
npm run clean
npm run build

# Test the package
npm pack --dry-run

# Publish (if you have access)
npm publish
```

## 🔑 Configuration

### Environment Variables

```bash
# For development and testing
LEXWARE_API_KEY=your_api_key_here
LEXWARE_BASE_URL=https://api.lexware.io
```

### Credential Configuration

The node requires a "Lexware Office API" credential with:

- **API Key**: Your Lexware Office API key from Lexware
- **Resource URL**: The Lexware API base URL (usually `https://api.lexware.io`)

## 🧪 Testing

The package includes comprehensive examples and test scenarios:

1. **Basic Operations**: Simple CRUD operations for all resources
2. **Advanced Filtering**: Complex queries with multiple criteria
3. **Error Scenarios**: Invalid credentials, rate limits, validation errors
4. **Workflow Integration**: End-to-end workflow examples

### Test Your Integration

```bash
# Install in a test n8n instance
cd ~/.n8n/custom
npm install n8n-nodes-lexware-office

# Create a test workflow with the Lexware Office node
# Test basic operations and verify functionality
```

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

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** for your changes
4. **Make your changes** with proper testing
5. **Submit a pull request** with a clear description

### Development Guidelines

- **Follow TypeScript best practices**
- **Add tests** for new functionality
- **Update documentation** for any changes
- **Follow the existing code style**
- **Test thoroughly** before submitting

### Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive license that allows for:
- Commercial use
- Modification
- Distribution
- Private use

## 🆘 Support

### Getting Help

- **📖 Documentation**: Start with the [installation guide](INSTALLATION.md)
- **🐛 Issues**: Report bugs via [GitHub Issues](https://github.com/fwartner/n8n-nodes-lexware-office/issues)
- **💬 Discussions**: Join the [GitHub Discussions](https://github.com/fwartner/n8n-nodes-lexware-office/discussions)
- **📚 Lexware API**: Check the [official documentation](https://developers.lexware.io/docs/)
- **🌐 n8n Community**: Visit the [n8n Community Forum](https://community.n8n.io/)

### Common Issues

| Issue | Solution |
|-------|----------|
| Node not appearing | Check n8n version compatibility and restart n8n |
| Credential errors | Verify API key and base URL in credentials |
| Build failures | Ensure Node.js 18+ and run `npm run clean && npm run build` |
| Rate limit errors | The node automatically handles rate limiting |

## 🔄 Changelog

### Version 1.0.0
- **🎉 Initial Release**: Comprehensive Lexware Office API support
- **🔌 Full Resource Coverage**: Support for all major resource types
- **🔍 Advanced Filtering**: Smart search and filter capabilities
- **🛡️ Professional Error Handling**: Robust error management and validation
- **⚡ Rate Limit Compliance**: Automatic API rate limit handling
- **🌍 EU Tax Support**: Built-in compliance features
- **📚 Complete Documentation**: Comprehensive guides and examples

## ⚡ Performance

- **Lightweight**: Minimal bundle size for fast loading
- **Efficient**: Optimized API calls with connection pooling
- **Reliable**: Robust error handling and retry mechanisms
- **Scalable**: Built for production use with enterprise features

## 🌟 Why Choose This Node?

- **🔌 Enterprise Ready**: Built for production use with comprehensive error handling
- **📚 Well Documented**: Extensive documentation and examples
- **🛠️ Actively Maintained**: Regular updates and community support
- **🌍 EU Compliant**: Built-in support for EU tax requirements
- **⚡ High Performance**: Optimized for speed and reliability
- **🔒 Secure**: Proper credential handling and validation

## 📊 Statistics

- **Resources Supported**: 12+ major business resources
- **Operations Available**: 50+ different operations
- **API Endpoints**: 100+ Lexware API endpoints covered
- **Error Codes**: 50+ specific error scenarios handled
- **Tax Classifications**: 20+ EU tax types supported

---

## 🌟 Star This Repository

If this project helps you, please consider giving it a ⭐️ star on GitHub!

## 📞 Contact

- **Author**: Florian Wartner
- **Email**: florian@pixelandprocess.de
- **GitHub**: [@fwartner](https://github.com/fwartner)
- **Website**: [pixelandprocess.de](https://pixelandprocess.de)

---

**Built with ❤️ for the n8n community**

*This custom node provides enterprise-grade integration with Lexware Office, enabling powerful automation workflows for accounting and business management. Open source and community-driven.*
