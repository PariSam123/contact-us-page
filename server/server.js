require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { StatusCodes } = require("http-status-codes")
const connectDb = require('./db/connect')

const PORT = process.env.PORT
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use(`/api/v1`, require('./route/route'))

app.all('*', async (req,res) => {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `requested path not found. `})
})
app.listen(PORT, async () => {
    await connectDb()
    console.log(`server is started @ http://localhost:${PORT}`)
})