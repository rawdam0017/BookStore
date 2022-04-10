const express = require("express")
const router = express.Router()
router.get("/cart", (req, res, next) => {
    req.user
      .populate("cart.items.productId")
      .then((user) => {
        const products = user.cart.items;
        // console.log(products);
        res.render("home/cart", {
          path: "/cart",
          pageTitle: "Your cart",
          products: products,
          isAuthenticated: req.session.isLoggedIn,
        });
        // console.log(products);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  
  router.post("/cart",(req, res, next) => {
    const prodId = req.body.productId;
    // console.log(prodId);
    Product.findById(prodId)
      .then((product) => {
        return req.user.addToCart(product);
      })
      .then((result) => {
        // console.log(result);
        res.redirect("/cart");
      });
  });