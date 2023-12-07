const express = require("express");
const router = express.Router();

const examplesControllers = require("../../controllers/mysql/ExamplesControllers");

router.post("/add", examplesControllers.add)
router.get("/get", examplesControllers.get)
router.get("/checkConnection", examplesControllers.checkConnection)

module.exports = router