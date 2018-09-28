import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import React from "react";

const StyleMediaCard ={
    image:{
        height:100,
        width:100
    },
    card:{
        marginLeft:25,
        width:100,
        border: '1px solid #ccc',
        display:'inline-block',
        backgroundImage:"url(https://us.123rf.com/450wm/ardely/ardely1606/ardely160600027/59161275-abstract-irregular-polygon-background-with-a-triangular-pattern-in-spectrum-color-full-rainbow-color.jpg?ver=6)"
    },
    button:{
        width:100
    },
    content:{
        width:100
    }
}

// карточки с вариантами выбора
export default function MediaCard(props) {
    const classes ={
        card:"card",
        media:"media",
        ItemName:"ItemName"
    };

    // Создаем звук нажатия на кнопку
    let url = "/audio/clickButton.mp3";
    let audio = new Audio(url);

    //если выбор в данный момент разрешен
    if(props.obj?props.obj.state.resolutionSelect:false)
    return (
        // добавляем карточку по данным из основного массива приложения.
        // В данном случае добаляется дополнительный обработчик на кнопку выбора карточки,
        // который вызывает метод инициализации выбора основного объекта
        <Card id={props.card.name} className={classes.card} style ={StyleMediaCard.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.card.img}
                    title="Contemplative Reptile"
                    style = {StyleMediaCard.image}
                />
                <CardContent >
                    <Typography className={classes.ItemName}  variant="subheading" component="h5">
                        {props.card.name}
                    </Typography>
                    <Typography component="p">

                    </Typography>
                </CardContent>
            </CardActionArea>
                                        {/*// проигрываем звук и запускаем метод */}
            <Button onClick={()=>{ audio.play(); props.obj.Selecting(props.card.name)} } size="small" variant="outlined" color="primary" style ={StyleMediaCard.button}>
                {props.card.textButton}
            </Button>

        </Card>

            // если выбор запрещен
    );else return (
            //добавляем карточку, но обработчик только для звука
        <Card id={props.card.name} className={classes.card} style ={StyleMediaCard.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.card.img}
                    title="Contemplative Reptile"
                    style = {StyleMediaCard.image}
                />
                <CardContent >
                    <Typography className={classes.ItemName}  variant="subheading" component="h5">
                        {props.card.name}
                    </Typography>
                    <Typography component="p">

                    </Typography>
                </CardContent>
            </CardActionArea>

            <Button onClick={()=>{audio.play();}} size="small" variant="outlined" color="primary" style ={StyleMediaCard.button}>
                {props.card.textButton}
            </Button>

        </Card>
    );
}

