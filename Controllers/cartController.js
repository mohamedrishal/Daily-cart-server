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

// increment quantity 
exports.incrementCartController = async (req,res)=>{
    const {id} = req.params
    try{
        const selectedProduct = await carts.findOne({_id:id})
        if(selectedProduct){
            selectedProduct.quantity +=1
            selectedProduct.grantTotal = selectedProduct.quantity*selectedProduct.price
            await selectedProduct.save()
            res.status(200).json("Quantity Incremented")
        }else{
            res.status(404).json("Product not Found")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// Decrement quantity
exports.decrementCartController = async (req,res)=>{
    const {id} = req.params
    try{
        const selectedProduct = await carts.findOne({_id:id})
        if(selectedProduct){
            selectedProduct.quantity -=1
            if(selectedProduct.quantity===0){
                await carts.deleteOne({_id:id})
                res.status(200).json("Item removed")
            }else{
                selectedProduct.grantTotal = selectedProduct.quantity*selectedProduct.price
                await selectedProduct.save()
                res.status(200).json("Quantity Decremented")
            }
           
        }else{
            res.status(404).json("Product not Found")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

  // remove cart items

  exports.removeCartItemController = async (req,res)=>{
    const {id} = req.params
    try{
        await carts.deleteOne({_id:id})
        res.status(200).json('Item removed!!')
    }catch(err){
        res.status(401).json(err)
    }
  }

//   emptycart 
exports.emptyCartController  = async (req,res)=>{
    const userId = req.payload
    try{
        await carts.deleteMany({userId})
        res.status(200).json('all Items removed')
    }catch(err){
        res.status(401).json(err)
    }
}