import config from "../config/config.js";
import app from './express.js'
import mongoose from 'mongoose'

app.listen(config.port,
    (error) => {
        if (error) {
            console.log(error)
        }
        console.info(`console started on ${config.port}`)
    })
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,


});
 mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongoUri}`)
})