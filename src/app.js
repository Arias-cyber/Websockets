import express, { json, urlencoded } from 'express'
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import viewsRouter from './routes/views.router.js'

// handlebars__
import handlebars from 'express-handlebars'
// handlebars___



// socket io _______________________________________________________________

import Server from 'socket.io'
// socket io _______________________________________________________________



const app = express()
const PORT = 8080

app.use(json())
app.use(urlencoded({extended:true}))


// handlebars_______________________________________________________________
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

// handlebars___

// http://localhost:8080/
app.use('/', viewsRouter)


// http://localhost:8080/api/products
app.use('/api/products',productsRouter)

// http://localhost:8080/api/products
app.use('/api/carts',cartsRouter)





////////////////////////
const httpServer = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${httpServer.address().port }`)
})

// instanciando socket
const io = new Server(httpServer)


const mensajes = [
    // {user: 'Fede', message: 'Hola como están'}
]
let connectedClients = []

io.on('connection', socket => {
    // console.log('Nuevo cliente conectado')
    connectedClients.push(socket)
    console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)

    socket.on('message', data => {
        console.log('message',data)
        mensajes.push(data)
        io.emit('messageLogs', mensajes)
        // persisti 
    })

    socket.on('authenticated', data => {
        
        socket.broadcast.emit('newUserConnected', data)
    })
    
    socket.on('disconnect',()=>{
        connectedClients = connectedClients.filter((client) => client !== socket)
        console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
    })
})



