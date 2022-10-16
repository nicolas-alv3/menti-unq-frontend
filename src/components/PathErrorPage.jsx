import {Typography} from "@mui/material";
import React from "react";

export default function PathErrorPage() {
    return <>
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <Typography style={{margin: "1em"}} variant='h3'>Menti UNQ</Typography>
            <Typography style={{margin: "1em"}} variant='h5'>Hmm, parece que la URL es inválida</Typography>
        </div>
    </>
}