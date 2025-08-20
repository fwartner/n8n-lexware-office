# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please DO NOT create a public GitHub issue for security vulnerabilities.**

Instead, please report security vulnerabilities via email to:

**Email**: [florian@pixelandprocess.de](mailto:florian@pixelandprocess.de)

**Subject**: `[SECURITY] n8n-nodes-lexware-office - [Brief Description]`

### What to Include

When reporting a security vulnerability, please include:

1. **Description**: A clear description of the vulnerability
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Impact**: Potential impact of the vulnerability
4. **Environment**: Your environment details (OS, Node.js version, n8n version)
5. **Proof of Concept**: If possible, include a proof of concept
6. **Suggested Fix**: If you have suggestions for fixing the issue

### Example Report

```
Subject: [SECURITY] n8n-nodes-lexware-office - Potential XSS in error message display

Description:
The error message display in the node interface may be vulnerable to XSS attacks
when displaying user-provided error messages from the Lexware API.

Steps to Reproduce:
1. Configure the node with malicious API response
2. Trigger an error condition
3. Observe potential XSS execution in error display

Impact:
Low - Limited to error message display, no data access

Environment:
- OS: Ubuntu 22.04
- Node.js: 18.17.0
- n8n: 0.125.0

Proof of Concept:
[Include code or steps if available]

Suggested Fix:
Sanitize error messages before display using DOMPurify or similar library.
```

## Response Timeline

We aim to respond to security reports within **48 hours** and provide regular updates on the status of reported vulnerabilities.

### Response Process

1. **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
2. **Investigation**: Our team will investigate the reported vulnerability
3. **Assessment**: We will assess the severity and impact of the vulnerability
4. **Fix Development**: If confirmed, we will develop a fix
5. **Testing**: The fix will be thoroughly tested
6. **Release**: A security update will be released
7. **Disclosure**: We will publicly disclose the vulnerability (with your permission)

## Severity Levels

We use the following severity levels to classify security vulnerabilities:

### Critical
- **Impact**: Complete system compromise, data breach, or service disruption
- **Response**: Immediate fix and release (within 24-48 hours)
- **Examples**: Remote code execution, authentication bypass, data exposure

### High
- **Impact**: Significant security impact, potential data access
- **Response**: Fix within 1 week
- **Examples**: Privilege escalation, unauthorized data access

### Medium
- **Impact**: Limited security impact, potential information disclosure
- **Response**: Fix within 2 weeks
- **Examples**: Information disclosure, limited data access

### Low
- **Impact**: Minimal security impact, mostly informational
- **Response**: Fix within 1 month
- **Examples**: Minor information disclosure, security headers

## Security Best Practices

### For Users

1. **Keep Updated**: Always use the latest version of the node
2. **Secure Credentials**: Store API credentials securely
3. **Network Security**: Use HTTPS for all API communications
4. **Access Control**: Limit access to n8n instances
5. **Monitoring**: Monitor for unusual activity

### For Developers

1. **Input Validation**: Always validate and sanitize inputs
2. **Output Encoding**: Properly encode outputs to prevent XSS
3. **Authentication**: Implement proper authentication checks
4. **Error Handling**: Don't expose sensitive information in errors
5. **Dependencies**: Keep dependencies updated

## Security Features

### Built-in Security

- **Credential Encryption**: API credentials are encrypted at rest
- **Input Validation**: Comprehensive input validation and sanitization
- **Error Sanitization**: Error messages are sanitized before display
- **Rate Limiting**: Built-in API rate limiting to prevent abuse
- **HTTPS Enforcement**: Enforces HTTPS for all API communications

### Security Headers

The node implements appropriate security headers and follows security best practices:

- **Content Security Policy**: Prevents XSS attacks
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Referrer Policy**: Controls referrer information

## Responsible Disclosure

We believe in responsible disclosure of security vulnerabilities. Our policy is to:

1. **Acknowledge** security researchers who report vulnerabilities
2. **Credit** contributors in security advisories (with permission)
3. **Coordinate** disclosure with affected parties
4. **Provide** clear guidance on fixes and updates
5. **Learn** from each vulnerability to improve security

## Security Updates

Security updates are released as:

- **Patch releases** (e.g., 1.0.1) for low to medium severity issues
- **Minor releases** (e.g., 1.1.0) for high severity issues
- **Major releases** (e.g., 2.0.0) for critical issues or breaking changes

## Contact Information

For security-related questions or concerns:

- **Security Email**: [florian@pixelandprocess.de](mailto:florian@pixelandprocess.de)
- **GitHub Security**: [GitHub Security Advisories](https://github.com/fwartner/n8n-nodes-lexware-office/security/advisories)
- **PGP Key**: Available upon request for encrypted communications

## Acknowledgments

We would like to thank the security researchers and community members who help us maintain the security of this project through responsible disclosure and security testing.

## Security Policy Updates

This security policy may be updated from time to time. Significant changes will be announced through:

- GitHub releases
- Security advisories
- Community announcements

---

**Thank you for helping keep our community secure! 🔒**
