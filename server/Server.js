// import cookieParser from "cookie-parser";
// import express from "express"
// import cors from "cors"
// import connectDB from "./configs/db.js";
// import 'dotenv/config';
// import userRouter from "./routes/UserRoute.js";
// import sellerRouter from "./routes/sellerRoute.js";
// import connectCloudinary from "./configs/cloudinary.js";  
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import addressRouter from "./routes/addressRoute.js";
// import orderRouter from "./routes/OrderRoute.js";

// const app=express();
// const port = process.env.PORT || 4000;

// await connectDB()
// await connectCloudinary()    

// //Allow multiple origins
// const allowedOrigins = ['http://localhost:5173']

// // Middleware Configuration
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));


// app.get('/',(req,res)=>res.send("API is Working!"));
// app.use('/api/user',userRouter);
// app.use('/api/seller',sellerRouter);
// app.use('/api/product',productRouter);
// app.use('/api/cart',cartRouter);
// app.use('/api/address',addressRouter);
// app.use('/api/order',orderRouter);


// app.listen(port,()=>{
//     console.log(`Server is running on http://localhost:${port}`);
    
// })



import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import './configs/cloudinary.js';  // ✅ Just import it — don't call or await

const app = express();
const port = process.env.PORT || 4000;

// Connect DB
await connectDB(); // ✅ OK to await

// Middleware
const allowedOrigins = ['http://localhost:5173'];
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.get('/', (req, res) => res.send("API is Working!"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


export default app;