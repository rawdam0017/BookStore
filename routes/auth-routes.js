const express = require("express")
const router = express.Router()
const { register, login,getAllusers, update, deleteUser, adminAuth } = require("../controllers/auth-controller")
router.route("/").get(adminAuth,getAllusers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);



module.exports = router