const express = require('express');


const router = express.Router();// tạo ra một router được cung cấp trong express


const controller = require("../../controllers/client/home.controller.js");

router.get('/',controller.index );


module.exports = router; // export router