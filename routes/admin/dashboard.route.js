const express = require('express');


const router = express.Router();// tạo ra một router được cung cấp trong express


const controller = require("../../controllers/admin/dashboard.controller.js");

router.get('/',controller.dashboard );


module.exports = router; // export router