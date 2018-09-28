import MediaCard from "./MediaCard";
import React from "react";

const StyleListCard ={
    listCard:{
        maxWidth: 650,
        align: 'center'
    }
}
    //список с карточками для выбора
export default  function ListCard(prop){


    return (
        <div className ="ListCards" style={StyleListCard.listCard}>
            {
                // добавляем в список сами карточки
                prop.state.cards.map(card => {
                    if(card.thisSel) return null;
                    return (
                        <MediaCard
                            obj ={prop.obj}
                            card ={card}
                            key = {card.name}
                        />
                    )
                })
            }
        </div>
    )
}
