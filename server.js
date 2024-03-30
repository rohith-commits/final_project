import express from 'express';
import bodyParser from 'body-parser';
import {paymentRoutes} from './routes/payments.js';



const app = express()
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.use('/',paymentRoutes)



app.get('/', (req,res)=>{
    res.sendFile('/home/rohith/final_project/index.html')
})









app.listen(5000, ()=>{
    console.log(`running in ${PORT}`)
})

