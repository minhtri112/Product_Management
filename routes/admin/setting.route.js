const express = require('express');
const router = express.Router();// tạo ra một router được cung cấp trong express
const controller = require("../../controllers/admin/setting.controller.js");
const multer = require('multer');

// const storageMulter = require('../../helpers/storageMulter');
// const upload = multer({ storage: storageMulter()  })
const upload = multer()
//  const upload = multer({ dest: './public/uploads/' })
const uploadCloud = require("../../middlewares/admin/uploadCloud-middleware.js");

router.get('/general', controller.general);

router.patch(
    '/general',
    upload.single('logo'),
    uploadCloud.upload,
    controller.generalPatch,
);



module.exports = router; // export router