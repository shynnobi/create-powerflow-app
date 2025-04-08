import inquirer from 'inquirer';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

async function validateProjectName(input: string): Promise<boolean | string> {
  if (!input.trim()) {
    return 'Project name cannot be empty';
  }

  const projectPath = path.join(process.cwd(), input);
  try {
    await fs.access(projectPath);
    return chalk.red(`Directory "${input}" already exists, please choose a different name`);
  } catch {
    return true;
  }
}

export async function promptProjectName() {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-powerflow-app',
      validate: validateProjectName
    }
  ]);
  return projectName;
}

export async function promptProjectInfo(defaultProjectName: string) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      default: 'A modern React application built with PowerFlow'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:',
      default: process.env.USER || ''
    }
  ]);
}

export async function promptGit() {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize Git?',
      default: true
    }
  ]);
}