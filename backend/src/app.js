import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ extended: true, limit: "12kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// //routes import
import userRouter from './routes/user.routes.js'
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import adminRouter from "./routes/admin.routes.js";
import couponRouter from "./routes/coupon.routes.js";
import reviewRouter from "./routes/review.routes.js";


// //routes declaration
// app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/admin", adminRouter);
app.use(
    "/api/v1/coupons",
    couponRouter
);
app.use(
    "/api/v1/reviews",
    reviewRouter
);


// http://localhost:4000/api/v1/users/register
export { app };