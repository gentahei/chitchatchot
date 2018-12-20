var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port = 8000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('index')
})

io.on('connect', (socket) => {
    socket.on('new_message', (data) => {
        io.emit('new_message', { username : data.username, message : data.message, colour: data.colour })
    })
})

http.listen(port, () => {
    console.log('App running on port', + port)
})
