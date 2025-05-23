const Product = require("../../models/product.model.js");
const Account = require("../../models/account.model.js");
const ProductCategory = require("../../models/product-category.model.js");
const systemConfig = require("../../config/system.js");
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination.js");
const createTreeHelper = require("../../helpers/create-tree.js");
// [GET] admin/products
module.exports.index = async (req, res) => { // truy cập vào trang chủ
    let find = {
        delete: false
    }
    // Tính năng bộ lọc

    const filterStatus = filterStatusHelper(req.query);
    if (req.query.status)
        find.status = req.query.status;

    // End Tính năng bộ lọc



    // Chức năng tìm kiếm

    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    // End Chức năng tìm kiếm


    // Pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            litmitItems: 4
        },
        req.query, countProducts
    )

    // End Pagination

    // Tính năng sort
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    const sort = {};
    if(sortKey && sortValue){
        sort[`${sortKey}`] =  sortValue
    }
    // End tính năng sort




    const products = await Product.find(find).sort(sort).limit(objectPagination.litmitItems).skip(objectPagination.skip);


    for(let product of products){
        // Lấy thông tin người tạo
        const user = await Account.findOne({
            delete : false,
            _id : product.createBy.account_id
        })
        if(user){
            product.accountFullName = user.fullName;
        }
        // Lấy thông tin người cập nhật gần nhất
        const updateBy = product.updateBy.slice(-1)[0];

        if(updateBy){
            const userUpdate = await Account.findOne({
                _id : updateBy.account_id
            })
            updateBy.accountFullName = userUpdate.fullName;
        }
    }

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.regex,
        pagination: objectPagination
    });
}

// [PATCH] admin/products//change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const updateBy = {
        account_id : res.locals.user.id,
        updateAt : new Date()
    }
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { 
        status: status,
        $push : {updateBy : updateBy}
    });
    req.flash('success', 'Cập nhật trạng thái thành công');
    res.redirect("back");
}

// [PATCH] admin/products//change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    const updateBy = {
        account_id : res.locals.user.id,
        updateAt : new Date()
    }
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { 
                status: "active",
                $push : {updateBy : updateBy}
             });
            req.flash('success', 'Cập nhật trạng thái thành công của ' + ids.length + ' sản phẩm');
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { 
                status: "inactive",
                $push : {updateBy : updateBy}
            });
            req.flash('success', 'Cập nhật trạng thái thành công của ' + ids.length + ' sản phẩm');
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, { delete: true, 
                deleteBy : {
                account_id : res.locals.user.id,
                deleteAt : new Date()
                }
            });
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({ _id: id }, { 
                    postion: position,
                    $push : {updateBy : updateBy}
                });
            }
            req.flash('success', `Thay đổi thành công vị trí ${ids.length} sản phẩm`);
            break;
        default:
            break;

    }

    res.redirect("back");
}


// [DELETE] admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({_id : id});
    await Product.updateOne({ _id: id }, {
        delete : true,
        deleteBy : {
            account_id : res.locals.user.id,
            deleteAt : new Date()
        }
    });
    req.flash('success', `Xóa thành công sản phẩm`);
    res.redirect("back");
}


//[GET] /admin/products/create
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({delete : false});
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products/create",{
        pageTitle : "Thêm mới sản phẩm",
        records : newRecords
    });
}


//[POST] /admin/products/create
module.exports.createProduct = async (req, res) => {
   
    req.body.price = parseInt( req.body.price);
    req.body.discountPercentage = parseInt( req.body.discountPercentage);
    req.body.stock = parseInt( req.body.stock);

    if(req.body.postion == ''){
        const countProduct = await Product.countDocuments({});
        req.body.postion = countProduct + 1;
    }
    else{
        req.body.postion = parseInt(req.body.postion);
    }

//    if(req.file){
//     req.body.thumbnail = `/uploads/${req.file.filename}`;
//    }
    
    req.body.createBy = {
        account_id : res.locals.user.id,
    }
    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}


//[GET] /admin/products/edit:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const find = {
        delete : false,
        _id : id
    }
    const product = await Product.findOne(find);
    const records = await ProductCategory.find({delete : false});
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products/edit",{
        pageTitle : "Update sản phẩm",
        product : product,
        records : newRecords
    });
}


//[PATCH] /admin/products/edit:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseFloat( req.body.price);
    req.body.discountPercentage = parseInt( req.body.discountPercentage);
    req.body.stock = parseInt( req.body.stock);
    req.body.postion = parseInt(req.body.postion);

//    if(req.file){
//     req.body.thumbnail = `/uploads/${req.file.filename}`;
//    }

   try {
    const updateBy = {
        account_id : res.locals.user.id,
        updateAt : new Date()
    }

    await Product.updateOne({_id : req.params.id},{
        ...req.body,
        $push : {updateBy : updateBy}
    });
    req.flash('success', `Cập nhập sản phẩm thành công`);
   } catch (error) {
    
   }

    res.redirect("back");
}

//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const find = {
        delete : false,
        _id : id
    }
    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/pages/products/detail",{
        pageTitle : product.title,
        product : product
    });
}


