import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compress from 'compression';
import template from '../template.js';
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.get('/',(req,res)=>{
    res.status(200).send(template())
})
export default app;