
let Room = require('../room/room.class.js');
//Игры
class Games{

		constructor(){

		}

}
//статичная переменная, хранит все существующие комнаты
Games.GamesArr = [];






Games.prototype.connect_user = function (user){
		// при присоединении пользвоателя проверяем
		let user_flag = false; // в комнате ли пользователь
		//проверяем есть ли свободные места в существующих комнатах
		for(let key in Games.GamesArr )
			if(Games.GamesArr[key].push_user(user,Games.GamesArr[key]) == 0){
				user_flag=true;
				return;
			}
			//если ни одной комнаты с одним игроком не нашлось
			//создаем новую комнату
			let _Room = new Room();
			_Room.push_user(user,_Room);
            user.setRoom(_Room);
            // отправляем комнату в массив комнат
    		Games.GamesArr.push(_Room);
};
module.exports = Games;