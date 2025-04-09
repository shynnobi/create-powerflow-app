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

## 📑 Table of Contents

- [${info.projectName}](#${info.projectName.toLowerCase()})
  - [📑 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [📦 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
  - [🎨 Theming](#-theming)
  - [🔄 Path Aliases](#-path-aliases)
  - [🧪 Testing](#-testing)
  - [🛠️ Available Scripts](#️-available-scripts)
  - [📄 License](#-license)

## ✨ Features

- ⚡️ **[Vite](https://vitejs.dev/)** - Lightning fast build tool
- ⚛️ **[React](https://react.dev/)** - Latest version with Hooks
- 📝 **[TypeScript](https://www.typescriptlang.org/)** - Static typing
- 🎨 **Styling & UI**:
  - 🌊 [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
  - 🎯 [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible components
  - 🌓 Dark mode support with theme switching
  - 🎭 [react-icons](https://react-icons.github.io/react-icons/) - Beautiful icons
- 🔄 **Data Management**:
  - 🚀 [TanStack Query](https://tanstack.com/query/latest) - Data fetching and caching
  - 📦 [Zustand](https://zustand-demo.pmnd.rs/) - Simple state management
${featuresList ? `\n**Additional Features**:\n${featuresList}` : ''}

## 📦 Project Structure

\`\`\`
src/
├── components/         # Reusable components
│ └── ui/              # shadcn/ui components
├── store/             # Zustand state management
├── assets/            # Static assets
├── context/           # React context providers
├── pages/             # Page components
├── lib/               # Utility libraries
├── utils/             # Utility functions
└── shared/            # Shared types and interfaces
\`\`\`

## 🚀 Getting Started

1. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   pnpm build
   \`\`\`

## 🎨 Theming

This project includes a complete dark/light theme system:

- Automatic theme detection based on system preferences
- Manual theme switching with persistent storage
- Tailwind CSS theme variables
- shadcn/ui theme integration

## 🔄 Path Aliases

Use these path aliases for better import organization:

\`\`\`typescript
// Instead of
import { Component } from '../../../components/Component';

// Use
import { Component } from '@components/Component';
\`\`\`

Available aliases:
- \`@/*\` → \`src/*\`
- \`@components/*\` → \`src/components/*\`
- \`@context/*\` → \`src/context/*\`
- \`@lib/*\` → \`src/lib/*\`
- \`@pages/*\` → \`src/pages/*\`
- \`@shared/*\` → \`src/shared/*\`
- \`@store/*\` → \`src/store/*\`
- \`@utils/*\` → \`src/utils/*\`

## 🧪 Testing

The project includes a comprehensive testing setup:

- 🃏 **Unit Tests**: Using Vitest and React Testing Library
- 🎭 **E2E Tests**: Using Playwright
- 📚 **Component Tests**: Using Storybook

Run tests with:
\`\`\`bash
pnpm test           # Run all tests
pnpm test:e2e      # Run E2E tests
pnpm test:unit     # Run unit tests
\`\`\`

## 🛠️ Available Scripts

- \`pnpm dev\`: Start development server
- \`pnpm build\`: Build for production
- \`pnpm preview\`: Preview production build
- \`pnpm test\`: Run tests
- \`pnpm lint\`: Run ESLint
- \`pnpm format\`: Format code with Prettier
- \`pnpm storybook\`: Start Storybook development server

## 📄 License

MIT

---
*This project was bootstrapped with [create-powerflow-app](https://github.com/shynnobi/create-powerflow-app) using the [PowerFlow](https://github.com/shynnobi/vite-powerflow) template.*

## Author

${info.author}
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