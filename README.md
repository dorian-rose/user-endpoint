# Installation

$ npm install
Running the app

# development

$ npm run start

# watch mode

$ npm run start:dev

# production mode

$ npm run start:prod
Test

# unit tests

$ npm run test

# e2e tests

$ npm run test:e2e

# test coverage

$ npm run test:cov

The endpoint must satisfy the following conditions (Acceptance Criteria):
• The endpoint should allow the following data to be saved:
• Terms and Condition Accepted X
• Language preferences X
• ShowProfile Preferences (to show or not) X
• ShowLanguages Preferences (to show or not): X
• Should be a Single POST API ‘/v1/user/preferences’ X
• Should store data against unique userID and should reject duplicate calls X
• Should have Validation on Input X
• [optional] add authentication to the endpoint X
The API endpoint must meet our Definition of Done:
• Must be written using Typescript in Node.js (v16) using the Nest.js (v9) Framework X
• Must store data using the firestore SDK or an ORM X Prisma/Postgres
• Must be deployed to GCP (either cloudRun or CloudFunctions)
• Must be unit tested
• Must be API/Component test (preferably using gherkin)
• Must have appropriate API and technical documentation
• Must include appropriate logging
