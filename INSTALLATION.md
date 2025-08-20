# Installation Guide for n8n Lexware Office Custom Node

## Prerequisites

- n8n instance running (version 0.125.0 or higher)
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

## Installation Methods

### Method 1: NPM Install (Recommended)

1. **Navigate to your n8n custom nodes directory:**
   ```bash
   cd ~/.n8n/custom
   # or on Windows: %APPDATA%\n8n\custom
   # or on Docker: /home/node/.n8n/custom
   ```

2. **Install the package:**
   ```bash
   npm install n8n-nodes-lexware-office
   ```

3. **Restart n8n:**
   ```bash
   # If running locally
   npm run start
   
   # If running with Docker
   docker restart your-n8n-container
   ```

### Method 2: Manual Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fwartner/n8n-nodes-lexware-office.git
   cd n8n-nodes-lexware-office
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the package:**
   ```bash
   npm run build
   ```

4. **Copy to n8n custom directory:**
   ```bash
   cp -r dist ~/.n8n/custom/n8n-nodes-lexware-office
   ```

5. **Restart n8n**

### Method 3: Docker Installation

1. **Add to your docker-compose.yml:**
   ```yaml
   version: '3.8'
   services:
     n8n:
       image: n8nio/n8n
       volumes:
         - ~/.n8n:/home/node/.n8n
         - ./custom-nodes:/home/node/.n8n/custom
       environment:
         - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
   ```

2. **Install the package in the custom directory:**
   ```bash
   docker exec -it your-n8n-container npm install n8n-nodes-lexware-office
   ```

## Verification

After installation, you should see:

1. **New node type available:** "Lexware Office" in the node selection
2. **New credential type:** "Lexware Office API" in credentials
3. **No errors in n8n logs**

## Configuration

### 1. Create Credentials

1. Go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Select **Lexware Office API**
4. Fill in:
   - **API Key:** Your Lexware Office API key
   - **Resource URL:** Your Lexware API base URL (e.g., `https://api.lexware.io`)

### 2. Use the Node

1. Add a new **Lexware Office** node to your workflow
2. Select the credential you created
3. Choose the resource and operation
4. Configure the parameters

## Troubleshooting

### Common Issues

1. **Node not appearing:**
   - Check n8n logs for errors
   - Verify the package is in the correct custom directory
   - Ensure n8n version compatibility

2. **Build errors:**
   - Run `npm run clean && npm run build`
   - Check TypeScript compilation errors
   - Verify all dependencies are installed

3. **Runtime errors:**
   - Check credential configuration
   - Verify API endpoint accessibility
   - Review error messages in the node execution

### Logs

Check n8n logs for detailed error information:
```bash
# Local installation
tail -f ~/.n8n/logs/n8n.log

# Docker installation
docker logs your-n8n-container
```

## Support

- **Issues:** [GitHub Issues](https://github.com/fwartner/n8n-nodes-lexware-office/issues)
- **Documentation:** [README.md](README.md)
- **Lexware API:** [Official Documentation](https://developers.lexware.io/docs/)

## Uninstallation

To remove the custom node:

1. **Stop n8n**
2. **Remove the package:**
   ```bash
   cd ~/.n8n/custom
   rm -rf n8n-nodes-lexware-office
   ```
3. **Restart n8n**

## Development

For developers who want to contribute:

1. **Fork the repository**
2. **Install development dependencies:**
   ```bash
   npm install
   ```
3. **Run in development mode:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```
