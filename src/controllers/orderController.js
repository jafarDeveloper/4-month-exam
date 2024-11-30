const Orders = require('../models/orderModel')
const ApiError = require('../error/ApiError');
const { verify } = require('jsonwebtoken');


class ProductController {
    async get(req, res , next) {
        try{
            let orders = await Orders.get(req.user.id)
            
           
        let uniqueOrders = [];
        let ids = new Set();
        
        for (const order of orders) {
            if (!ids.has(order.product_id)) {
                ids.add(order.product_id);
                console.log(order.product_id);
                
                uniqueOrders.push(order);
            }
        }
        orders = uniqueOrders;
        
            return res.status(200).json(orders)
        }
        catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }
    async post(req,res , next){
        try{
            const orders = await Orders.post(req.body ,req.user )
            if(!orders){
               return next(ApiError.internal('product is not found'))
            }
            
            return res.status(201).json(orders)
        }
        catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req,res , next){
        try{
            let orders = await Orders.delete( req.params )
            
            
            return res.status(201).json(orders) 
        }
        catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }
   
}

module.exports = new ProductController()