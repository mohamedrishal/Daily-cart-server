const wishlists = require('../Models/whislistModel')

// add to wishlist
exports.addTowishlistController = async (req,res)=>{

    // get Product  id
    const {id,title,price,description,category,image,rating} = req.body

    // get userId
    const userId = req.payload

    try{
        const existingProduct = await wishlists.findOne({id,userId})
        if(existingProduct){
            res.status(401).json("Product already Available in Your Wishlist!!")
        }else{
            const newProduct = new wishlists({

                id,title,price,description,category,image,rating,userId
               
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }catch(err){
        res.status(401).json(err)
    }

}
