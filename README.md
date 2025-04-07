# Charge Point Installation App

App to support electricians in setting up a new charge point infrastructure.

The app allows the electricians to inform us about all the installed charge points, using their serial numbers.

The following functionalities are available:
- Visualize list of installed charge points 
- Adding a new charge point using serial number
- Remove a charge point from the installation

The app is composed of 2 components:
- Web application
- REST API

In order to run the app, you need to have nodejs installed.

To run it, execute in the command line:

```bash
$ npm install
$ npm start
```

The purpose of this task is to create some simple tests for automation. 

We would like you to implement the test using following tools. Please choose the one that you prefer.
1. Playwright (Priority#1)
2. Cypress

Test cases should be covered.
1. Add new serial number and verify new serial number is added.
2. Delete a serial number and verify that serial number is deleted.

Important Note
1. Cover as many scenarios as possible
2. Maintain a healthy count of UI scenarios and API scenarios separately as well
3. Try to come up with combination of UI and API scenarios also
4. Apply the best practices and design patterns(Page Object for example) when you set up the framework
5. Implement yaml to integrate and schedule your tests at 8 AM every morning CEST time
6. Please make sure to implement the best practices of the framework you are using, that is the most important part of this exercise.