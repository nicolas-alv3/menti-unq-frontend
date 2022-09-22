import * as React from 'react';
import QModal from "./utils/QModal";
import {Box, Button, Divider, TextField, Typography} from "@mui/material";
import AddSlideModal from "./AddSlideModal";
import '../styles/AddPresentationModal.css';
import EditIcon from '@mui/icons-material/Edit';
import PresentationService from "../service/PresentationService";

function SlideBox({slide}) {
    return <Box className={"slide-box"}>
        <EditIcon />
        <Typography variant={"h6"}>{slide.question}</Typography>
        Opciones: {slide.options.toString()}
    </Box>;
}

export default function AddPresentationModal( {isOpen, setIsOpen} ) {
    const [name, setName] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [slides, setSlides] = React.useState([]);

    const handleAddSlide = slide => setSlides(prevState => prevState.concat([slide]));

    const handlePresentationCofirm = () => {
        PresentationService.create({name, slides})
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        resetForm();
    }

    const resetForm = () => {
        setName("");
        setSlides([]);
    }

    return <>
        <QModal title="Crear presentación" open={isOpen} setOpen={setIsOpen} onConfirm={handlePresentationCofirm}>
            <Box component="form" sx={{
                margin: "16px 0",
                width: '25ch',
            }}
                 spacing={2}
                 noValidate
                 autoComplete="off">
                <TextField label="Nombre" variant="standard" value={name} onChange={e => setName(e.target.value)}/>
            </Box>
            <Typography variant='h6'>
                Diapositiva
            </Typography>
            <Divider/>
            {!slides.length && "No hay diapositivas"}
            {
                slides.map(s => <SlideBox key={s.question} slide={s} />)
            }
            <Button onClick={() => setOpen(true)}>Agregar diapositiva</Button>
            <AddSlideModal open={open} setOpen={setOpen} onAdd={handleAddSlide}/>
        </QModal>
    </>;
}
