import express from 'express';
import bodyParser from 'body-parser';
import {paymentRoutes} from './routes/payments.js';


const app = express()
const PORT = process.env.PORT || 5000;



app.use(bodyParser.json())

app.use('/',paymentRoutes)



app.get('/', (req,res)=>{
    res.send('Hello world')
})





app.listen(5000, ()=>{
    console.log(`running in ${PORT}`)
})