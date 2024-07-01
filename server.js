const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");

const mongoose = require("mongoose");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddlewares");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryuRoutes");
const subcategoryRoute = require("./routes/subCategoryRoutes");
const brandroutes = require("./routes/BrandRoutes");
const productRoutes = require("./routes/proudctRoute");
const UserRoute = require("./routes/UserRoute");
const authRoute = require("./routes/authRoutes");
const reviewRoute = require("./routes/ReviewRoute");
const WishListRoute = require("./routes/wishlistRoute");
const AddressRoute = require("./routes/addressesRoute");
const CouponRoutes = require("./routes/couponRoutes");
const CartRoute = require("./routes/CartRoute");
const OrderRoute = require("./routes/OrderRoute");

dbConnection();

const app = express();
// other domin to access
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression())

app.use(express.json());

app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}💪`);
}

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);
app.use("/api/v1/brands", brandroutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/WishList", WishListRoute);
app.use("/api/v1/addresses", AddressRoute);
app.use("/api/v1/coupons", CouponRoutes);
app.use("/api/v1/Cart", CartRoute);
app.use("/api/v1/order", OrderRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});
// global error handeling midleware( 4 params)

app.use(globalError);

const PORT = process.env.PORT || 8006;
const server = app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
