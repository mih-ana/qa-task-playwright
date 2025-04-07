# E2E Tests

End-to-end tests using [Playwright](https://playwright.dev/).

## Setup

Make sure you have [Node.js](https://nodejs.org/) installed.

Afterwards, to install all required project dependencies, the following commands need to be executed from the e2e working directory:

```bash
# Install e2e project dependencies
npm install

# Install web-app dependencies
cd ../web-app && npm install

# Install server dependencies
cd ../server && npm install
```

## Run tests locally

Test files are located in the `e2e/tests` directory. The tests are grouped into 2 categories:

- `ui`: tests that interact with the user interface
- `api`: tests that interact with the API

A subset of these tests are tagged with `@smoke`, which serves as a way to run tests which cover the most critical functionality of the application.

In order to run all tests, or a specific subset of tests, run the following commands in the e2e working directory:

Run all tests:

```bash
npm run test
```

Run all UI tests:

```bash
npm run test:ui
```

Run all API tests:

```bash
npm run test:api
```

Run all smoke tests:

```bash
npm run test:smoke
```

There is no need to manually start the server and web app projects. They are automatically started in the `playwright.config.ts` file.

## Generate and view reports

After running the tests, a report can be generated using the following command:

```bash
npm run report
```

## CI/CD

This repository is integrated with GitHub Actions for continuous integration and continuous deployment (CI/CD).

The workflow includes the following steps:

1. Checkout the repository
2. Install dependencies for web-app, server, and e2e
3. Install Playwright Browsers in the e2e project
4. Run all Playwright tests
5. Upload Playwright report as an artifact

The workflow runs on a schedule (every day at 08:00 CEST) and can also be manually triggered using the workflow_dispatch event.

### View Test Results in GitHub Actions

After the workflow finishes running, the Playwright reports can be viewed in the GitHub Actions UI under the `Artifacts` section.
