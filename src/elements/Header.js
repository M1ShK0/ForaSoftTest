import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";

const StyleHeader ={
    header:{

        flexGrow: 1
    }
}
export default function Header(){
    return (
        <div className="header" style={StyleHeader.header}>

            <AppBar position="static">
                <Toolbar variant="dense" style={{backgroundColor:'rgba(16, 0, 171, 0.54)'}}>

                    <Typography variant="title" color="default">
                        Rock-Paper-Scissors-Spock-Lizard
                    </Typography>
                </Toolbar>
            </AppBar>

        </div>
    )
}
