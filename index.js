const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/style', express.static(__dirname + '/style'))
//route setup et envoyer le fichier
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {
    socket.username = 'anonymous'
    socket.on('message', (msg) => io.emit('message', {'user': socket.username, 'message': msg }))
    socket.on('join', (username) => {
        if (username != null) {
            socket.username = username
        }
        socket.broadcast.emit('message', { user: 'Server', 'message': socket.username + ' has joined the server !'})
    })
})

//setup http serveur
http.listen(3000, () => console.log('Le chat API est ouvert à la port 3000'))





