import  winston , { format } from "winston"
import httpContext from "express-http-context"

// const formatMessage = (message:any)=>{
// const reqId = httpContext.get('reqId');
// console.log(reqId)
// message = reqId ? message + "reqId: " + reqId : message;
// return message;
// }

import  getNamespace from 'continuation-local-storage'

// Wrap Winston logger to print reqId in each log
var formatMessage = function(message:any) {
    var myRequest = getNamespace.getNamespace('my request');
    message = myRequest && myRequest.get('reqId') ? message + " reqId: " + myRequest.get('reqId') : message;
    return message;
};

const winstonLogger = winston.createLogger({

  format: format.printf((info)=>{
    return `[${info.level.toUpperCase().padEnd(7 )}] - ${info.message}`
  }),
  level: 'debug',
  defaultMeta: { name: "Enyata"},
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level : "error"}),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(new winston.transports.Console({
    // format: winston.format.simple(),
  }));
}

const logger = {
    log: ( message: any, level: any)=>{
        winstonLogger.log(level, formatMessage(message))
    },
    info: (message: string)=>{
        winstonLogger.info(formatMessage(message))
    },
    warn: (message: string)=>{
        winstonLogger.warn(formatMessage(message))
    },
    debug: (message: string)=>{
        winstonLogger.debug(formatMessage(message))
    },
    error: (message: string)=>{
        winstonLogger.error(formatMessage(message))
    },
    silly:  (message: string)=>{
        winstonLogger.silly(formatMessage(message))
    }
}


export default logger