import {Button, Container, Divider, Paper, Typography} from "@mui/material";
import "../styles/Home.css";
import AddPresentationModal from "./AddPresentationModal";
import {useState} from "react";

export default function Home() {
    const [openPresentation, setOpenPresentation] = useState(false);

    return <>
        <Container sx={{display: "flex", alignItems: "center", justifyContent: "center", padding: "7vh"}}>
            <Container sx={{padding: '3vh 3vh', width: '75vh', height: '75vh'}}>
                <Typography variant='h4'>
                    Obtené una mayor participacion de tu publico con slides interactivas.
                </Typography>
                <Typography sx={{color:'#4f4c45'}}variant='h6'>
                    ¡Vaya! Aun no tenes ninguna presentacion creada.Comenzá creando tu primera
                    presentacion
                </Typography>
                <Button sx={{backgroundColor: '#970C10', marginTop: '3em'}} variant='contained' onClick={() => setOpenPresentation(true)}>Crear presentación</Button>
            </Container>
            <AddPresentationModal isOpen={openPresentation} setIsOpen={setOpenPresentation}/>
        </Container>
    </>
}