# About this Todo app
This is a sample Todo application which is meant to help you learn how to build a full-stack application with authentication and authorization. The front-end is a static app built using React and the backend is an API application running on express.js which talks to a Postgres database.  To simplify the deployment of this application in the cloud, I recommend using [App Spaces](https://learn.microsoft.com/en-us/azure/app-spaces/overview) which will host the front-end on Azure Static Web Apps, and the back-end on Azure Container Apps.

To learn more about how this app works end-to-end, checkout this [blog post](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/app-spaces-building-a-full-stack-app-with-google-authentication/ba-p/4141994).

# Running the Todo app locally
Prerequisites:

- Node 16+
- Postgresql (this could be running locally or on the cloud so long as you have a connection string and can connect to it from your local dev machine)
- A Google account to setup authentication

## Installing the Static Web Apps (SWA) CLI
The front-end is built using React and is configured to be hosted for Azure Static Web Apps (SWA). SWA isn't a requirement, however it does provide some nice features to greatly simplify authentication and authorization while also handling geodistribution for improved performance.  In order to properly run the entire end-to-end application with auth, you'll need to use the SWA CLI which can emulate the SWA runtime locally.  To install the SWA CLI globally, all you need to do is run:

```
npm install -g @azure/static-web-apps-cli
```

To learn more about the SWA CLI, click [here](https://azure.github.io/static-web-apps-cli).

## Installing dependencies
Run the following from both the <b>/client</b> and <b>/server</b> folders:

```
npm install
```

## Running it locally
First let's start the client which will run on port 3000.

```
cd client
npm start
```

Then let's add a <b>.env</b> file under the <b>/server</b> folder which contains the connection string for your postgres database. NOTE: This file is explicitly ignored in .gitignore so it won't accidentally be commited and pushed to GitHub.  It's for local use only.

.env file example
```
POSTGRES_URL="postgresql://<username>:<password>@localhost:5432/<dbname>"
```

Then let's start the server which will run on port 3001.

```
cd server
node app.js
```

And lastly, let's start the SWA CLI which will act as a proxy between your client and server to emulate the SWA runtime which is hosted on localhost:4280. This is the URL you'll use to run your application.  NOTE: Make sure your "-w" parameter is pointing to whever your client folder is located on your machine.

```
swa start http://localhost:3000 --api-devserver-url http://localhost:3001 -w ~/todo/client
```

Once the SWA emulator is running, you just need to open your browser to <b>http://localhost:4280</b>.

### Setting up Authentication and Authorization
If you've made it this far, follow the steps in the Todo application to setup authentication and authorization.  When you get to the part where you need to set the clientId and clientSecret, you'll just need to set those as environment variables before running the SWA emulator since you won't be able to use the Azure Portal to handle this for you.

Here's how to do this on a Mac:

```
export GOOGLE_CLIENT_ID=<replace with your clientId>
export GOOGLE_CLIENT_SECRET=<replace with your clientSecret>
swa start http://localhost:3000 --api-devserver-url http://localhost:3001 -w ~/todo/client
```

Here's how to do this on a PC:
```
set GOOGLE_CLIENT_ID=<replace with your clientId>
set GOOGLE_CLIENT_SECRET=<replace with your clientSecret>
swa start http://localhost:3000 --api-devserver-url http://localhost:3001 -w ~/todo/client
```

## Learn More

To learn more about the end-to-end of how this application was built, you can learn more in the [walkthrough](#).

Other references:
- [Learn about App Spaces](https://learn.microsoft.com/en-us/azure/app-spaces/overview) - Simplifies the deployment and management of multiple services in the Azure Portal
- [Learn about Azure Static Web App](https://learn.microsoft.com/en-us/azure/static-web-apps/overview) - A service optimized for hosting static web content.
- [Learn more about Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview) - A service optimized to to simplify the running of containers backed by the power of Kubernetes.
