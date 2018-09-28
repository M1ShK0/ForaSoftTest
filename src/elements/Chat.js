import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Button from "@material-ui/core/Button/Button";
import React from "react";


const StyleChat={
    GameChat:{

        backgroundImage:'url(https://images.template.net/wp-content/uploads/2015/11/25190558/Plain-Dark-Blue-Background-Images-Download.jpg)',
        borderRadius:5,
        width:300,

        marginLeft:10,
        height:300,
        marginBottom:10,
        display:'inline-block',
        verticalAlign: 'top',

        // @media screen and (max-width: 960px) {
        //
        // }

    },
    ChatTable:{
        width:'100%',
        height:150
    },
    Mess:{
        width:'100%',
        height:300,
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
    Button:{
        marginLeft:15,
        backgroundColor:'rgba(16, 0, 171, 0.84)'
    },
    input:{
        marginLeft:10
    },
    Messenge:{
        width:'70%'

    },
    Name:{
        width:'20%'
    },
    row: {

    }
};

export default  function Chat(prop){

    //Отправка сообщений чата на сервер
    function sendMess(){
        prop.socket.emit('message', {name:prop.obj.state.Name,mess:prop.obj.state.messengeInputClient});

    }

    //Записывает текст из поля ввода сообщения в основной массив приложения
    function setValueInput(ev){
        let value = ev.target.value;
        prop.obj.changeMessengeInputClient(value);
    }


    return(
        // Поле отображения сообщений чата
        <div className="GameChat" style={StyleChat.GameChat}>
            <div className="Mess" style={StyleChat.Mess}>
                <Table  style={StyleChat.ChatTable}>
                    <TableHead style={StyleChat.row}>
                        <TableRow>
                            <TableCell  style={StyleChat.Messenge} >Messenge</TableCell>
                            <TableCell style={StyleChat.Name}>Name</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prop.obj.state.Messenges.map((row,i) => {
                            return (
                                <TableRow style={StyleChat.row} key={(i+row.Name+row.Messenge).trim()}>
                                    <TableCell style={StyleChat.Messenge}  component="td" scope="row">
                                        {row.Messenge}
                                    </TableCell>
                                    <TableCell style={StyleChat.Name}>{row.Name}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {/*//Поле для вводе сообщения*/}
            <label>
                <input onChange={(ev)=>setValueInput(ev)} style={StyleChat.input} type="text" />
            </label>

            {/*//Кнопка отправки сообщения*/}
            <Button onClick={()=>sendMess()} style={StyleChat.Button} size="small" variant="contained" color="primary">Send</Button>



        </div>
    )
}

