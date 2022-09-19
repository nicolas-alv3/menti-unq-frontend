import * as React from 'react';
import QModal from "./utils/QModal";
import {Box, Button, Chip, TextField} from "@mui/material";

export default function AddSlideModal({ onAdd, open, setOpen }) {
    const [question, setQuestion] = React.useState("");
    const [option, setOption] = React.useState("");
    const [options, setOptions] = React.useState([]);

    const handleOptionSubmit = () => {
        if(option && !options.includes(option)) {
            setOptions(prevState => prevState.concat([option]));
            setOption("");
        }
    }

    const handleOnConfirm = () => {
        if(options.length && question) {
            onAdd({question, options});
            resetForm();
        }
    }

    const resetForm = () => {
        setQuestion("");
        setOptions("");
    }

    return <>
        <QModal title={"Agregar diapositiva"} open={open} setOpen={setOpen} confirmText={"Aceptar"} onConfirm={handleOnConfirm}>
            <Box component="form" sx={{
                margin: "16px 0",
                width: '25ch',
            }}
                 spacing={2}
                 noValidate
                 autoComplete="off">
                <TextField label="Pregunta" variant="standard" value={question}
                           onChange={e => setQuestion(e.target.value)}/>
                <TextField label="Opciones" variant="standard" value={option} onChange={e => setOption(e.target.value)}/>
                <Button variant={"outlined"} onClick={handleOptionSubmit}>Agregar opcion</Button>
            </Box>
            {
                options.length ?
                    options.map(o => <Chip label={o} />)
                    :
                    "No hay opciones"
            }
        </QModal>
    </>;
}
