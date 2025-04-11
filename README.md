# Create PowerFlow App ⚡

Create modern React applications powered by [Vite PowerFlow](https://github.com/shynnobi/vite-powerflow) - a modern, feature-rich starter template with carefully selected tools for enhanced development experience.

```bash
# Create a new project right away - no installation needed
npx create-powerflow-app my-project
```



## What This Creates

This CLI bootstraps a complete React application with the Vite PowerFlow template, giving you:

### Core Technology Stack
- **⚡️ Vite (v6+)** - Lightning-fast builds and HMR
- **⚛️ React (v19+)** - Latest React with all its features
- **📝 TypeScript (v5+)** - Type safety with strict configuration

### UI & Styling
- **🎨 Tailwind CSS (v4+)** - Utility-first CSS framework with dark mode support
- **🧩 shadcn/ui** - Beautiful, accessible component library
- **🌓 Theme system** - Light/dark mode with system preference detection

### Development Experience
- **🧪 Testing** - Vitest, React Testing Library, and Playwright for E2E tests
- **📏 Code quality** - ESLint, Prettier, and TypeScript ESLint
- **🔍 Git hooks** - Pre-commit hooks with Husky, lint-staged, and commitlint
- **💼 Path aliases** - Clean imports without ../../../ paths
- **📚 Storybook** - Component development and documentation
- **🐳 DevContainers** - Consistent development environment across any OS and team members

### State & Data Management
- **📦 Zustand** - Simple and scalable state management
- **🚀 TanStack Query** - Data fetching with caching and synchronization

## Installing the CLI Tool

```bash
# Using pnpm (recommended)
pnpm install -g create-powerflow-app

# Using npm
npm install -g create-powerflow-app

# Using yarn
yarn global add create-powerflow-app
```

While global installation is optional, it allows you to run the CLI without prefixing with npx/pnpx. Choose the package manager you're most comfortable with.

## Using the CLI to Create a Project

```bash
# Using npx (no installation required)
npx create-powerflow-app my-app

# Using pnpx (no installation required)
pnpx create-powerflow-app my-app

# Using the globally installed package
create-powerflow-app my-app
```

Replace `my-app` with your desired project name. The CLI will guide you through a simple setup process with prompts for project description, author, and git initialization.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Shynn
