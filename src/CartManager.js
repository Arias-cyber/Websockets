import fs from 'fs'

class CartManger{
    constructor(path){
        this.path = path;
    }

    auxiliar = async (carts) => {
        fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    }

    getCarts = async () => {
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const carts = JSON.parse(data);
                return carts;
            }
            await fs.promises.writeFile(this.path,'[]','utf-8')
            return []
        } catch(error){
            console.log(error)
        }
    }

    addCart = async() => {
        const carts = await this.getCarts();

        const newCart={

        }
        newCart.id = carts.length ? carts[carts.length - 1].id + 1 : 1;
        newCart.products = []
        carts.push(newCart);
        await this.auxiliar(carts);
        return 'Saved';
    }

    getCartById = async (id) =>{
        const carts = await this.getCarts();

        const cartDb= carts.find(cart => cart.id ===id)
        if(!cartDb){

            return `Cart Not found`;
        } 
        return cartDb

    }


    addProductToCart = async (cid,pid) =>{
        const carts = await this.getCarts();
        const index= carts.findIndex(cart => cart.id === cid)
        if(index === -1){

            return ` Cart Not found`;
        } 
        const index2= carts[index].products.findIndex(productaux => productaux.product ===pid)
        if(index2 === -1){

            const newProduct={
                "product": pid,
				"quantity": 1
            }
            carts[index].products.push(newProduct);
            await this.auxiliar(carts);
            return 'Added';
        } 
        carts[index].products[index2].quantity += 1
        await fs.promises.unlink(this.path);
        await this.auxiliar(carts);
        return 'Added';

    }

}

export default CartManger;