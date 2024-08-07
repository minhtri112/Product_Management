module.exports.priceNewProduct = (product)=>{
    product.forEach((item)=>{
        item.priceNew = (item.price - (item.price*item.discountPercentage/100)).toFixed(2);
    })

    return product;
}



module.exports.newPrice = (product)=>{
    const newPrice = (product.price - (product.price*product.discountPercentage/100)).toFixed(2);
    return newPrice;
}