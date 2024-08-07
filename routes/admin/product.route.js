const express = require('express');
const multer = require('multer');

// const storageMulter = require('../../helpers/storageMulter');
// const upload = multer({ storage: storageMulter()  })
const upload = multer()
//  const upload = multer({ dest: './public/uploads/' })
const uploadCloud = require("../../middlewares/admin/uploadCloud-middleware.js");



const router = express.Router();// tạo ra một router được cung cấp trong express


const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validate/admin/product.validate");

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post('/create',
  upload.single('thumbnail'),
  uploadCloud.upload,
  validate.createPost,
  controller.createProduct
);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id',
  upload.single('thumbnail'),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

router.get('/detail/:id', controller.detail);



module.exports = router; // export router