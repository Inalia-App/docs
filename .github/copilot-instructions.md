# Inalia Documentation Site

Inalia is a VitePress documentation site for the Inalia presentation tool that helps make talks more engaging with real-time interactions. The documentation focuses on getting started guides and integration with Slidev presentations.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Setup
- Install Node.js v20+ if not available: Node.js v20.19.4 is verified to work
- Install pnpm globally: `npm install -g pnpm`
- Verify pnpm version: `pnpm --version` (should be 10.14.0 or compatible)

### Bootstrap, Build, and Test the Repository
- Install dependencies: `pnpm install` -- takes ~6 seconds, very fast
- Build the documentation: `pnpm run build` -- takes 4-5 seconds, EXTREMELY fast build
- Start development server: `pnpm run dev` -- serves on http://localhost:5174 (or another port if 5173 is taken)
- Preview built site: `pnpm run preview` -- serves built content on http://localhost:4173

### Development Workflow
- ALWAYS run `pnpm install` first after cloning or when package.json changes
- Use `pnpm run dev` for active development with hot reload
- Use `pnpm run build` to generate static files in `.vitepress/dist` (1.1M output size)
- Use `pnpm run preview` to test the built site before deployment

## Validation

### Manual Validation Requirements
After making any content or configuration changes, ALWAYS manually validate by:

1. **Build Validation**: Run `pnpm run build` and verify it completes without errors
2. **Development Server Test**: 
   - Start `pnpm run dev`
   - Open http://localhost:5174 in browser
   - Navigate to all pages to ensure they load correctly
3. **Content Validation Scenarios**:
   - **Homepage**: Verify hero section displays "Inalia" title and navigation works
   - **Getting Started**: Check page loads (currently minimal content, just heading)
   - **Static Mode**: Verify full content displays including code examples for Slidev integration
   - **Navigation**: Test all internal and external links work correctly
4. **Preview Server Test**: Run `pnpm run preview` and test built version

### Critical Timing Information
- `pnpm install`: ~6 seconds - FAST, no cancellation needed
- `pnpm run build`: ~4-5 seconds - EXTREMELY FAST, no cancellation needed  
- `pnpm run dev`: Starts in ~2-3 seconds
- `pnpm run preview`: Starts immediately after build

**NOTE**: This project has exceptionally fast build times. No long-running operations that require "NEVER CANCEL" warnings.

## Project Structure and Navigation

### Key Files and Directories
```
/
├── .github/
│   └── prompts/correct.prompt.md    # Documentation correction prompts
├── .vitepress/
│   ├── config.mts                   # VitePress configuration
│   ├── dist/                        # Build output (generated)
│   └── cache/                       # Build cache (generated)
├── .vscode/settings.json            # VS Code spell check config
├── index.md                         # Homepage content
├── getting-started.md               # Getting started guide (minimal)
├── static-mode.md                   # Static mode documentation (full content)
├── package.json                     # Dependencies and scripts
└── pnpm-lock.yaml                   # Locked dependency versions
```

### Content Structure
- **Homepage** (`index.md`): Hero layout with navigation to getting started and Inalia app
- **Getting Started** (`getting-started.md`): Currently contains only heading, ready for expansion
- **Static Mode** (`static-mode.md`): Complete guide for exporting Inalia data to Slidev slides

### Configuration Files
- `.vitepress/config.mts`: Site title, description, navigation, and Plausible analytics
- `package.json`: Only 3 scripts (dev, build, preview) with VitePress and TypeScript deps
- No linting, testing, or formatting configuration currently exists

## Common Tasks

### Adding New Documentation Pages
1. Create new `.md` file in root directory
2. Add navigation link in `.vitepress/config.mts` under `themeConfig.nav`
3. Follow existing content structure and markdown format
4. Always test with `pnpm run dev` and validate all links work

### Modifying Existing Content
1. Edit the relevant `.md` file
2. Check formatting matches existing style (see `static-mode.md` for reference)
3. Validate with development server: `pnpm run dev`
4. Test build process: `pnpm run build`

### Configuration Changes
- Site metadata: Edit `.vitepress/config.mts`
- Navigation: Update `themeConfig.nav` array in config
- Dependencies: Use `pnpm add <package>` or `pnpm add -D <package>`

### No Testing/Linting Infrastructure
- No unit tests, integration tests, or automated testing exists
- No ESLint, Prettier, or code formatting tools configured  
- No GitHub workflows or CI/CD pipelines currently set up
- Validation relies entirely on manual testing and build verification

## Troubleshooting

### Common Issues
- **Port conflicts**: Dev server will automatically try alternative ports (5174, 5175, etc.)
- **Build errors**: Usually related to markdown syntax or broken links
- **Missing dependencies**: Run `pnpm install` to ensure all packages are installed
- **Cache issues**: Delete `.vitepress/cache` directory and rebuild

### Development Server Not Starting
1. Check if port 5173 is in use (server will auto-select alternative)
2. Verify `pnpm install` completed successfully
3. Check for syntax errors in `.vitepress/config.mts`

### Build Failures
1. Verify all markdown files have valid syntax
2. Check that all internal links use correct paths
3. Ensure all referenced files exist in the repository

## External Dependencies and Links

The site integrates with:
- **Slidev**: For presentation building and hosting
- **GitHub Examples**: Links to https://github.com/inalia-app/examples
- **Plausible Analytics**: Configured for docs.inalia.app domain
- **Inalia App**: Main application at https://inalia.app

Always verify external links are accessible when making changes to content.