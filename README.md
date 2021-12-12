# react-node-mongoose

# Emps - react, Mongoose(for MongoDB and node server API APP)
This repo contains all required files in two folders - react-emps and api-emps and has package.json file for installing required node modules.


# **In "Visual Studio Code"  - Set up React App :**

> Install Node and npm in user environment

> Create React App : In Terminal of Editor npx create-react-app nameOfApp 

> Go to newly created Project Folder

> Install dependencies using npm

> Install axios : Database operations

> Install bootstrap : Use of Bootstrap Library

> In index.js : import "bootstrap/dist/css/bootstrap.css"

> Install font-awesome : Use of font-awesome Icons

> In index.js : import "font-awesome/css/font-awesome.min.css"

> Install jquery and popper.js: In index import "jquery/dist/jquery"

> Install jwt-decode : For decoding jwt Token

> Install jsonwebtoken : For creating jwt Token

> Install socket.io : For 2-way node server-API  and APP communication

> Get socket : import socketIOClient from "socket.io-client";

> Install redux dependencies

> Start App : npm start 

> Start the App in Browser : http://localhost:3000/

# ** Admin Login - admin/admin - Upload xls data to mongodb **
# ** Emp Login - empid/emp@123 (default emp password) - View Emp record **
# ** Admin/Super Login - 4/emp@123 (default emp password) - View All Emp records **
# ** On refresh - Data from JWT Token used **


# **Install MongoDB :**

> Download MongoDB and MongoDBCompass current version : https://www.mongodb.com/try/download/community

> Install with Installation Wizard 
		
	
# **In "Visual Studio Code"  - Set up node API server :**

> Create a new folder with the project name

> In "Visual studio code" terminal go to new folder 

> Run npm init to create package.json file in root directory of project folder like so :

		{
		  "name": "api-emps",
		  "version": "1.0.0",
		  "description": "",
		  "main": "index.js",
		  "scripts": {
			"test": "echo \"Error: no test specified\" && exit 1"
		  },
		  "author": "",
		  "license": "ISC"
		}


> Create index.js in project's root directory, as the entry point

- *Install dependencies using npm for babel, express :*

> express : Web framework for node.js

> babel-cli : Compiles files using babel

> babel-preset-env : For all es2015 plugins	

> nodemon : For hot reloading 

> .babelrc : Babel configuration file in root directory and tells babel how ES6 to be transformed :
	{
		"presets": ["env"]
	}

> In package.json like so :
		  "scripts": 
			{
			"babel-node": "babel-node --presets=env",
			"start": "nodemon –exec
			npm run babel-node -- ./index.js",   
			"build": "babel src -d dist"
			}

> On npm start : npm run babel-node executed and ./index.js passed as starting point to nodemon 

- *Install Other dependencies using npm :*

> bcrypt : Encrypt passsword

> body-parser : In routes get request.body 

> cors : Get rid of error - header Access-Control-Allow-Origin

> dotenv : Read environmental variables from .env file

> exceljs : Excel file operations

> express : Web application framework for node

> http : Create node server

> mongoose : Create Schema, connect to mongoDB

> mongoose-unique-validator : Validate unique values 

> socket.io : Two way communication – node server and react app

> nodemailer :  Emailer for node

> ejs :  Template engine for emailer

> jwt-decode :  Decode tokens

> Start node server : npm start

> View index.html Browser : http://localhost:4000/	

# **Install Mailcatcher Locally (Local SMTP Server and http server email checking interface) :**

Install ruby package : https://rubyinstaller.org/
After installtion : Start command prompt with ruby, in command prompt type gem install mailcatcher
Start mailcatcher and View Emails : In Command prompt type mailcatcher and open http://127.0.0.1:1080/
