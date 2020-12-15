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

- Registeration
- Login (username can be phone/email)
- User can search `start from` or `destination` or `both` and view see the list of available rides
- User can choose the ride & confirm the booking
- Login status persistence
- Logout from the App

## Tech-Details

- Backend is a mock server created using `json-server` [more reference](https://dev.to/senthilbalajiganesan/create-crud-apis-deploy-in-almost-no-time-4n6h).
- Frontend is developed purely using vanilla-js, html, css and is served using `live-server` [more reference](https://www.npmjs.com/package/live-server).
- Both frontend & backend are started in single command which requires `concurrently` [more reference](https://www.npmjs.com/package/concurrently)
