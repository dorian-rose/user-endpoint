Getting Started Guide XXX

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test


# Configuration (environment variables)

Environment variables must be configured in project setup. Required variables can be found in file .env.template.

# Dependencies

Using different versions of dependencies may cause conflicts. Dependencies, development dependencies and the versions used here can be found in file package.json.

Project Overview XXXX

# Objective

"As a User, I want to be able to save my user profile setting via API so that I can easily control my preferences via API in the future"

# Functionality (API endpoint)

According to the above business need, an endpoint (POST Api) has been developed to save the following user preferences:

- Terms and Conditions accepted (true/false)
- Language preferences (saved as string)
- Show profile preference - show or not show (true/false)
- Show language preference - show or not show (true/false)

Data is saved against a unique user ID and one set of preferences (one POST to endpoint) can be saved per user, with duplicate calls rejected.

This endpoint and documentation for API can be found here: https://documenter.getpostman.com/view/26092520/2s93z9aMMM

Inputs are validated, accepted data types model can be seen in file Prisma>Schema.Prisma.

# Database

Data is stored using an ORM (Postgres using Prisma). A SQL database is used in order to be able to relate user data with their preferences data.

The following diagram demonstrates the data tables used in this project and the relationship between each:

<img src="src/assets/relation-diagram.png" alt="relational diagram for sql database" style="display: block; margin: 0 auto"/>

• [optional] add authentication to the endpoint X
• Must be deployed to GCP (either cloudRun or CloudFunctions)
• Must be unit tested X
• Must be API/Component test (preferably using gherkin)




Project Overview: An overview of the project, its purpose, and its main features. This section provides a high-level understanding of the project's goals and functionality.

Project Structure: A detailed explanation of the project's directory structure, including the purpose of each directory and file. It helps developers understand how the codebase is organized and where to find specific functionality.

Dependencies and Packages: A list of all the dependencies and packages used in the project, along with their versions. This information helps developers ensure they have the required dependencies and understand the purpose of each package.

Configuration: Details about the project's configuration options, such as environment variables, API keys, and other settings. This section explains how to customize the project's behavior and integrate external services.

Components and Modules: Documentation on the various components, modules, and libraries used in the project, along with their purpose, usage guidelines, and examples. This helps developers understand how to leverage existing components and build new ones.



XXXXtesting
XXXXX update api in future or get api in future
```
