#!/usr/bin/env node
import chalk from 'chalk';
import path from 'path';
import fs from 'fs/promises';
import { createProject } from './commands/create.js';
import { promptProjectInfo, promptGit, promptProjectName } from './utils/prompt-ui.js';

async function directoryExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

// Gérer l'interruption proprement
process.on('SIGINT', () => {
  console.log(chalk.red('\nOperation cancelled'));
  process.exit(0);
});

async function init() {
  try {
    // Option 1 : Nom du projet en argument
    let projectName = process.argv[2];
    if (projectName) {
      // Vérifier si le dossier existe déjà
      const projectPath = path.join(process.cwd(), projectName);
      if (await directoryExists(projectPath)) {
        console.error(chalk.red(`Error: Directory "${projectName}" already exists`));
        console.log('Try a different name or run without arguments for interactive mode.');
        process.exit(1);
      }
    } 
    // Option 2 : Demander le nom du projet via le CLI
    else {
      projectName = await promptProjectName();
    }

    // Étape 1 : Informations du projet
    const projectInfo = await promptProjectInfo(projectName);

    // Étape 2 : Configuration Git
    const { git } = await promptGit();

    // Étape 3 : Installation
    await createProject({
      projectName,
      ...projectInfo,
      features: [],
      git
    });

  } catch (error: any) {
    if (error?.message?.includes('User force closed the prompt')) {
      console.log(chalk.red('\nOperation cancelled'));
      process.exit(0);
    }
    console.error(chalk.red('Error:'), error);
    process.exit(1);
  }
}

init(); 