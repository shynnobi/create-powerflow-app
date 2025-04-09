#!/usr/bin/env node
import chalk from 'chalk';
import path from 'path';
import fs from 'fs/promises';
import { createProject, spinner } from './commands/create.js';
import { promptProjectInfo, promptGit, promptProjectName } from './utils/prompt-ui.js';

let currentProjectPath: string | null = null;
let isCleaningUp = false;

async function cleanup() {
  if (isCleaningUp) return;
  isCleaningUp = true;

  spinner.stop();
  
  if (currentProjectPath) {
    try {
      await fs.rm(currentProjectPath, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  }
  
  console.log(chalk.red('\nOperation cancelled'));
  process.exit(0);
}

// Handle Ctrl+C
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    cleanup();
  }
});

async function directoryExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function init() {
  try {
    // Enable raw mode to capture Ctrl+C
    process.stdin.setRawMode(true);
    process.stdin.resume();

    // Option 1: Project name from arguments
    let projectName = process.argv[2];
    if (projectName) {
      const projectPath = path.join(process.cwd(), projectName);
      if (await directoryExists(projectPath)) {
        console.error(chalk.red(`Error: Directory "${projectName}" already exists`));
        console.log('Try a different name or run without arguments for interactive mode.');
        process.exit(1);
      }
    } 
    // Option 2: Ask for project name via CLI
    else {
      projectName = await promptProjectName();
    }

    currentProjectPath = path.join(process.cwd(), projectName);

    // Step 1: Project information
    const projectInfo = await promptProjectInfo(projectName);

    // Step 2: Git configuration
    const gitConfig = await promptGit();

    // Step 3: Installation
    await createProject({
      projectName,
      ...projectInfo,
      features: [],
      git: gitConfig.git
    });

  } catch (error: any) {
    console.error(chalk.red('Error:'), error?.message || error);
    await cleanup();
  } finally {
    // Always disable raw mode
    process.stdin.setRawMode(false);
    process.stdin.pause();
  }
}

init(); 