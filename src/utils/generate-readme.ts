interface ProjectInfo {
  projectName: string;
  description: string;
  author: string;
  features: string[];
}

export function generateReadme(info: ProjectInfo): string {
  const featuresList = info.features && info.features.length > 0
    ? '\n\n## Features\n\n' + info.features.map(f => `- ${formatFeature(f)}`).join('\n')
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
\`\`\`${featuresList}

## Author

${info.author}

## License

MIT
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