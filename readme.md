# Ride-Share

This is a simple application developed using Vanilla-js for booking a ride. This app is built as part of learning process and has no production ready functionality.

- [How to run this Project?](#setup)
- [What are the Features available?](#features)
- [Some technical details](#tech-details)

## Setup

Please make sure you have installed Node.js in your system.

1. Clone the project
2. Open cmd with CW as project root
3. Run `npm i` to install the dependencies
4. Run `npm start` to start the project
   Internally, the app starts both UI & Mock server.

## Features

- User will be able to register in the app
- User can use the credentials and login in the app (username can be either phone/email id entered during Registeration)
- User can search either `start from` or `destination` or `both` and can see the list of available rides
- User can choose the ride from list and confirm the booking

## Tech-Details

- Frontend is developed purely using vanilla-js, html, css and is served using `live-server` [more reference](https://www.npmjs.com/package/live-server).
- Backend is a mock server created using `json-server` [more reference](https://dev.to/senthilbalajiganesan/create-crud-apis-deploy-in-almost-no-time-4n6h).
- Both frontend & backend are started in single command which requires `concurrently` [more reference](https://www.npmjs.com/package/concurrently)
