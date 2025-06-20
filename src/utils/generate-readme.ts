import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

interface ProjectInfo {
  projectName: string;
  description: string;
  author: string;
}

/**
 * Generates a README file for a new project by using the readme-lite.md template
 * and replacing placeholders with project-specific information.
 *
 * @param info Project information to inject into the template
 * @returns Generated README content as a string
 */
export function generateReadme(info: ProjectInfo): string {
  // Calculate the path to the template directory using import.meta.url
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  const templatePath = path.join(currentDir, '..', 'templates', 'readme-lite.md');

  // Load the template from the templates directory
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Replace placeholders with project-specific information
  return (
    template
      // Replace project name
      .replace(/# Vite PowerFlow/g, `# ${info.projectName}`)
      // Replace description in the header
      .replace(
        /<strong>Vite PowerFlow<\/strong> - Your next React project, ready to go\./g,
        `<strong>${info.projectName}</strong> - ${info.description}`
      )
      // Replace description at the top
      .replace(
        /A modern, feature-rich starter template for React applications built with Vite\./g,
        info.description
      )
      // Replace Quick Start section
      .replace(
        /```bash[\s\S]*?```/,
        '```bash\n# Install dependencies\npnpm install\n\n# Start development server\npnpm dev\n\n# Build for production\npnpm build\n```'
      )
  );
  // Note: We preserve the original footer with Shynn attribution
}
