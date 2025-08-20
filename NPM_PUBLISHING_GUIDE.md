# NPM Publishing Guide

This guide provides step-by-step instructions for publishing the n8n Lexware Office Custom Node to NPM.

## 🚀 Prerequisites

### 1. NPM Account Setup

- **Create NPM Account**: [npmjs.com/signup](https://www.npmjs.com/signup)
- **Verify Email**: Confirm your email address
- **Enable 2FA**: Set up two-factor authentication for security

### 2. Package Name Verification

The package will be published as: **`@fwartner/n8n-nodes-lexware-office`**

- ✅ **Available**: This scoped package name is not taken
- ✅ **Scoped**: Uses your username as a namespace
- ✅ **Professional**: Follows NPM best practices

### 3. Local Environment

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: Properly configured with your credentials

## 🔐 Authentication

### 1. Login to NPM

```bash
# Login to your NPM account
npm login

# Enter your credentials when prompted:
# - Username: fwartner
# - Password: [your password]
# - Email: florian+npm@pixelandprocess.de
# - 2FA Code: [from your authenticator app]
```

### 2. Verify Authentication

```bash
# Check who you're logged in as
npm whoami

# Should return: fwartner
```

### 3. Check Package Access

```bash
# Verify you can publish to the scope
npm access list packages

# Should show your packages or empty list
```

## 📦 Package Preparation

### 1. Verify Package Configuration

Check that your `package.json` has the correct settings:

```json
{
  "name": "@fwartner/n8n-nodes-lexware-office",
  "version": "1.0.0",
  "publishConfig": {
    "access": "public"
  },
  "files": [
    "dist/**/*"
  ]
}
```

### 2. Build the Package

```bash
# Clean previous builds
npm run clean

# Build the project
npm run build

# Verify the build
ls -la dist/
```

### 3. Test Package Creation

```bash
# Create a test package (dry run)
npm pack --dry-run

# Verify package contents
# Should show 37 files including all dist/ content
```

### 4. Check Package Size

```bash
# The package should be:
# - Package size: ~65-70 kB
# - Unpacked size: ~580-590 kB
# - Total files: 37
```

## 🚀 Publishing Process

### 1. First-Time Publishing

```bash
# Publish the package
npm publish

# This will:
# - Run prepublishOnly script (clean + build)
# - Create the package tarball
# - Upload to NPM registry
# - Make it publicly available
```

### 2. Verify Publication

```bash
# Check if the package is published
npm view @fwartner/n8n-nodes-lexware-office

# Should show package details including:
# - Version: 1.0.0
# - Description: n8n node for Lexware Office API integration
# - License: MIT
# - Author: Florian Wartner
```

### 3. Test Installation

```bash
# Test installing the published package
cd /tmp
npm install @fwartner/n8n-nodes-lexware-office

# Verify installation
ls -la node_modules/@fwartner/n8n-nodes-lexware-office/
```

## 🔄 Updating the Package

### 1. Version Management

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### 2. Update Version

```bash
# Update version in package.json
npm version patch    # 1.0.0 → 1.0.1
npm version minor    # 1.0.0 → 1.1.0
npm version major    # 1.0.0 → 2.0.0

# Or manually edit package.json
```

### 3. Publish Update

```bash
# Build and publish
npm run build
npm publish

# The new version will be available immediately
```

## 🛡️ Security Considerations

### 1. Package Security

- **Files Field**: Only `dist/**/*` is included (no source code)
- **Dependencies**: Minimal production dependencies
- **License**: MIT license for maximum compatibility
- **Access**: Public package for community use

### 2. Credential Security

- **No API Keys**: No hardcoded credentials in the package
- **Environment Variables**: Use proper credential management
- **n8n Integration**: Leverages n8n's credential system

### 3. Dependency Security

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities (if any)
npm audit fix

# For production, consider:
npm audit --audit-level=moderate
```

## 📊 Post-Publication

### 1. NPM Registry

- **Package Page**: [npmjs.com/package/@fwartner/n8n-nodes-lexware-office](https://www.npmjs.com/package/@fwartner/n8n-nodes-lexware-office)
- **Downloads**: Track package usage statistics
- **Dependents**: Monitor who uses your package

### 2. GitHub Integration

- **Releases**: Create GitHub releases for each NPM version
- **CI/CD**: GitHub Actions will automatically publish on release
- **Documentation**: Keep README and docs up to date

### 3. Community Engagement

- **Issues**: Monitor and respond to GitHub issues
- **Pull Requests**: Review and merge community contributions
- **Discussions**: Engage with users and contributors

## 🐛 Troubleshooting

### Common Issues

#### Authentication Errors

```bash
# Problem: npm login fails
npm logout
npm login

# Problem: 2FA issues
# Ensure your authenticator app is synced
# Check system time is correct
```

#### Publishing Errors

```bash
# Problem: Package name already exists
# Solution: Use the scoped name @fwartner/n8n-nodes-lexware-office

# Problem: Access denied
# Solution: Ensure you're logged in as fwartner
npm whoami

# Problem: Build fails during publish
# Solution: Test build locally first
npm run build
```

#### Package Issues

```bash
# Problem: Wrong files included
# Solution: Check package.json "files" field
npm pack --dry-run

# Problem: Package too large
# Solution: Review what's in dist/ folder
du -sh dist/
```

## 🔧 Automation

### 1. GitHub Actions

The CI/CD pipeline includes automatic publishing:

```yaml
# .github/workflows/ci.yml
deploy:
  if: github.event_name == 'release' && github.event.action == 'published'
  steps:
    - name: Publish to NPM
      run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 2. NPM Token Setup

1. **Generate Token**: [npmjs.com/tokens](https://www.npmjs.com/tokens)
2. **Add to GitHub**: Settings → Secrets → NPM_TOKEN
3. **Token Permissions**: Read and Publish

### 3. Release Process

```bash
# Create a new release on GitHub
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions will automatically:
# - Build the package
# - Run tests
# - Publish to NPM
```

## 📈 Monitoring

### 1. NPM Statistics

- **Downloads**: Track daily/weekly/monthly downloads
- **Dependents**: See who depends on your package
- **Versions**: Monitor version adoption

### 2. GitHub Insights

- **Traffic**: Repository views and clones
- **Issues**: Bug reports and feature requests
- **Contributions**: Community engagement

### 3. Performance Metrics

- **Package Size**: Keep it optimized
- **Install Time**: Monitor installation performance
- **Dependency Health**: Regular security audits

## 🎯 Best Practices

### 1. Version Management

- **Semantic Versioning**: Follow semver strictly
- **Changelog**: Maintain detailed changelog
- **Release Notes**: Clear communication of changes

### 2. Quality Assurance

- **Testing**: Ensure package works before publishing
- **Documentation**: Keep README and docs current
- **Examples**: Provide usage examples

### 3. Community

- **Responsiveness**: Respond to issues promptly
- **Transparency**: Clear communication about changes
- **Support**: Help users with problems

## 🚀 Next Steps

After successful publication:

1. **Announce**: Share on social media and n8n community
2. **Document**: Update installation guides and examples
3. **Monitor**: Track usage and gather feedback
4. **Iterate**: Plan next version based on user needs

## 📚 Resources

- **[NPM Documentation](https://docs.npmjs.com/)**: Official NPM guides
- **[Semantic Versioning](https://semver.org/)**: Version numbering standards
- **[n8n Community](https://community.n8n.io/)**: Community support
- **[GitHub Actions](https://docs.github.com/en/actions)**: CI/CD automation

---

**Happy publishing! 🎉**

Your package will be available at: `https://www.npmjs.com/package/@fwartner/n8n-nodes-lexware-office`
