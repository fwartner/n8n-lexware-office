# GitHub Configuration

This directory contains GitHub-specific configuration files for the n8n Lexware Office Custom Node project.

## 📁 Directory Structure

```
.github/
├── ISSUE_TEMPLATE/           # Issue templates for bug reports and feature requests
│   ├── bug_report.md        # Template for bug reports
│   └── feature_request.md   # Template for feature requests
├── PULL_REQUEST_TEMPLATE.md # Template for pull requests
├── workflows/               # GitHub Actions workflows
│   └── ci.yml              # CI/CD pipeline configuration
├── FUNDING.yml             # GitHub Sponsors configuration
└── README.md               # This file
```

## 🐛 Issue Templates

### Bug Report Template
- **File**: `ISSUE_TEMPLATE/bug_report.md`
- **Purpose**: Standardized template for reporting bugs
- **Features**: Environment details, reproduction steps, debug information
- **Labels**: Automatically adds `bug` and `needs-triage` labels

### Feature Request Template
- **File**: `ISSUE_TEMPLATE/feature_request.md`
- **Purpose**: Standardized template for requesting new features
- **Features**: Problem statement, use cases, examples, priority levels
- **Labels**: Automatically adds `enhancement` and `needs-triage` labels

## 🔄 Pull Request Template

- **File**: `PULL_REQUEST_TEMPLATE.md`
- **Purpose**: Comprehensive template for pull requests
- **Features**: Change type selection, testing checklist, code review guidelines
- **Sections**: Description, testing, checklist, documentation updates

## 🚀 GitHub Actions Workflows

### CI/CD Pipeline (`workflows/ci.yml`)

#### Jobs

1. **Test Job**
   - Runs on Ubuntu with Node.js 18.x and 20.x
   - Installs dependencies, runs linting, tests, and builds
   - Tests package creation

2. **Security Job**
   - Runs security audit with npm
   - Integrates with Snyk for vulnerability scanning
   - Requires test job to pass first

3. **Deploy Job**
   - Triggers on release publication
   - Publishes to NPM registry
   - Requires test and security jobs to pass

4. **Documentation Job**
   - Checks documentation links
   - Validates markdown formatting
   - Ensures documentation quality

5. **Code Quality Job**
   - TypeScript compiler checks
   - Code formatting validation
   - ESLint compliance
   - Bundle size monitoring

#### Triggers

- **Push**: Triggers on pushes to `main` and `develop` branches
- **Pull Request**: Triggers on PRs to `main` and `develop` branches
- **Release**: Triggers on release publication

## 💰 Funding Configuration

- **File**: `FUNDING.yml`
- **Purpose**: Configure GitHub Sponsors and other funding platforms
- **Current**: GitHub Sponsors enabled for `@fwartner`
- **Customizable**: Easy to add other funding platforms

## 🔧 Configuration Details

### Issue Templates

#### Bug Report Features
- Environment information collection
- Reproduction steps
- Debug information sections
- Screenshot support
- Checklist for completeness

#### Feature Request Features
- Problem statement
- Proposed solution
- Use case examples
- Priority levels
- Mockup/screenshot support

### Pull Request Template

#### Sections
- Change type selection
- Related issue linking
- Testing verification
- Code review checklist
- Documentation updates
- Deployment notes

### CI/CD Pipeline

#### Node.js Versions
- **18.x**: LTS version for compatibility
- **20.x**: Latest LTS for testing

#### Security Features
- **npm audit**: Dependency vulnerability scanning
- **Snyk integration**: Advanced security analysis
- **Moderate threshold**: Balanced security vs. false positives

#### Quality Gates
- **Tests must pass**: All unit and integration tests
- **Security scan clean**: No high-severity vulnerabilities
- **Build successful**: TypeScript compilation and asset building
- **Documentation valid**: Links and formatting checks

## 🚀 Getting Started

### For Contributors

1. **Create Issues**: Use the provided templates for bugs and features
2. **Submit PRs**: Follow the pull request template guidelines
3. **Follow CI**: Ensure all CI checks pass before requesting review

### For Maintainers

1. **Review Issues**: Use labels and templates for organization
2. **Monitor CI**: Check pipeline status for all PRs
3. **Manage Releases**: Use GitHub releases to trigger deployment

### For Users

1. **Report Bugs**: Use the bug report template for detailed information
2. **Request Features**: Use the feature request template for clear communication
3. **Follow Progress**: Monitor issues and PRs for updates

## 🔄 Workflow Customization

### Adding New Jobs

1. **Define job requirements**: Dependencies and conditions
2. **Add to workflow file**: Include in appropriate trigger conditions
3. **Update documentation**: Document new job purpose and requirements

### Modifying Templates

1. **Edit template files**: Update markdown content
2. **Test changes**: Verify template rendering
3. **Update documentation**: Reflect changes in this README

### Adding New Workflows

1. **Create workflow file**: Use appropriate naming convention
2. **Define triggers**: Specify when workflow should run
3. **Configure jobs**: Set up required steps and conditions

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Issue Templates Guide](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)
- [Pull Request Templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)
- [GitHub Sponsors](https://docs.github.com/en/sponsors)

## 🤝 Contributing

To improve these GitHub configurations:

1. **Submit Issues**: Use the provided templates
2. **Create PRs**: Follow the pull request template
3. **Test Changes**: Ensure workflows and templates work correctly
4. **Update Documentation**: Keep this README current

---

**These configurations help maintain project quality and streamline contributions! 🎉**
