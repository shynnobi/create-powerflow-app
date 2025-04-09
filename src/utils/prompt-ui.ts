import inquirer, { Question } from 'inquirer';
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

export async function promptProjectName(): Promise<string> {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-powerflow-app',
      prefix: '',
      validate: validateProjectName
    } as Question
  ]);
  return projectName;
}

export async function promptProjectInfo(projectName: string): Promise<any> {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      default: `A PowerFlow project named ${projectName}`,
      prefix: ''
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:',
      prefix: ''
    }
  ] as Question[]);
}

export async function promptGit(): Promise<any> {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: true,
      prefix: ''
    } as Question
  ]);
}