interface ProjectInfo {
  projectName: string;
  description: string;
  author: string;
  features: string[];
}

export function generateReadme(info: ProjectInfo): string {
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

## Documentation

This project is based on the [PowerFlow](https://github.com/shynnobi/vite-powerflow) template. 
For detailed documentation about features, project structure, and best practices, please refer to the [PowerFlow documentation](https://github.com/shynnobi/vite-powerflow#readme).

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
    'storybook': '📚 **Storybook** - Component development environment',
    'e2e': '🎭 **Playwright E2E** - End-to-end testing',
    'github-actions': '🔄 **GitHub Actions** - CI/CD pipeline',
    'dev-container': '🐳 **Dev Container** - Containerized development'
  };
  
  return features[feature] || feature;
} 