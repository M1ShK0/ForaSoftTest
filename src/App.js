import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Header from "./elements/Header";
import Footer from "./elements/Footer";
import ListCard from "./elements/ListCards";
import Game from "./elements/Game";
// стиль основного элемента страницы
const StyleWrapper = {
    wrapper:{
        maxWidth: 960,
        margin: 'auto'
    }
};

// создаем сокет, через который будет производится соединение с сервером
const socket = socketIOClient("http://127.0.0.1:4001");


/**
 *
 * Далее идут методы, вешающие обработчики на события, посылаемые и отправляемые серверу(ом)
 * Эти обработчики вызываются единожды при инициализацаа основного объекта приложения
 * Каждый раз при получении события вызвается функция, которая была передана в качестве параметра из конструктора
 */
function ClientGetMessangeConfirm(callback){

    // событие подтверждения доставки сообщения. Если сообщение не было доставлено, то вместо имени получателя
    // выведется Not connected
    socket.on('confirmToClients', function(msg){


        callback(msg.messenge,(msg.name==="NOT"?"Not connected":"You"));
    });
}


function ClientGetMessange(callback){

    // получение сообщения от соперника
    socket.on('MessengeForMy', function(msg){

        console.log(msg.messenge,msg.name);
        callback(msg.messenge,("Your adversary"));
    });
}


function ClientGetName(callback){

    //получение собственного кодового имени
    socket.on('userName', function(userName){
        console.log('You\'r username is => ' + userName); // Вывод имени в консоль
        callback(userName)
    });

}

function ClientConnectAdv(callback){
    // соперник присоединился
    socket.on('ConnectNewAdv', function(){

        callback()
    });

}

function ConfirmSel(callback){

    // подверждение выбора карточки( при выборе отправляется название карточки на сервер,
    // и он отправляет поддтверждение, что карточка была принята)
    socket.on('confirmSel', function(){

        callback()
    });
}

function AdvSel(callback){
    // противник выбрал карточку. Можно выводить результат
    socket.on('selectAdv', function(card){

        callback(card.card, card.res)
    });
}

function AgainConfirm(callback){
    // поддтверждение реванша(когда оба пользвоателя согласны)
    socket.on('againConfirm', function(){

        callback()
    });
}

function DisconnectAdv(callback){

    // если соперник внезапно отключился)
    socket.on('discAdv', function(){

        callback()
    });
}





class App extends Component {


    constructor(props) {

        super(props);

        //инициализация звука приходящего сообщения
        this.url = "/audio/sms.mp3";
        this.messenge = new Audio(this.url);


        ClientGetMessangeConfirm((msg,name) => {
            // пришло поддтверждение доставки сообщения. Добавляем в массив сообщений новое
            this.state.Messenges.unshift({Messenge:msg, Name:name});
            // обновляем измененные элементы
            this.setState({})
        });


        ClientGetName((Name) => {
            // получили кодовое имя - устанавливаем его
            this.setState({Name})
        });


        ClientGetMessange((msg,name) => {
             // получили сообщение - проиграли звук, добавили в массив сообщений, обновили элементы
            this.messenge.play();
            this.state.Messenges.unshift({Messenge:msg, Name:name});
            this.setState({})
        });

        ClientConnectAdv(() => {
            // когда присоединился соперник, говорим пользователю о том, что он присоедилися и разрешаем выбор карточки
            this.setState({textForEvent:'Opponent with you! Make your choice ', resolutionSelect:true})
        })


        ConfirmSel(()=>{
            // пришло поддтверждение выбора - выводим сообщение, запрещаем повторный выбор
            this.setState({
                textForEvent:'The choice is made! Expect the opponent\'s response ',
                selectFlag:true
            })
        })

        AgainConfirm(()=>{
            // соперник поддтвердил реванш. Возвращаем начальные настройки
            this.setState({
                textForEvent:'Opponent with you! Make your choice',
                resolutionSelect:true,
                selectFlag:false,
            })
        })
        AdvSel((card,res)=>{

            // оба выбрали карточки. Выбираем, что вывести для соперника
            switch(card){
                case 'Rock':
                    this.setAdvCard(card,'https://obrjadymagii.ru/wp-content/uploads/2016/03/biryuza_3_15062620.jpg');
                    break;
                case 'Scissors':
                    this.setAdvCard(card,'http://clecar.ru/fail/nozji.png');
                    break;
                case 'Paper':
                    this.setAdvCard(card,'http://www.playcast.ru/uploads/2013/10/31/6443196.png');
                    break;
                case 'Lizard':this.setAdvCard(card,'https://emojio.ru/images/apple-b/1f98e.png');
                    break;
                case 'Spock':this.setAdvCard(card,'https://cs4.pikabu.ru/images/previews_comm/2015-02_6/14251541939560.png');
                    break;
            }
            // В зависимости от результата обновляем счет и сообщеам об этом пользователям
            if(res == "draw"){
                this.setState({
                    textForEvent:'This time draw. Try it again!',
                    win:'Yes',
                })
            }else
            if(res){
            this.setState({
                textForEvent:'Hurray, you won! Try it again!',
                win:'Yes',
                scoreArr:[this.state.scoreArr[0]+1,this.state.scoreArr[1]],
                score:"Score: "+(this.state.scoreArr[0]+1)+ ":"+(this.state.scoreArr[1])
            })
            }else {
                this.setState({
                    textForEvent:'At this time, lucky opponent. Try it again!',
                    win:'No',
                    scoreArr:[this.state.scoreArr[0],this.state.scoreArr[1]+1],
                    score:"Score: "+(this.state.scoreArr[0])+ ":"+(this.state.scoreArr[1]+1)
                })
            }



        })

        DisconnectAdv(()=>{
            // соперник отключился. Возвращаемся к первоначальным настройкам и ждем нового

            this.setState({
                 textForEvent:'The rival came out. Wait for the new',
                win:'wait',
                scoreArr:[0,0],
                score:"Score: "+0+ ":"+0 ,
                resolutionSelect:false,
                selectFlag:false,
                myCard:{name: '???', img:'https://avatanplus.com/files/resources/mid/58ccbf1c247e315adfca85f5.png',  textButton:"You", thisSel:true},
                victimCard:{name: '???', img:'https://avatanplus.com/files/resources/mid/58ccbf1c247e315adfca85f5.png', textButton:"Adversary", thisSel:true},

            })
        })
    }




    setAdvCard(name,url){
        // заносит в основной массив карточку соперника
        this.setState({
            victimCard:{name: name, img:url,  textButton:"Adversary", thisSel:true},

        });


    }


  state = {
      Name:"",// кодовое имя
     cards: [ // Карточки для выбора
          {name: 'Rock', img:'https://obrjadymagii.ru/wp-content/uploads/2016/03/biryuza_3_15062620.jpg', textButton:"SELECT", thisSel:false},
          {name: 'Scissors', img:'http://clecar.ru/fail/nozji.png', textButton:"SELECT", thisSel:false},
          {name: 'Paper', img:'http://www.playcast.ru/uploads/2013/10/31/6443196.png', textButton:"SELECT", thisSel:false},
          {name: 'Lizard', img:'https://emojio.ru/images/apple-b/1f98e.png', textButton:"SELECT", thisSel:false},
          {name: 'Spock', img:'https://cs4.pikabu.ru/images/previews_comm/2015-02_6/14251541939560.png' ,textButton:"SELECT", thisSel:false},
     ],//карта пользователя и карта противника
      myCard:{name: '???', img:'https://avatanplus.com/files/resources/mid/58ccbf1c247e315adfca85f5.png',  textButton:"You", thisSel:true},
      victimCard:{name: '???', img:'https://avatanplus.com/files/resources/mid/58ccbf1c247e315adfca85f5.png', textButton:"Adversary", thisSel:true},

      // сюда записываются приходящие сообщения
      Messenges :[
      ],
      textForEvent:"Your opponent has not connected yet",
      score:'Score: 0:0',
      scoreArr:[0,0],
      messengeInputClient:null,
      resolutionSelect:false,
      selectFlag:false,
      win:"wait"

  }

  changeMessengeInputClient(messenge=""){

        //Запоминаем, что пользователь пишет в поле для ввода
      this.setState( {messengeInputClient:messenge})
  }


  setMyCard(name,url){
        // Если данное состояние игры позволяет - устанавливаем карточку для этого пользователя
        if(this.state.selectFlag) return;

        this.setState({
            myCard:{name: name, img:url,  textButton:"You", thisSel:true}
        });

        // посылаем на сервер "я выбрал"
        socket.emit('chose', {name:name});
    }

    again(){
           // устанавливаем начальные настройки
        this.setState({
            textForEvent:'A new fight. Expect the opponent\'s confirmation',
            win:'wait',
            myCard:{name: '???', img:'https://avatanplus.com/files/resources/mid/58ccbf1c247e315adfca85f5.png',  textButton:"You", thisSel:true},
            victimCard:{name: '???', img:'https://avatanplus.com/files/resources/mid/58ccbf1c247e315adfca85f5.png', textButton:"Adversary", thisSel:true},
            // selectFlag:false,
            // resolutionSelect:false,
        });
        //отправляем предложение о реванше
        socket.emit('again',{});

    }
  Selecting(name){

        // в зависимости от выбора пользователя отображаем выбранную карточку в специальном поле
        switch(name){
            case 'Rock':
                this.setMyCard(name,'https://obrjadymagii.ru/wp-content/uploads/2016/03/biryuza_3_15062620.jpg');
                break;
            case 'Scissors':
                this.setMyCard(name,'http://clecar.ru/fail/nozji.png');
                break;
            case 'Paper':
                this.setMyCard(name,'http://www.playcast.ru/uploads/2013/10/31/6443196.png');
                break;
            case 'Lizard':this.setMyCard(name,'https://emojio.ru/images/apple-b/1f98e.png');
                break;
            case 'Spock':this.setMyCard(name,'https://cs4.pikabu.ru/images/previews_comm/2015-02_6/14251541939560.png');
                break;
        }



  }


  render() {



    return (
        <div id="wrapper" style={StyleWrapper.wrapper}>
            <Header />
            <hr/>


            <Game obj={this} socket={socket}/>
            <ListCard obj={this} state = {this.state} />

            <Footer/>
        </div>


      
    );
  }
}

export default (App);
