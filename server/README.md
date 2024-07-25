This is a base node js project template which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations.Feel free to change anything.

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests.(You might want to make separate tests folder)

Lets take a look inside the `src` folder 

`config`-> In this folder anything and everything regarding any configurations o: setup of a library or module will be done.For example: setting up 'dotenv' so that we can use the environment variables anywhere in a cleaner fashion,this is done in the 'server-config.js'.One more example can be to setup you logging library that can help you to prepare meaningful logs,so configuration for this library should also be done here.

`routes`-> In the routes folder, we register a route and the corresponding middleware and controllers to it.

`middlewares` -> They are just going to intercept the incoming requests where we can write our validators ,authenticators etc

`controllers`-> They are kind of the last middlewares as post them you call ur business layer to execute the business logic. In controllers we just receive the incoming requests and data and then pass it to the business layer,and once business layer returns an output,we structure the API response in controllers and send the output

`repositories`-> This folder contains all the logic using which we interact with the DB by writing queries ,all the raw queries or ORM/ODM queries will go here.

`services` -> Contains the business logic and interacts with repositories for data from the database.

`utils `-> contains helper methods,error classes etc.

## Setup the project

- Clone this project
  ```
  https://github.com/IamTeja-juluri/Dsa.git
  ```
- Navigate to job-assignment-IamTeja-juluri
  ```
  cd job-assignment-IamTeja-juluri
  ```
- Run npm clean install or npm install
  ```
  npm ci or npm install
  ```
- Create a .env file inside src folder
  ```
  cd src
  touch .env
  ```
- Add these properties in .env file with the same name
  ```
  PORT=4000 or any port of your choice
  MONGO_URI=<valid mongo uri>
  JWT_SECRET=<give some random value> 
  ```
- Now run this command to start the application
  ```
  npm run dev
  ```
##  Dockerization part
 
- We need to build the image before we create the container
- Use this command to build image
  ```
  docker build -t "<any-image-name>" .
  Eg: docker build -t "node-typescript-image" .
  ```
- Now use below command to create the container
  ```
  docker run -p 4000:4000 -d --name "<any-container-name>" "<same image name that you built>
  
  Eg:  docker run -p 4000:4000 -d --name "node-typescript-app" "node-typescript-image"
  ```

### Testing APIS in Postman
- Navigate  to this collection using the link below(made public)
  ```
  https://www.postman.com/dark-spaceship-730179/workspace/anscerrobotics-assessment/overview
  ```
- Test the users apis and states apis
- Remember to use login api before using state apis