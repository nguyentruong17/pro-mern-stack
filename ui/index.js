const express = require('express')
const app = express()

app.use(express.static('public'))

require('dotenv').config()
const PORT = process.env.UI_SERVER_PORT || 3000
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8000/graphql';
//const API_ENDPOINT = 'http://localhost:4000/graphql';
const ENV = { API_ENDPOINT }

app.get('/env.js', (req, res) => {
    res.send(`window.ENV = ${JSON.stringify(ENV)}`)
})

app.listen(PORT, () => {
    console.log(`UI Server started on port ${PORT}`)
})
