
const { v4: uuid } = require('uuid');

const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const logEvents = async (message, logName) => {
    
    const logItem = `\t${uuid()}\t${message}\n`

    console.log(logItem)

    try{
        const dir = path.join(__dirname,'..', 'logs');    
        if(!fs.existsSync(dir)){
            fsPromises.mkdir(dir)
        }
        await fsPromises.appendFile(path.join(__dirname,'..', 'logs', logName), logItem)
    }catch(err){
        console.log(err)
    }

    
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}



module.exports = { logger, logEvents };

