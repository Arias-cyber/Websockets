import { response, Router } from 'express'
import CartManager from "../CartManager.js";

const router = Router()

const cartManager = new CartManager('./src/files/Carts.json') 

// POST http://localhost:8080/api/carts/
router.post('/', async (request, response) =>{
    const result = await cartManager.addCart()
    response.status(201).send(result)
})

// GET http://localhost:8080/api/carts/:cid
router.get('/:cid', async (req, res) => {
    const {cid} = req.params
    const id = parseInt(cid);
    const cart = await cartManager.getCartById(id)      
    res.send(cart)
})


// POST http://localhost:8080/api/carts/:cid/product/:pid 
router.post('/:cid/product/:pid', async (request, response) =>{
    const {cid} = request.params;
    const {pid} = request.params;
    const idc = parseInt(cid)
    const idp = parseInt(pid)

    const result = await cartManager.addProductToCart(idc,idp)      
    response.send(result)
})

export default router