# Installation Guide

This guide provides comprehensive instructions for installing the n8n Lexware Office Custom Node using various methods.

## 🚀 Quick Start

### Prerequisites

- **n8n**: Version 0.125.0 or higher
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Lexware Office API**: Valid API credentials

### Method 1: NPM Install (Recommended)

This is the easiest and most reliable method for most users.

```bash
# Navigate to your n8n custom nodes directory
cd ~/.n8n/custom

# Install the package
npm install @pixelandprocess_de/n8n-nodes-lexware-office

# Restart n8n to load the new node
```

**Note**: The package will be installed as `@pixelandprocess_de/n8n-nodes-lexware-office` in your custom nodes directory.

### Method 2: Manual Installation

Use this method if you want to build from source or customize the installation.

```bash
# Clone the repository
git clone https://github.com/fwartner/n8n-nodes-lexware-office.git

# Navigate to the project directory
cd n8n-nodes-lexware-office

# Install dependencies
npm install

# Build the project
npm run build

# Copy the built files to your n8n custom directory
cp -r dist ~/.n8n/custom/@pixelandprocess_de/n8n-nodes-lexware-office

# Restart n8n
```

### Method 3: Docker Installation

For Docker-based n8n deployments.

```yaml
# docker-compose.yml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
    volumes:
      - ./custom-nodes:/home/node/.n8n/custom
      - n8n_data:/home/node/.n8n
    ports:
      - "5678:5678"

volumes:
  n8n_data:
```

Then install the package in the custom-nodes directory:

```bash
# Create the custom nodes directory
mkdir -p custom-nodes

# Navigate to it
cd custom-nodes

# Install the package
npm install @pixelandprocess_de/n8n-nodes-lexware-office

# Restart the Docker container
docker-compose restart n8n
```

## 🔧 Configuration

### 1. Restart n8n

After installation, restart your n8n instance to load the new custom node.

### 2. Add Credentials

1. Go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Select **Lexware Office API** from the credential types
4. Fill in your API details:
   - **API Key**: Your Lexware Office API key
   - **Resource URL**: API base URL (e.g., `https://api.lexware.io`)

### 3. Verify Installation

1. Create a new workflow
2. Add a new node
3. Search for "Lexware Office" - it should appear in the list
4. Select it and verify the available resources and operations

## 📋 Verification Steps

### Check Package Installation

```bash
# Navigate to your n8n custom directory
cd ~/.n8n/custom

# List installed packages
ls -la

# Verify the package is installed
npm list @pixelandprocess_de/n8n-nodes-lexware-office
```

### Check Node Availability

1. In n8n, go to **Settings** → **Nodes**
2. Look for "Lexware Office" in the list
3. Verify it shows as "Active"

### Test Basic Functionality

1. Create a simple workflow with the Lexware Office node
2. Try to get a list of countries (usually doesn't require authentication)
3. Verify the node executes without errors

## 🐛 Troubleshooting

### Common Issues

#### Node Not Appearing

**Problem**: The Lexware Office node doesn't appear in the node list.

**Solutions**:
- Restart n8n after installation
- Check n8n version compatibility (requires 0.125.0+)
- Verify the package is installed in the correct directory
- Check n8n logs for any error messages

#### Credential Errors

**Problem**: Getting authentication or credential errors.

**Solutions**:
- Verify your API key is correct
- Check the Resource URL format
- Ensure your Lexware Office API account is active
- Test your credentials with a simple API call

#### Build Failures

**Problem**: Manual installation fails during build.

**Solutions**:
- Ensure Node.js 18.0.0+ is installed
- Run `npm run clean && npm run build`
- Check for TypeScript compilation errors
- Verify all dependencies are installed

#### Import Errors

**Problem**: Getting module import errors.

**Solutions**:
- Ensure the package is built correctly
- Check that all files are copied to the dist folder
- Verify the package.json main field points to the correct file
- Restart n8n after any file changes

### Debug Information

Enable debug logging in n8n:

```bash
# Set debug environment variable
export N8N_LOG_LEVEL=debug

# Or add to your n8n startup command
n8n start --log-level=debug
```

### Check Logs

```bash
# View n8n logs
tail -f ~/.n8n/logs/n8n.log

# Check for custom node errors
grep -i "lexware\|custom" ~/.n8n/logs/n8n.log
```

## 🔄 Updates

### Updating the Package

```bash
# Navigate to your n8n custom directory
cd ~/.n8n/custom

# Update the package
npm update @pixelandprocess_de/n8n-nodes-lexware-office

# Restart n8n
```

### Updating from Source

```bash
# Navigate to the project directory
cd n8n-nodes-lexware-office

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild the project
npm run build

# Copy updated files
cp -r dist ~/.n8n/custom/@pixelandprocess_de/n8n-nodes-lexware-office

# Restart n8n
```

## 🗑️ Uninstallation

### Remove the Package

```bash
# Navigate to your n8n custom directory
cd ~/.n8n/custom

# Remove the package
npm uninstall @pixelandprocess_de/n8n-nodes-lexware-office

# Or remove manually
rm -rf @pixelandprocess_de/n8n-nodes-lexware-office

# Restart n8n
```

### Clean Up Credentials

1. Go to **Settings** → **Credentials**
2. Find any "Lexware Office API" credentials
3. Delete them if no longer needed

## 🌐 Environment-Specific Notes

### Windows

- Use `%USERPROFILE%\.n8n\custom` instead of `~/.n8n/custom`
- Ensure PowerShell or Command Prompt has proper permissions
- Use forward slashes or escaped backslashes in paths

### macOS

- The `~/.n8n/custom` path should work as expected
- Ensure proper file permissions
- Use Homebrew or official Node.js installer

### Linux

- The `~/.n8n/custom` path should work as expected
- Ensure proper file permissions
- Use your distribution's package manager for Node.js

### Docker

- Mount volumes correctly for persistent custom nodes
- Use the correct user permissions in the container
- Ensure the custom nodes directory is accessible

## 📚 Additional Resources

- **[Main README](README.md)**: Complete project documentation
- **[GitHub Repository](https://github.com/fwartner/n8n-nodes-lexware-office)**: Source code and issues
- **[n8n Documentation](https://docs.n8n.io/)**: Official n8n documentation
- **[Lexware API Docs](https://developers.lexware.io/docs/)**: Official Lexware documentation

## 🆘 Getting Help

If you encounter issues:

1. **Check this guide** for common solutions
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join the n8n community** for additional support

---

**Happy automating with Lexware Office! 🎉**
