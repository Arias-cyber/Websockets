//const fs = require('fs')
import fs from 'fs'



class ProductManager{

    constructor(path){
        this.path = path;
    }


    auxiliar = async (products) => {
        fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
    }

    getProducts = async () => {
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data);
                return products;
            }
            await fs.promises.writeFile(this.path,'[]','utf-8')
            return []
        } catch(error){
            console.log(error)
        }
    }

    addProduct = async(newProduct) => {
        const products = await this.getProducts();
        console.log(newProduct)
        if(Object.keys(newProduct).length === 0){
            return 'Debe ingresar un json'
        }

        if (!newProduct.title || !newProduct.description || !newProduct.price  ||  !newProduct.code || !newProduct.stock || !newProduct.status || !newProduct.category) {
            return 'Falta completar campos';
        }
        const existingProduct = products.find(product => product.code === newProduct.code);
        if (existingProduct) {
            return 'Error codigo ya cargado';
        }
        newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
        products.push(newProduct);
        await this.auxiliar(products);
        return 'Saved';
    }

    getProductById = async (id) =>{
        const products = await this.getProducts();

        const productDb= products.find(product => product.id ===id)
        if(!productDb){

            return `Not found`;
        } 
        return productDb

    }

    updateProduct = async(id,upProduct) =>{
        const products = await this.getProducts();
        const index= products.findIndex(product => product.id ===id)
        if(index === -1){

            return `Not found`;
        } 

        if (!upProduct.title || !upProduct.description || !upProduct.price  ||  !upProduct.code || !upProduct.stock || !upProduct.status || !upProduct.category) {
            return 'Falta completar campos';
        }

        //products.splice(index,1,upProduct);
        products[index]= upProduct
        products[index].id= id
        await fs.promises.unlink(this.path);
        await this.auxiliar(products);
        return `modified`;
    }

    deleteProduct = async(id) =>{
        const products = await this.getProducts();

        const index= products.findIndex(product => product.id ===id)
        if(index === -1){

            return `Not found`;
        } 
        products.splice(index,1);
        await fs.promises.unlink(this.path);
        await this.auxiliar(products);
        return `Delete`;        
        
    }

}

export default ProductManager;