# n8n Lexware Office Custom Node

[![npm version](https://img.shields.io/npm/v/@pixelandprocess_de/n8n-nodes-lexware-office.svg)](https://www.npmjs.com/package/@pixelandprocess_de/n8n-nodes-lexware-office)
[![npm downloads](https://img.shields.io/npm/dm/@pixelandprocess_de/n8n-nodes-lexware-office.svg)](https://www.npmjs.com/package/@pixelandprocess_de/n8n-nodes-lexware-office)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n Community](https://img.shields.io/badge/n8n-Community%20Node-green.svg)](https://n8n.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A comprehensive **n8n custom node** for seamless integration with the **Lexware Office API**. This node provides full access to all major business resources including articles, contacts, invoices, orders, payments, and more, with advanced features like EU tax compliance, smart filtering, and comprehensive error handling.

## 🚀 Quick Start

### Prerequisites

- **n8n**: Version 0.125.0 or higher
- **Node.js**: Version 18.0.0 or higher
- **Lexware Office API**: Valid API credentials

### Installation

#### Method 1: NPM Install (Recommended)

```bash
cd ~/.n8n/custom
npm install @pixelandprocess_de/n8n-nodes-lexware-office
```

**Note**: The package will be installed as `@pixelandprocess_de/n8n-nodes-lexware-office` in your custom nodes directory.

#### Method 2: Manual Installation

```bash
git clone https://github.com/fwartner/n8n-nodes-lexware-office.git
cd n8n-nodes-lexware-office
npm install && npm run build
cp -r dist ~/.n8n/custom/@pixelandprocess_de/n8n-nodes-lexware-office
```

#### Method 3: Docker Installation

```yaml
volumes:
  - ./custom-nodes:/home/node/.n8n/custom
environment:
  - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
```

Then install the package in the custom-nodes directory:

```bash
mkdir -p custom-nodes
cd custom-nodes
npm install @pixelandprocess_de/n8n-nodes-lexware-office
docker-compose restart n8n
```

#### Method 4: GitHub Installation

For developers or users who want the latest features:

```bash
cd ~/.n8n/custom
git clone https://github.com/fwartner/n8n-nodes-lexware-office.git
cd n8n-nodes-lexware-office
npm install && npm run build
cp -r dist ../@pixelandprocess_de/n8n-nodes-lexware-office
```

See [GitHub Installation Guide](GITHUB_INSTALLATION.md) for detailed instructions.

### Configuration

1. **Restart n8n** after installation
2. **Add credentials** for your Lexware Office API
3. **Use the node** in your workflows

## ✨ Features

- **🔗 Full API Coverage**: All major Lexware Office resources supported
- **🌍 EU Tax Compliance**: Built-in support for European business requirements
- **🔍 Smart Filtering**: Advanced search and filtering capabilities
- **📊 Status Management**: Comprehensive status tracking and transitions
- **📄 Document Generation**: PDF rendering and file download support
- **⚡ Performance**: Optimized with rate limiting and caching
- **🛡️ Error Handling**: Robust error management and validation
- **🔧 Type Safety**: Full TypeScript support with comprehensive interfaces

## 📦 Supported Resources

| Resource | Operations | Description |
|----------|------------|-------------|
| 📋 **Articles** | CRUD + Specialized | Product and service management |
| 👥 **Contacts** | CRUD + Specialized | Customer and vendor management |
| 🌍 **Countries** | CRUD + Specialized | Geographic and tax information |
| 🧾 **Invoices** | CRUD + Specialized | Full lifecycle management |
| 📋 **Orders** | CRUD + Specialized | Order confirmation and documents |
| 💰 **Payments** | CRUD + Specialized | Payment processing and tracking |
| 📝 **Quotations** | CRUD + Specialized | Quote management and conversion |
| 📊 **Vouchers** | CRUD + Specialized | Accounting voucher handling |
| 📁 **Files** | CRUD + Specialized | Document management and metadata |
| ⏰ **Dunnings** | CRUD + Specialized | Payment reminder management |
| 🚚 **Delivery Notes** | CRUD + Specialized | Delivery tracking and management |
| 💳 **Credit Notes** | CRUD + Specialized | Credit and refund management |
| 💸 **Down Payment Invoices** | CRUD + Specialized | Partial payment handling |
| 🔔 **Event Subscriptions** | CRUD + Specialized | Webhook and event management |
| ⏱️ **Payment Conditions** | CRUD + Specialized | Payment terms and conditions |
| 🏷️ **Posting Categories** | CRUD + Specialized | Accounting categorization |
| 🎨 **Print Layouts** | CRUD + Specialized | Document formatting and templates |
| 👤 **Profiles** | CRUD + Specialized | User and system profiles |
| 🔄 **Recurring Templates** | CRUD + Specialized | Automated recurring operations |

## 🎯 Available Operations

| Operation | Description | Resources |
|-----------|-------------|-----------|
| **Create** | Create new resources | All resources |
| **Get** | Retrieve single resource | All resources |
| **Get All** | List resources with filtering | All resources |
| **Update** | Modify existing resources | All resources |
| **Delete** | Remove resources | All resources |
| **Specialized** | Resource-specific operations | Varies by resource |

## 🏗️ Project Structure

```
n8n-lexware-office/
├── 📁 dist/                    # Compiled JavaScript files
├── 📁 nodes/                   # Node implementations
│   └── 📁 LexwareOffice/      # Main node with SVG icon
├── 📁 credentials/             # Credential types
├── 📁 resources/               # API resource handlers
├── 📁 utils/                   # Utility functions
├── 📁 types/                   # TypeScript type definitions
├── 📁 constants/               # Constants and enums
├── 📁 scripts/                 # Build scripts
├── 📄 package.json             # Package configuration
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 README.md                # This file
├── 📄 INSTALLATION.md          # Installation guide
├── 📄 LICENSE                  # MIT license
├── 📄 .eslintrc.js            # ESLint configuration
├── 📄 .prettierrc             # Prettier configuration
└── 📁 .github/                 # GitHub configurations
```

## 🔧 Advanced Features

### Smart Filtering
- **Multi-criteria filtering** with AND/OR logic
- **Text-based search** across multiple fields
- **Date range filtering** with timezone support
- **Custom field filtering** for extended data

### EU Tax Compliance
- **XRechnung support** for German e-invoices
- **EU country detection** and tax rate management
- **Distance sales support** for cross-border operations
- **Tax classification** with automatic validation

### Error Handling
- **Comprehensive error codes** with detailed messages
- **HTTP status handling** with proper error responses
- **Rate limiting** with automatic retry logic
- **Validation errors** with field-specific messages

## 📚 Documentation

- 📖 **[Installation Guide](INSTALLATION.md)** - Complete setup instructions
- 🐙 **[GitHub Installation](GITHUB_INSTALLATION.md)** - Install directly from GitHub
- 🔧 **[API Reference](README.md)** - Detailed operation documentation
- 🚀 **[Quick Start](README.md#-quick-start)** - Get up and running fast
- 🏗️ **[Project Structure](README.md#-project-structure)** - Code organization
- 📋 **[Supported Resources](README.md#-supported-resources)** - Available functionality

## 🛠️ Development

### Setup

```bash
git clone https://github.com/fwartner/n8n-nodes-lexware-office.git
cd n8n-nodes-lexware-office
npm install
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the project |
| `npm run dev` | Watch mode for development |
| `npm run clean` | Clean build artifacts |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm test` | Run tests (placeholder) |

### Building for Production

```bash
npm run clean
npm run build
npm pack --dry-run  # Test package creation
```

### Testing

```bash
# Build and test package
npm run build
npm pack --dry-run

# Verify dist folder contents
ls -la dist/
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

- 🐛 **Report Bugs**: Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)
- 💡 **Request Features**: Use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)
- 🔧 **Submit PRs**: Follow our [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)
- 📚 **Improve Docs**: Help make our documentation better

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 **Documentation**: Check our [Installation Guide](INSTALLATION.md)
- 💬 **GitHub Issues**: Report problems or request features
- 🌐 **n8n Community**: Visit the [n8n Community Forum](https://community.n8n.io)
- 📧 **Email**: Contact us at florian+npm@pixelandprocess.de

## 🌟 Why Choose This Node?

- **🔒 Enterprise Ready**: Production-grade with comprehensive error handling
- **🌍 EU Compliant**: Built-in support for European business requirements
- **📊 Comprehensive**: Covers all major Lexware Office resources
- **🚀 Performance**: Optimized with smart caching and rate limiting
- **🛡️ Reliable**: Robust error handling and validation
- **🔧 Maintainable**: Clean, well-documented TypeScript code
- **🤝 Community**: Open source with active community support

## 📊 Statistics

- **12+ Business Resources** supported
- **50+ Operations** available
- **100% TypeScript** codebase
- **MIT License** for maximum flexibility
- **Active Development** with regular updates
- **Community Driven** with open contribution

## ⭐ Star This Repository

If this project helps you, please give it a star! It motivates us to keep improving and adding new features.

## 📞 Contact

- **Author**: Florian Wartner
- **Email**: florian+npm@pixelandprocess.de
- **GitHub**: [@fwartner](https://github.com/fwartner)
- **Website**: [pixelandprocess.de](https://pixelandprocess.de)

---

**Built with ❤️ for the n8n community**
