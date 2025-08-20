# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup and structure
- Comprehensive documentation
- Contributing guidelines
- Code of conduct

## [1.0.0] - 2025-01-20

### Added
- **Initial Release**: Comprehensive Lexware Office API support
- **Full Resource Coverage**: Support for all major resource types
  - Articles: Product and service management
  - Contacts: Customer and vendor management
  - Countries: Geographic and tax information with EU compliance
  - Invoices: Full lifecycle management with status tracking
  - Orders: Order confirmation and document generation
  - Payments: Payment processing and tracking
  - Quotations: Quote management and conversion
  - Vouchers: Accounting voucher handling
  - Files: Document management and metadata
  - Dunnings: Payment reminder management
  - Delivery Notes: Delivery tracking and management
  - Credit Notes: Credit and refund management
  - Down Payment Invoices: Partial payment handling
  - Event Subscriptions: Webhook and event management
  - Payment Conditions: Payment terms and conditions
  - Posting Categories: Accounting categorization
  - Print Layouts: Document formatting and templates
  - Profiles: User and system profiles
  - Recurring Templates: Automated recurring operations

### Features
- **Advanced Operations**: Create, read, update, delete, and specialized operations
- **Smart Filtering**: Multi-criteria filtering and text-based search
- **EU Tax Compliance**: Built-in support for EU tax requirements
  - XRechnung support for German e-invoices
  - EU country detection and tax rate management
  - Distance sales support for cross-border operations
  - Tax classification with automatic validation
- **Status Management**: Comprehensive status tracking and transitions
- **Document Generation**: PDF rendering and file download support
- **Rate Limiting**: Automatic API rate limit handling (2 requests/second)
- **Error Handling**: Comprehensive error management and validation
- **Type Safety**: Full TypeScript support with comprehensive interfaces

### Technical
- **Modern Architecture**: Clean, maintainable codebase with proper separation of concerns
- **Resource Factory Pattern**: Dynamic resource creation and management
- **Optimistic Locking**: Support for concurrent access and conflict resolution
- **HTTP Status Handling**: Comprehensive HTTP status code management
- **Error Code Mapping**: Detailed error codes and messages
- **API Utilities**: Reusable API interaction patterns
- **Data Transformers**: Consistent data transformation and validation

### Documentation
- **Installation Guide**: Step-by-step setup for all environments
- **API Reference**: Complete API documentation with examples
- **Resource Guides**: Detailed documentation for each resource type
- **Troubleshooting**: Common issues and solutions
- **Contributing Guidelines**: Comprehensive contribution guide
- **Code of Conduct**: Community standards and guidelines

### Build System
- **TypeScript Compilation**: Full TypeScript support with proper configuration
- **Asset Management**: Optimized asset copying and management
- **Build Scripts**: Clean, build, and development workflows
- **Pre-publish Hooks**: Automatic build before publishing

## [0.1.0] - 2025-01-19

### Added
- Project initialization
- Basic TypeScript setup
- Initial node structure
- Basic credential handling

---

## Version History

- **1.0.0**: Initial public release with comprehensive Lexware Office API support
- **0.1.0**: Project initialization and basic setup

## Release Notes

### Version 1.0.0
This is the initial public release of the n8n Lexware Office Custom Node. It provides comprehensive integration with the Lexware Office API, supporting all major business resources and operations. The node is built with enterprise-grade features including advanced filtering, EU tax compliance, comprehensive error handling, and professional documentation.

### Key Highlights
- **12+ Business Resources**: Complete coverage of Lexware Office functionality
- **50+ Operations**: Extensive operation support for all resource types
- **EU Compliance**: Built-in support for European business requirements
- **Professional Quality**: Production-ready with comprehensive error handling
- **Open Source**: MIT licensed and community-driven

---

## Contributing to the Changelog

When adding new entries to the changelog, please follow these guidelines:

1. **Use the appropriate section**: Added, Changed, Deprecated, Removed, Fixed, Security
2. **Be descriptive**: Explain what changed and why
3. **Include version numbers**: Always specify the version for new entries
4. **Follow the format**: Use consistent formatting and structure
5. **Group related changes**: Group similar changes together

## Links

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Releases](https://github.com/fwartner/n8n-nodes-lexware-office/releases)
