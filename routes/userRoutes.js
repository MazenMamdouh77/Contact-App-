const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const validationToken = require("../middlewares/validationTokenHandler")

router.post("/login",userController.loginUser)
router.post("/register",userController.registerUser)
router.get("/current",validationToken,userController.currentUser)

module.exports = router