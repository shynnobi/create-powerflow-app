import { simpleGit } from 'simple-git';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs/promises';
import { generateReadme } from '../utils/generate-readme.js';
import { directoryExists } from '../utils/fs-utils.js';

interface ProjectOptions {
  projectName: string;
  description: string;
  author: string;
  git: boolean;
}

const TEMPLATE_REPO = 'https://github.com/shynnobi/vite-powerflow.git';

// Create a global spinner so it can be stopped from anywhere
export const spinner = ora();

export async function createProject(options: ProjectOptions): Promise<void> {
  const projectPath = path.join(process.cwd(), options.projectName);

  try {
    // Check if directory already exists
    if (await directoryExists(projectPath)) {
      console.error(chalk.red(`Error: Directory "${options.projectName}" already exists`));
      process.exit(1);
    }

    // Clone template
    spinner.start('Cloning template...');
    const git = simpleGit();
    await git.clone(TEMPLATE_REPO, projectPath);
    spinner.succeed('Template cloned successfully');

    // Remove .git directory
    spinner.start('Cleaning up...');
    await fs.rm(path.join(projectPath, '.git'), { recursive: true, force: true });
    // Remove docs directory if it exists
    await fs.rm(path.join(projectPath, 'docs'), { recursive: true, force: true });
    spinner.succeed('Cleaned up successfully');

    // Update package.json
    spinner.start('Updating package.json...');
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

    packageJson.name = options.projectName;
    packageJson.description = options.description;
    packageJson.author = options.author;

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    spinner.succeed('Updated package.json successfully');

    // Generate README.md
    const readme = generateReadme(options);
    await fs.writeFile(path.join(projectPath, 'README.md'), readme);

    // Initialize Git if requested
    if (options.git) {
      console.log(''); // Add newline after "Initialize Git? Yes"
      spinner.start('Initializing git repository...');
      const projectGit = simpleGit(projectPath);
      await projectGit.init();
      await projectGit.add('.');
      await projectGit.commit('Initial commit: Project created with create-vite-powerflow-app');
      spinner.succeed('Initialized git repository\n'); // Add newline after initialization
    }

    console.log(chalk.green('✨ Project created successfully!'));
    console.log('Next steps:');
    console.log(chalk.cyan(`  cd ${options.projectName}`));
    console.log(chalk.cyan('  pnpm install'));
    console.log(chalk.cyan('  pnpm dev'));
  } catch (error) {
    spinner.fail('Failed to create project');
    throw error;
  }
}
