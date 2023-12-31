const carts = require('../Models/cartModel')

// addtocart
exports.addtocartController = async (req,res)=>{
    const userId = req.payload
    const {id,title,price,description,category,image,rating,quantity} = req.body
    try{
        const existingProduct = await carts.findOne({id,userId})
        if(existingProduct){
            existingProduct.quantity+=1
            existingProduct.grantTotal = existingProduct.quantity*existingProduct.price
            await existingProduct.save()
            res.status(200).json("Items added to Your Cart")
        }else{
            const newProduct = new carts({
                id,title,price,description,category,image,rating,quantity,grantTotal:price,userId
            })
            await newProduct.save()
            res.status(200).json('item added to your cart')
        }
    }catch(err){
        console.log(err);
        res.status(401).json(err)
    }
}

// getcart 
exports.getCartController = async (req,res)=>{
    const userId = req.payload
    try{
        const allProducts = await carts.find({userId})
        res.status(200).json(allProducts)
    }catch(err){
        res.status(401).json(err)
    }
}