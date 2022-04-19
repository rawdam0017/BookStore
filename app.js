const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const { route } = require("./routes/book-routes");
const authRouter = require("./routes/auth-routes");
const CART_CONTROLLER = require('./controllers/cart-controller');
const AUTH = require("./controllers/auth-controller")
const categoryRouter = require("./routes/category-routers");
const { adminAuth, userAuth } = require("./controllers/auth-controller");

const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();


//middlewares


app.use(express.json())
app.use(cors())

app.get('/cart/getSize', AUTH.userAuth, CART_CONTROLLER.getCartSize);
app.get('/auth/cart', AUTH.userAuth, CART_CONTROLLER.getCart);
app.post('/auth/cart/add/:bookId', AUTH.userAuth, CART_CONTROLLER.addToCart);
app.delete('/auth/cart/delete/:bookId', AUTH.userAuth, CART_CONTROLLER.removeFromCart);
app.post('/auth/cart/checkout', AUTH.userAuth, CART_CONTROLLER.checkout);





app.use('/books', router)
app.use("/auth", authRouter)
app.use("/category", categoryRouter)
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));
app.use(cookieParser());




mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.2fktb.mongodb.net/Bookstore?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conected To Database"))
  .catch((err) => console.log(err));

app.listen('5000', () => { console.log('listen 5000') })

module.exports = app;

