//Комната
class Room{
		constructor(){
			//массив пользователей
			this.Users = [];
		}

}

Room.prototype.push_user = function (user){
		//Возвращаем ошибку, если пользователей уже 2
		if( this.Users.length == 2){
			return -1;
		}else {

			// связываем пользователя и комнату
            user.setRoom(this);
            // разрешаем пользователю слушать события
			user.list();
			// добавляем пользователя в массив пользователей комнаты
			this.Users.push(user);
			// если теперь стало 2 пользователя, отправляем событие "теперь можно начинать игру"
            if(this.Users.length==2) {
                this.Users[0].socket.emit('ConnectNewAdv', {});
                this.Users[1].socket.emit('ConnectNewAdv', {});
            }
			return 0;
		}

};

module.exports = Room;