# Vue Apollo GraphQl
Small project to make use of Graphql and Apollo Server as an alternative paradigm to define APIs.
Uses a node.js / express backend and a vue.js frontend.

Backend makes use of mongoose and MongoDB which could be set up at MongoDB Atlas, mlab or as a Docker container.

## Development
Set your .env variables. Copy and rename nodemon.example.json to nodemon.json
Insert connection to your MongoDB here.


Run the following command in root folder. This will start up both the node backend AND the vue frontend which is located in /client
```
npm run dev
```

## A friendly reminder
Use caution with npm and the folders. 
**There are two package.json files.** One for backend (root folder) and one for Vue frontend (client folder).

To manage and add Vue.js dependencies you need to move to the client folder and run npm there.

