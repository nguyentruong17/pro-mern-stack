const express = require('express')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware')

app.use(express.static('public'))

require('dotenv').config()
const PORT = process.env.UI_SERVER_PORT || 3000
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8000/graphql';
const API_PROXY_TARGET = process.env.API_PROXY_TARGET
//const API_ENDPOINT = 'http://localhost:4000/graphql';
const ENV = { API_ENDPOINT }

if(API_PROXY_TARGET){
    app.use('/graphql', createProxyMiddleware({ target: API_PROXY_TARGET }))
}

app.get('/env.js', (req, res) => {
    res.send(`window.ENV = ${JSON.stringify(ENV)}`)
})

app.listen(PORT, () => {
    console.log(`UI Server started on port ${PORT}`)
})
