# Final Year Project Assistance System SPA

The Final Year Project Assistance System SPA was developed my myself (Adam O'Brien) as part of my Final Year Project in Computer Systems at University of Limerick.
My FYP supervisor was Annette McElligott.
This API was developed to work with *https://github.com/adamobrien4/fyp-assistance-api* as the backend API, and will also be required in order to run this application fully.

## Project Aims
The main aim of this project was to create a web application capable of handling the initial stages of the CSIS Department FYP system, which at the time was completely manual, with little to no automated processes or workflows.

## Installation
This project was developed using the `create-react-app` package.
This package may be required to be installed before running the application in development mode.

1. Clone this repository
2. Install all the required dependencies
`npm install`
3. Run the React development server
`npm run start:development`
4. The server will now be live at `localhost:8080/`

Alternatively, a new build can be generated:
1. Clone this repository
2. Install the required dependencies
3. Generate a new project build
`npm build`
4. Run the build application
`npm start`
5. This will start a new Express server on `localhost:8080/` on which the application will be available

In order to allow the full functionality of the application to be used, the FYP Assistance System API must also be running on your machine.
This can be found here: *https://github.com/adamobrien4/fyp-assistance-api*

