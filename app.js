const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const { route } = require("./routes/book-routes");
const authRouter = require("./routes/auth-routes");
const { adminAuth, userAuth } = require("./controllers/auth-controller");

const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();



//middlewares

app.use(express.json())
app.use(cors())

app.use('/books', router)
app.use("/auth", authRouter)
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));
app.use(cookieParser());




mongoose
  .connect(
    //   "mongodb+srv://raneem:raneembook@cluster0.7nuz1.mongodb.net/test-book?retryWrites=true&w=majority"
    "mongodb+srv://admin:admin@cluster0.2fktb.mongodb.net/Bookstore?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conected To Database"))
  .catch((err) => console.log(err));

app.listen('5000', () => { console.log('listen 5000') })

module.exports = app;

//   then(() => {app.listen(5000)})