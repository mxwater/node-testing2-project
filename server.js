const express = require("express")
const server = express()
const songsRouter = require('./api/songs-router') 

server.use(express.json())
server.use('/songs', songsRouter)

module.exports = server
