
# nyata Assessment 

> A Simple CRUD using RestAPI
## Getting Started

> [[Technologies](#technologies-used) &middot; [Testing Tools](#testing-tools) &middot; [Installations](#installations) &middot; [API Endpoints](#api-endpoints) &middot; [Tests](#tests) &middot; [Author](#author)

## Technologies Used

[node]: (https://nodejs.org)

- [Node.js](node)
- [Mongo Db](https://www.mongodb.com/)
- [Express.js](https://expressjs.com).
- [Typescript](https://eslint.org/).

## Installations

#### Getting started

- You need to have Node and NPM installed on your computer.
- Installing [Node](node) automatically comes with npm.

#### Clone

- this project can be installed by

+ Click the botton titled code in the repo

+ Copy the http link
+ Open your terminal and run git clone [https://github.com/MaryannChidimma/Enyata.git](https://github.com/MaryannChidimma/Enyata.git)

+ cd to the root folder
+ Create a .env file
+ Check what is required in the env from that sampleEnv file, then supply the appropriate values.
+ Run the command `npm install` to intall all dependencies used
+ Run the command `npm run dev`


## API Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS                   |
| ------ | --------------------------------------- | -------------------------   |
| POST   | Create a Customer                       | `/api/v1/customer/register` |           
| POST   | Login a Customer                        | `/api/v1/customer/login`    |
| POST   | Creates a Product                       | `/api/v1/product`           |
| POST   | Creates Cart for Customers              | `/api/v1/cart/:productId`   |
| DELETE | Clears the Cart                         | `/api/v1/cart`              |


# Documentation
  + click [https://documenter.getpostman.com/view/19693532/2s847LNXGY](https://documenter.getpostman.com/view/19693532/2s847LNXGY)to view the documentation 

