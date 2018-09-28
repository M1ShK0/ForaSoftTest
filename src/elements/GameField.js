import React from "react";
import MediaCard from "./MediaCard";


const StyleField={
    GameField:{
        backgroundColor: 'rgba(89, 174, 194, 0.43)',
        border: '1px solid rgb(204, 204, 204)',
        borderRadius:5,
        width:648,
        height:300,
        marginBottom:10,
        display:'inline-block',

    },
    mediaCard:{
        marginTop:20,
        display:'inline-block',
        float:'left'
    },
    resultBlock:{

        marginTop:90,
        marginLeft:25,
        display:'inline-block',
        width:50,
        height: 50,
        backgroundImage:'url(https://cdn2.iconfinder.com/data/icons/bold-ui/100/reload-512.png)',
        backgroundColor:'rgba(0, 187, 255, 0.46)',
        backgroundSize: 'cover',
        borderRadius: 20,
        border: '1px solid rgb(204, 204, 204)',
        float:'left'
    },
    waitBlock:{
        // marginBottom:80,
        // marginLeft:25,
        // display:'inline-block',
        // width:50,
        // height: 50,
        // borderRadius: 20,

        marginTop:90,
        marginLeft:25,
        display:'inline-block',
        width:50,
        height: 50,
        //backgroundImage:'url(https://cdn2.iconfinder.com/data/icons/bold-ui/100/reload-512.png)',
        backgroundColor:'rgba(0, 187, 255, 0.46)',
        backgroundSize: 'cover',
        borderRadius: 20,
        border: '1px solid rgb(204, 204, 204)',
        float:'left'
    },
    eventsMess:{
        marginTop:20,
        marginLeft:25,
        marginRight:25,

        backgroundColor:'rgba(0, 187, 255, 0.46)',
        display: 'inline-block',
        border: '1px solid rgb(204, 204, 204)',
        borderRadius:5,
        float:'left'
    },
    video:{

       marginTop:20,
        marginRight:20,
        display: 'inline-block',
        width:270,
        height:190,
        borderRadius:5,
        backgroundColor:'rgba(0, 187, 255, 0.46)',
        border: '1px solid rgb(204, 204, 204)',
        float:'right',
        marginBottom:20,
    },
    score:{
        marginLeft:25,
        marginRight:25,

        backgroundColor:'rgba(0, 187, 255, 0.46)',
        display: 'inline-block',
        border: '1px solid rgb(204, 204, 204)',
        borderRadius:5,
        float:'right'
    }
}


export default  function  GameField(prop){
    //Карта этого пользователя
    const myCard =prop.obj.state.myCard;
    // Карта противника
    const victimCard =prop.obj.state.victimCard;

    // показывает в каком состоянии на данный момент находится игра-
    // 1) wait - ожидание (Противники еще не выбрали свои карточки на этом  ходу
    // 2) yea - этот пользователь победил
    // 3) no - этот пользователь проиграл
    let win = prop.obj.state.win;

    let resBlock;

        // если пользователь проиграл, появляется кнопка для предложения реваша
    switch(win){
        case 'wait':resBlock=<div style={StyleField.waitBlock }> </div> ;break;
        case 'Yes':resBlock=<div onClick ={()=>prop.obj.again()} style={StyleField.resultBlock }> </div> ;break;
        case 'No':resBlock=<div onClick ={()=>prop.obj.again()}  style={StyleField.resultBlock }> </div> ;break;
    }



    return(
        <div className="GameField" style={StyleField.GameField}>

                {/*//Карта этого пользователя*/}
                <div style={StyleField.mediaCard}>
                    <MediaCard
                        card ={myCard}
                        key = {"MyCard"}
                    />
                </div>

                 {/*//Кнопка реванша*/}
               {resBlock}

               {/*//Карта противника*/}
                <div style={StyleField.mediaCard}>
                    <MediaCard
                        card ={victimCard}
                        key = {"MyCard"}
                    />
                </div>

                {/*//Видео с веб-камеры*/}
                <div id="video" style={StyleField.video}>

                </div>


                {/*// поле с пояснительным текстом  - что требуется делать дальше*/}
                <div style={StyleField.eventsMess}>
                    <div>
                        {prop.obj.state.textForEvent}
                    </div>
                </div>
                {/*// текущий счет с этим противником*/}
                <div style={StyleField.score}>
                    <div>
                        {prop.obj.state.score}
                    </div>
                </div>
        </div>
    )
}
