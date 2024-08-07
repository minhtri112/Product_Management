const ProductCategory = require("../models/product-category.model.js");

module.exports.getSubCategory = async (parentId) => {

    const getCategory = async (parentId)=>{
        const subs = await ProductCategory.find({
            parent_id : parentId,
            status : 'active',
            delete : false
        });
    
        let allSub = [...subs];
    
        for(const sub of subs){
            const childs = await getCategory(sub.id);
            allSub = allSub.concat(childs);
        }
    
        return allSub;
    }

    const result = await getCategory(parentId);

    return result;
}