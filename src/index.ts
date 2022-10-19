import http = require('http')
import express, { Express, Request, Response } from 'express';
import helmet from "helmet";
import { ErrorMiddleware } from './middleware/errorHandler';
import constants from './config/constants';
import apiRoutes from './routes/index'
import 'express-async-errors'
import './startup/database'
import logger from '../lib/logger'
import database from './startup/database';
import uuid from 'node-uuid'

import createNamespace from 'continuation-local-storage'
const myRequest = createNamespace.createNamespace('my request');


const app: Express = express();
const port = constants.PORT ;


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Run the context for each request. Assign a unique identifier to each request
app.use(function(req, res, next) {
  myRequest.run(function() {
      myRequest.set('reqId', uuid.v1());
      next();
  });
});


app.use("/api/v1", apiRoutes());

app.get("/", (req: Request, res: Response) => {
  logger.info("home route")
  res.status(200).send("Server is up and Runing")
});

app.use(ErrorMiddleware);

const server = http.createServer(app);

server.listen(port, () => {
  database()
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`)
});

app.on("error", (error: any) => {
  
  console.log(`Error occured on the server ${error}`);
});



