# Contributing to n8n Lexware Office Custom Node

Thank you for your interest in contributing to the n8n Lexware Office Custom Node! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

We welcome contributions from the community! There are many ways to contribute:

- 🐛 **Bug Reports**: Report bugs and issues
- 💡 **Feature Requests**: Suggest new features and improvements
- 📚 **Documentation**: Improve or add documentation
- 🔧 **Code Contributions**: Submit code changes and improvements
- 🧪 **Testing**: Test the node and report findings
- 💬 **Discussions**: Participate in community discussions

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- n8n 0.125.0 or higher
- Git

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/n8n-nodes-lexware-office.git
   cd n8n-nodes-lexware-office
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/fwartner/n8n-nodes-lexware-office.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Build the project**:
   ```bash
   npm run build
   ```

### Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** and test thoroughly
3. **Commit your changes** with clear commit messages:
   ```bash
   git commit -m "feat: add new resource type support"
   ```
4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a pull request** on GitHub

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```bash
feat: add support for new Lexware API endpoint
fix: resolve rate limiting issue with concurrent requests
docs: update installation guide for Docker users
refactor: improve error handling in resource factory
test: add unit tests for country filtering
```

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Naming**: Use descriptive names for variables, functions, and classes
- **Comments**: Add JSDoc comments for public APIs

### Architecture Principles

- **Separation of Concerns**: Keep business logic separate from UI logic
- **Single Responsibility**: Each class/function should have one clear purpose
- **Dependency Injection**: Use dependency injection for better testability
- **Error Handling**: Implement comprehensive error handling
- **Validation**: Validate all inputs and provide clear error messages

### Testing

- **Unit Tests**: Write unit tests for new functionality
- **Integration Tests**: Test API integrations
- **Error Scenarios**: Test error handling and edge cases
- **Coverage**: Aim for high test coverage

### Example Test Structure

```typescript
describe('CountryResource', () => {
  describe('getAll', () => {
    it('should return all countries when no filter is applied', async () => {
      // Test implementation
    });

    it('should filter countries by EU membership', async () => {
      // Test implementation
    });

    it('should handle API errors gracefully', async () => {
      // Test implementation
    });
  });
});
```

## 📚 Documentation Standards

### README Updates

- **Clear Examples**: Provide practical examples for all features
- **Code Snippets**: Include working code snippets
- **Screenshots**: Add screenshots for complex configurations
- **Troubleshooting**: Include common issues and solutions

### API Documentation

- **JSDoc Comments**: Use JSDoc for all public methods
- **Parameter Descriptions**: Clearly describe all parameters
- **Return Values**: Document return values and types
- **Examples**: Provide usage examples

### Example JSDoc

```typescript
/**
 * Retrieves countries based on specified filters
 * @param options - Filter options for countries
 * @param options.countryFilter - Type of country filter to apply
 * @param options.taxTypeFilter - Optional tax type filter
 * @param options.dateFilter - Optional date for tax rate validation
 * @returns Promise resolving to filtered country list
 * @throws {ValidationError} When invalid filter options are provided
 * @throws {ApiError} When the API request fails
 */
async getAll(options: CountryFilterOptions): Promise<Country[]> {
  // Implementation
}
```

## 🐛 Bug Reports

### Before Reporting

1. **Check existing issues** to see if the bug has already been reported
2. **Test with latest version** to ensure the issue still exists
3. **Check documentation** to ensure you're using the feature correctly

### Bug Report Template

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- n8n version: [e.g., 0.125.0]
- Node.js version: [e.g., 18.0.0]
- Operating System: [e.g., macOS 14.0]
- Lexware Office API version: [e.g., v1]

## Additional Information
Any additional context, logs, or screenshots
```

## 💡 Feature Requests

### Feature Request Guidelines

- **Clear Description**: Explain what you want to achieve
- **Use Case**: Describe the specific use case or problem
- **Examples**: Provide examples of how the feature would work
- **Priority**: Indicate if this is a high, medium, or low priority

### Feature Request Template

```markdown
## Feature Description
Brief description of the requested feature

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How would you like this feature to work?

## Use Cases
Describe specific scenarios where this feature would be useful

## Examples
Provide examples of how the feature would be used

## Priority
High/Medium/Low priority for your use case
```

## 🔄 Pull Request Process

### Before Submitting

1. **Test thoroughly** - Ensure all tests pass
2. **Update documentation** - Update relevant documentation
3. **Follow commit guidelines** - Use conventional commit messages
4. **Check formatting** - Run Prettier and ESLint

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Documentation updated

## Checklist
- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation made
- [ ] No new warnings generated
- [ ] Tests added that prove the fix is effective or that the feature works
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and checks
2. **Code Review**: Maintainers review the code
3. **Feedback**: Address any feedback or requested changes
4. **Merge**: Once approved, the PR will be merged

## 🏗️ Project Structure

### Key Directories

- **`nodes/`**: Node implementations
- **`credentials/`**: Credential type definitions
- **`resources/`**: API resource handlers
- **`utils/`**: Utility functions and helpers
- **`types/`**: TypeScript type definitions
- **`constants/`**: Constants and enums
- **`scripts/`**: Build and utility scripts

### Adding New Resources

1. **Create resource file** in `resources/` directory
2. **Implement resource class** with CRUD operations
3. **Add to resource factory** in `resources/ResourceFactory.ts`
4. **Update node implementation** to include new resource
5. **Add tests** for the new resource
6. **Update documentation** with examples

### Example Resource Structure

```typescript
export class NewResource extends BaseResource {
  constructor(api: LexwareApi) {
    super(api, 'new-resource');
  }

  async get(id: string): Promise<NewResourceType> {
    // Implementation
  }

  async getAll(options?: GetAllOptions): Promise<NewResourceType[]> {
    // Implementation
  }

  async create(data: CreateNewResourceData): Promise<NewResourceType> {
    // Implementation
  }

  // Additional methods...
}
```

## 🧪 Testing Guidelines

### Test Structure

- **Unit Tests**: Test individual functions and methods
- **Integration Tests**: Test API integrations and workflows
- **Error Tests**: Test error handling and edge cases
- **Performance Tests**: Test performance under load

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "CountryResource"
```

### Test Best Practices

- **Isolation**: Each test should be independent
- **Descriptive Names**: Use clear, descriptive test names
- **Setup/Teardown**: Properly set up and clean up test data
- **Mocking**: Mock external dependencies appropriately
- **Assertions**: Use clear, specific assertions

## 📋 Code Review Checklist

### For Contributors

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console.log statements left in code
- [ ] Error handling is implemented
- [ ] Input validation is added
- [ ] Performance considerations are addressed

### For Reviewers

- [ ] Code is readable and maintainable
- [ ] Tests cover the new functionality
- [ ] Documentation is clear and accurate
- [ ] Security considerations are addressed
- [ ] Performance impact is acceptable
- [ ] Error handling is robust

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Changelog is updated
- [ ] Version is bumped
- [ ] Release notes are prepared
- [ ] NPM package is published

## 🤝 Community Guidelines

### Communication

- **Be respectful** and inclusive
- **Ask questions** when you need clarification
- **Provide constructive feedback**
- **Help others** when you can

### Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Pull Requests**: For code contributions
- **Documentation**: Start with the README and installation guide

## 📞 Contact

- **Maintainer**: Florian Wartner
- **Email**: florian@pixelandprocess.de
- **GitHub**: [@fwartner](https://github.com/fwartner)

## 🙏 Acknowledgments

Thank you to all contributors who have helped make this project better! Your contributions are greatly appreciated.

---

**Happy contributing! 🎉**
