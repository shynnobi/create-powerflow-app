import { simpleGit } from 'simple-git';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs/promises';
import { generateReadme } from '../utils/generate-readme.js';

interface ProjectOptions {
  projectName: string;
  description: string;
  author: string;
  features: string[];
  git: boolean;
}

const TEMPLATE_REPO = 'https://github.com/shynnobi/vite-powerflow.git';

async function directoryExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export async function createProject(options: ProjectOptions): Promise<void> {
  const spinner = ora();
  const projectPath = path.join(process.cwd(), options.projectName);

  try {
    // Vérifier si le dossier existe déjà
    if (await directoryExists(projectPath)) {
      console.error(chalk.red(`Error: Directory "${options.projectName}" already exists`));
      process.exit(1);
    }

    // Cloner le template
    spinner.start('Cloning template...');
    const git = simpleGit();
    await git.clone(TEMPLATE_REPO, projectPath);
    spinner.succeed('Template cloned successfully');

    // Supprimer le dossier .git
    spinner.start('Cleaning up...');
    await fs.rm(path.join(projectPath, '.git'), { recursive: true, force: true });
    spinner.succeed('Cleaned up successfully');

    // Mettre à jour package.json
    spinner.start('Updating package.json...');
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    
    packageJson.name = options.projectName;
    packageJson.description = options.description;
    packageJson.author = options.author;
    
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    spinner.succeed('Updated package.json successfully');

    // Générer le README.md
    const readme = generateReadme(options);
    await fs.writeFile(path.join(projectPath, 'README.md'), readme);

    // Initialiser Git si demandé
    if (options.git) {
      spinner.start('Initializing git repository...');
      const projectGit = simpleGit(projectPath);
      await projectGit.init();
      await projectGit.add('.');
      await projectGit.commit('Initial commit: Project created with create-powerflow-app');
      spinner.succeed('Initialized git repository'); // Saut de ligne après l'initialisation
    }

    console.log(chalk.green('✨ Project created successfully!\n'));
    console.log('Next steps:');
    console.log(chalk.cyan(`  cd ${options.projectName}`));
    console.log(chalk.cyan('  pnpm install'));
    console.log(chalk.cyan('  pnpm dev'));

  } catch (error) {
    spinner.fail('Failed to create project');
    throw error;
  }
} 