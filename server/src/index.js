const express = require('express')
require('./db/mangoose')
const userRouter = require('./routers/usersRouter')
const productRouter = require('./routers/productRouter')
const outletRouter = require('./routers/outletRouter')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use(outletRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
})