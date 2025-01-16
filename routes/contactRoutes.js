const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const validationToken = require("../middlewares/validationTokenHandler");

router.use(validationToken)
router.get("/", contactController.GetAllContact);
router.get("/:Email", contactController.GetByEmail);
router.post("/", contactController.CreateContact);
router.put("/:Email", contactController.UpdateContact);
router.delete("/:Email", contactController.DeleteContact);

module.exports = router;
