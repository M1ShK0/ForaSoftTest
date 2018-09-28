
let Games = require('../games/games.class.js');



// Пользователь
class User{



		constructor(socket){
		    // запоминаем сокет
			this.socket = socket;
			// присваиваем пользователю кодовое имя
			this.name = 'U' + (this.socket.id).toString().substr(1,4);
			// инициализируем поля класса
            this.myRoom=[];
            this.myCard = null;
            this.againFlag = false;

            // добавляем пользователя в массив всех пользователей
            User.ArrUsers[this.name] = this;


            // отправляем пользователю его кодовое имя
			this.socket.emit('userName', this.name);

		}
        // Получение результата - сравниваем выбранные карточки пользователей и решаем, кто из них победил
         getResult(myCard, advCard){
        switch (myCard) {
            case 'Rock':
                if(
                    advCard == 'Scissors' ||
                    advCard == 'Lizard'
                ){
                    return true;
                }
                else {
                    return false;
                }

                break;
            case 'Scissors':
                if(
                    advCard == 'Paper' ||
                    advCard == 'Lizard'
                ){
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 'Paper':
                if(
                    advCard == 'Rock' ||
                    advCard == 'Spock'
                ){
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 'Lizard':
                if(
                    advCard == 'Spock' ||
                    advCard == 'Paper'
                ){
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 'Spock':
                if(
                    advCard == 'Rock' ||
                    advCard == 'Scissors'
                ){
                    return true;
                }
                else {
                    return false;
                }
                break;
        }

    }
		list(){
                // пришло сообщение
            this.socket.on('message', function(msg){


                let _user = User.ArrUsers[msg.name];
                let _room = _user.myRoom.Users;

                let _socket = _user.socket;

                    // Проверяем какой по счету в комнате противник и отправляем ему сообщение, а отправителю - подтверждение либо ошибку
                if(_room[0] == _user){

                    if(_room[1]){

                        _room[1].socket.emit('MessengeForMy', {name:msg.name, messenge:msg.mess});
                        _socket.emit('confirmToClients', {name:_room[1].name, messenge:msg.mess});
                    }else{

                        _socket.emit('confirmToClients', {name:'NOT', messenge:msg.mess});
                    }
                }
                else
                if(_room[1] == _user){

                    if(_room[0]){
                        _room[0].socket.emit('MessengeForMy', {name:msg.name, messenge:msg.mess});
                        _socket.emit('confirmToClients', {name:_room[0].name, messenge:msg.mess});
                    }else{
                        _socket.emit('confirmToClients', {name:'NOT', messenge:msg.mess});
                    }
                }
``
            });

            // запоминаем этого пользователя, чтобы можно было обратиться к нему внутри обработчика события
            let self = this;


            // событие - выбор карточки
            this.socket.on('chose', function(nameCard){


                    // Устанавливаем карточку для пользователя
                    self.myCard = nameCard.name;

                    // комната пользователя
                    let _room = self.myRoom;


                    // определение, оба ли игрока выбрали карточки
                  function sel(numinroom,numinroomadv){

                      let i = _room.Users[numinroom];
                      let adv = _room.Users[numinroomadv];
                      // посылаем поддтверждение выбора
                      i.socket.emit('confirmSel', {});
                        // если у соперника уже выбрана карточкка, можно отправлять обоим результаты
                      if(adv.myCard?adv.myCard:false){

                          if(i.myCard==adv.myCard) {
                              i.socket.emit('selectAdv', {card:adv.myCard, res:"draw"});
                              adv.socket.emit('selectAdv', {card:i.myCard, res:!"draw"});
                              return;
                          }
                          let res = self.getResult(i.myCard, adv.myCard)
                          i.socket.emit('selectAdv', {card:adv.myCard, res:res});
                          adv.socket.emit('selectAdv', {card:i.myCard, res:!res});



                      }


                  }
                // определяем, какой по счету этот пользователь в комнате
                if(_room.Users[0]== self){
                    sel(0,1);
                }

                if(_room.Users[1] == self){
                    sel(1,0);
                }



            });

            // если какой-то из пользователей отсоединился
            this.socket.on('disconnect', function () {

                //эта комната
                let _room = self.myRoom;

                // определяем какой из пользователей остался, в зависимости от результата посылаем ему событие "твой противник вышел"
                // И удаляем вышедшего пользователя из комнаты

                if(_room.Users[0]== self){

                    _room.Users.shift();

                    if(_room.Users.length ==0)  {self.deleteRoom(_room);return;}
                    _room.Users[0].socket.emit('discAdv',{});

                }
                if(_room.Users[1] == self){
                    _room.Users.pop();

                    ///console.log( 2, _room , _room.Users.length);
                    if(_room.Users.length ==0) {self.deleteRoom(_room);return;}
                    _room.Users[0].socket.emit('discAdv',{});
                }
            });



            // запрос реванша
            this.socket.on('again', function () {
                self.againFlag = true;
                //установили, что это пользватель готов к реваншу

                let _room = self.myRoom;

                // если второй пользователь еще в комнате и он тоже готов, устанавливаем начальные настройки и отправляем событии "можно начинать игру снова"
                if(_room.Users[0].againFlag && _room.Users[1].againFlag){

                    _room.Users[0].againFlag =false;
                    _room.Users[1].againFlag =false;
                    _room.Users[0].myCard =null;
                    _room.Users[1].myCard =null;
                     _room.Users[0].socket.emit('againConfirm',{});
                     _room.Users[1].socket.emit('againConfirm',{});
                }
            });





        }

        // удаление комнаты из массива комнат
        deleteRoom(room){

            let funcRemuve = function(value,arr){

                let idx = arr.indexOf(value);



                if (idx != -1) {
                    return arr.splice(idx, 1);
                }
                return false;
            }
            funcRemuve(room,Games.GamesArr);
        }
        // установка комнаты для пользователя
        setRoom(room){
            this.myRoom= room;
        }
}

// массив всех пользователей
User.ArrUsers =[];




module.exports = User;
