import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from "body-parser"
import cors from 'cors';
import Razorpay from "razorpay"



// ROUTERS
import userRouter from "./routers/user.router";
import productRouter from "./routers/product.router";
import orderRouter from "./routers/order.router";
import cartRouter from "./routers/cart.router";
import payRouter from "./routers/payment.router";
import wishRouter from "./routers/wishlist.router";
import categoryRouter from "./routers/category.router";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000

// var corsOptions = {
//     origin:  [
//       process.env.REACT_URL1,
//       process.env.REACT_URL2,
//   ],
//     optionsSuccessStatus:200
//   }
  
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(cookieParser())

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})

mongoose.connect(`${process.env.MONGO_URL}/shopville`)
  .then(() => console.log(`Connected to Shopville!`))
  .catch(()=> console.log(`Error connecting to database`));

 
app.use('/shopville/user', userRouter)  
app.use('/shopville/product', productRouter)  
app.use('/shopville/cart', cartRouter)  
app.use('/shopville/order', orderRouter)  
app.use('/shopville/checkout', payRouter)  
app.use('/shopville/wishlist', wishRouter)  
app.use('/shopville/category', categoryRouter)  

export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
