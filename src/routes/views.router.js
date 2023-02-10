import ProductManager from "../ProductManager.js";



const productManager = new ProductManager('./src/files/Products1.json') 
const router = Router()


router.get('/', async (req, res)=>{  
    const products = await productManager.getProducts();  
    res.render('home', { products })
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})

export default router


