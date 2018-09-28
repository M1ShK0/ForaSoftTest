


let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let User = require(__dirname +'/models/user/user.class.js');
let Games = require(__dirname +'/models/games/games.class.js');
let Game = new Games();


let port = 4001;
console.log('Start server');
server.listen(port);
console.log('Listen port: ',port);
app.use(express.static(__dirname + '/public'));





io.on('connection', function (socket) {
    // при присоединениии нового пользователя создаем объект пользователя и записываем его объект игры
    let _User = new User(socket);
    Game.connect_user(_User);

});



