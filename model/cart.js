// const Mongoose = require("mongoose")
// const User = require("./User");
// UserSchema.methods.addToCart = function (product) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];
  
//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: product._id,
//         quantity: newQuantity,
//       });
//     }
//     const updatedCart = {
//       items: updatedCartItems,
//     };
//     this.cart = updatedCart;
//     return this.save();
//   };
  
//   UserSchema.methods.removeFromCart = function (productId) {
//     const UpdatedCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() !== productId.toString();
//     });
//     this.cart.items = UpdatedCartItems;
//     return this.save();
//   };
  
//   UserSchema.methods.clearCart = function () {
//     this.cart = { items: [] };
//     return this.save();
//   };