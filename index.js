const express = require('express');
const app = express();

require('dotenv').config()

//dotenv


//router
const routes = require('./routes')

//dependencies
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//cors
app.use(cors())


//database connections
const url = process.env.DB_URL;
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams).then( () => {
            console.log('Connected to database ')
        }).catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })

//routes
app.use(routes)



const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log('server is running')
})