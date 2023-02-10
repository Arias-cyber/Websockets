import { response, Router } from 'express'
import ProductManager from "../ProductManager.js";

const router = Router()


const productManager = new ProductManager('./src/files/Products1.json') 


// get http://localhost:8080/api/products
router.get('/',  async (req, res) => {
    const products = await productManager.getProducts();
    const {limit} = req.query
    if (!limit || limit ===0 ){
       return  res.send(products)
    }
    
    const limitProducts = products.slice(0,limit)
    res.send(limitProducts)
}) 

// get http://localhost:8080/api/products/:pid
router.get('/:pid', async (req, res) => {
    const {pid} = req.params
    const id = parseInt(pid);
    const product = await productManager.getProductById(id)      
    res.send(product)
})


// POST http://localhost:8080/api/products /
router.post('/', async (request, response) =>{

    const newProduct = request.body
    const result = await productManager.addProduct(newProduct)
    response.status(201).send(result)
})

// PUT http://localhost:8080/api/products/:pid
router.put('/:pid', async (req, res) =>{
    const { pid } = req.params
    const id = parseInt(pid);
    const upProduct = req.body
    const result= await productManager.updateProduct(id,upProduct)
    res.status(201).send(result)
})

// DELETE http://localhost:8080/api/products/:pid
router.delete('/:pid', async (req, res) => {
    const {pid} = req.params
    const id = parseInt(pid);
    const product = await productManager.deleteProduct(id)      
    res.send(product)
})


export default router