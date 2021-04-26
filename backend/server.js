require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://havecom:12345@cluster0.xo4vd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
app.use(cors());
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const UserRouter = require('./routes/user')
app.use('/user', UserRouter)

const productRouter = require('./routes/product')
app.use('/product',productRouter)

const cartRouter = require('./routes/cart')
app.use('/cart',cartRouter)

const buy_historyRouter = require('./routes/buy_history')
app.use('/buy_history',buy_historyRouter)

app.listen(3000, () => console.log('Server Started'))