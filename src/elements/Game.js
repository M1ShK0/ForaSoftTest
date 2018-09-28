import Chat from "./Chat";
import GameField from "./GameField";
import React from "react";




export default function Game(prop){
    return(
        <div className="Game">
            {/*// Игровое поле - на нем отображаются выбранные карточки, результаты и видео*/}
            <GameField obj={prop.obj}/>
            {/*// Чат*/}
            <Chat obj={prop.obj} socket={prop.socket} />
        </div>
    )
}