import {Button, Divider, Typography} from "@mui/material";
import "../styles/Home.css";
import AddPresentationModal from "./AddPresentationModal";
import {useState} from "react";

export default function Home() {
    const [openPresentation, setOpenPresentation] = useState(false);

    return <>
        <Typography variant='h3'>
            Menti - UNQ
        </Typography>
        <Divider/>
        <div className={"home-container"}>
            <Button onClick={() => setOpenPresentation(true)}>Agregar presentación</Button>
            <AddPresentationModal isOpen={openPresentation} setIsOpen={setOpenPresentation}/>
        </div>
    </>
}