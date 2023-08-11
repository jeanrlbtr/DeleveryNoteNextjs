# Saptakarsa Frontend Setup Project

## Introduction

This is a Business Portal project built with Next.js, utilizing the app router, Tailwind CSS, and TypeScript. It provides a solid foundation for developing efficient web applications with modern frontend technologies.

## Getting Started

Follow these steps to set up the project locally:

Clone the repository to your local machine:
git clone <repository_url.git>
Install the dependencies using yarn:
yarn install
Prepare the repository to enable husky:
yarn prepare
Development
To start the development server, run the following command
yarn dev
Once the server is running, access the Business Portal in your web browser at http://localhost:3000

## Building the Project

To build the project for production, use the following command:

## yarn build

Linting and Commit Guidelines
This project utilizes Commitlint and Husky to enforce commit message conventions and ensure code quality. Before committing any changes, make sure to stage your files and run:
yarn lint
This command will check for code linting issues and enforce commit message guidelines. Follow the conventional commit format when writing commit messages.

## Commit Message Guidelines

git commit -m "build: added new dependencies for dev"
When contributing to this project, please follow these commit message guidelines:

-  build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
-  ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
-  docs: Documentation only changes
-  feat: A new feature
-  fix: A bug fix
-  perf: A code change that improves performance
-  refactor: A code change that neither fixes a bug nor adds a feature
-  style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-  test: Adding missing tests or correcting existing tests
-  config Changes to the project configuration files
   Happy coding! 🚀
