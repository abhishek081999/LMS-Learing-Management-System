import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv'
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import errorMiddleware from './middlewares/error.middleware.js'
config();
const app = express();
app.use(express.json())  //body pars middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors({
     origin: [process.env.FRONTEND_URL],
     credentials:true
}));

app.use(cookieParser())

app.use(morgan('dev')); // combined common dev  short  tiny 

app.use('/ping', function(req,res){
    res.send('/pong');
})

//  routes of 3 Modules

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/payments',paymentRoutes)
app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 page not found');
})

app.use(errorMiddleware);
// module.exports = app
export default app;