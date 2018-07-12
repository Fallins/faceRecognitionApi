import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import apis from './routes/apis'

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/api', apis)

const PORT = process.env.PORT || 3485
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})