interface ProjectInfo {
  projectName: string;
  description: string;
  author: string;
  features: string[];
}

export function generateReadme(info: ProjectInfo): string {
  const featuresList = info.features && info.features.length > 0
    ? info.features.map(f => `- ${formatFeature(f)}`).join('\n')
    : '';

  return `# ${info.projectName}

${info.description}

## Getting Started

\`\`\`bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
\`\`\`

## Project Structure

\`\`\`
src/
├── components/     # Reusable React components
├── hooks/         # Custom React hooks
├── layouts/       # Page layouts and templates
├── lib/          # Core utilities and configurations
├── pages/        # Application pages and routes
├── styles/       # Global styles and theme configuration
└── types/        # TypeScript type definitions
\`\`\`

## Available Scripts

- \`pnpm dev\`: Start the development server
- \`pnpm build\`: Build for production
- \`pnpm preview\`: Preview the production build locally
- \`pnpm lint\`: Run ESLint
- \`pnpm format\`: Format code with Prettier
- \`pnpm test\`: Run tests${featuresList ? `\n\n## Features\n\n${featuresList}` : ''}

## Built With

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [PowerFlow](https://github.com/shynnobi/vite-powerflow) - Starter template with best practices

## Author

${info.author}

## License

MIT

---
*This project was bootstrapped with [create-powerflow-app](https://github.com/shynnobi/create-powerflow-app).*
`;
}

function formatFeature(feature: string): string {
  const features: Record<string, string> = {
    'storybook': 'Storybook - UI Component development environment',
    'e2e': 'Playwright E2E - End-to-end testing',
    'github-actions': 'GitHub Actions - CI/CD pipeline',
    'dev-container': 'Dev Container - Containerized development environment'
  };
  
  return features[feature] || feature;
} 