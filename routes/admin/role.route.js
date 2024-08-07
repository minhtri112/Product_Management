const express = require('express');
const router = express.Router();// tạo ra một router được cung cấp trong express
const controller = require("../../controllers/admin/role.controller.js");

router.get('/',controller.index );
router.get('/create',controller.create );

router.post('/create',controller.createPost );

router.get('/edit/:id',controller.edit );


router.patch('/edit/:id',controller.editPatch );

router.get('/premissions',controller.premissions );

router.get('/premissions',controller.edit );

router.patch('/premissions',controller.premissionsPatch );



module.exports = router; // export router