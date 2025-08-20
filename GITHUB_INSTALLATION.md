# GitHub Installation Guide

This guide shows you how to install the n8n Lexware Office Custom Node directly from GitHub.

## 🚀 Quick GitHub Installation

### Prerequisites

- **n8n**: Version 0.125.0 or higher
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: Installed on your system

### Method 1: Clone and Build (Recommended for GitHub Users)

```bash
# Navigate to your n8n custom nodes directory
cd ~/.n8n/custom

# Clone the repository
git clone https://github.com/fwartner/n8n-nodes-lexware-office.git

# Navigate to the project
cd n8n-nodes-lexware-office

# Install dependencies
npm install

# Build the project
npm run build

# Copy the built files to the correct location
cp -r dist ../@pixelandprocess_de/n8n-nodes-lexware-office

# Go back to custom directory
cd ..

# Remove the source directory (optional)
rm -rf n8n-nodes-lexware-office

# Restart n8n
```

### Method 2: Direct GitHub Install

```bash
# Navigate to your n8n custom nodes directory
cd ~/.n8n/custom

# Install directly from GitHub
npm install fwartner/n8n-nodes-lexware-office

# Restart n8n
```

### Method 3: Download ZIP and Build

1. **Download**: Go to [GitHub Repository](https://github.com/fwartner/n8n-nodes-lexware-office)
2. **Download ZIP**: Click the green "Code" button → "Download ZIP"
3. **Extract**: Extract the ZIP file to your custom nodes directory
4. **Build**: Follow the build steps from Method 1

## 🔧 Post-Installation

### 1. Restart n8n

After installation, restart your n8n instance to load the new custom node.

### 2. Verify Installation

1. Go to **Settings** → **Nodes**
2. Look for "Lexware Office" in the list
3. Verify it shows as "Active"

### 3. Add Credentials

1. Go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Select **Lexware Office API**
4. Fill in your Lexware Office API details

## 🔄 Keeping Updated

### Update from GitHub

```bash
# Navigate to the cloned directory
cd ~/.n8n/custom/n8n-nodes-lexware-office

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild the project
npm run build

# Copy updated files
cp -r dist ../@pixelandprocess_de/n8n-nodes-lexware-office

# Restart n8n
```

### Check for Updates

```bash
# Check if there are updates
git fetch origin
git status

# If there are updates, pull them
git pull origin main
```

## 🐛 Troubleshooting

### Common Issues

#### Build Failures

**Problem**: `npm run build` fails

**Solutions**:
- Ensure Node.js 18.0.0+ is installed
- Check that all dependencies are installed: `npm install`
- Verify TypeScript is working: `npx tsc --version`

#### Node Not Appearing

**Problem**: Node doesn't appear in n8n

**Solutions**:
- Verify the files are in the correct location
- Check that the build was successful
- Restart n8n after installation
- Check n8n logs for errors

#### Permission Issues

**Problem**: Permission denied errors

**Solutions**:
- Use `sudo` for system-wide installations
- Check file permissions: `ls -la ~/.n8n/custom`
- Ensure you own the custom nodes directory

### Debug Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check if the package is built
ls -la ~/.n8n/custom/@pixelandprocess_de/n8n-nodes-lexware-office/

# Check n8n logs
tail -f ~/.n8n/logs/n8n.log
```

## 📚 Alternative Installation Methods

### NPM Install (Easiest)

If you prefer not to build from source:

```bash
cd ~/.n8n/custom
npm install @pixelandprocess_de/n8n-nodes-lexware-office
```

### Docker Installation

For Docker users, see the main [Installation Guide](INSTALLATION.md).

## 🌟 Benefits of GitHub Installation

- **Latest Features**: Get the newest features before NPM release
- **Custom Modifications**: Ability to modify the code if needed
- **Development Version**: Access to development branches
- **Source Code Access**: Full access to the source code
- **Contribution Ready**: Easy to contribute back to the project

## 🆘 Need Help?

- **GitHub Issues**: [Create an issue](https://github.com/fwartner/n8n-nodes-lexware-office/issues)
- **GitHub Discussions**: [Join discussions](https://github.com/fwartner/n8n-nodes-lexware-office/discussions)
- **Documentation**: Check the main [README](README.md) and [Installation Guide](INSTALLATION.md)

---

**Happy coding with GitHub! 🎉**
