import React, {useEffect} from 'react';
import {useParams} from "react-router";
import PresentationService from "../../service/PresentationService";
import {Box, Button, Radio, Typography} from "@mui/material";
import {MCQOption} from "../MCQPanel";
import AnswerService from "../../service/AnswerService";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Check} from "@mui/icons-material";

function MCQVoteOption({id, text, selected, onClick}) {
    const styles = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: '1em',
        border: "1px solid lightgray",
        borderRadius: 2,
        padding: "6px",
        width: "20em",
        cursor: "pointer"
    }
    return <Box onClick={onClick} id={id} sx={styles}>
        <Radio checked={selected === id}/>
        <Typography variant='h6'>{text}</Typography>
    </Box>;
}

function SuccessScreen() {
    return <>
        <CheckCircleIcon color={"success"} sx={{ fontSize: 60 }}/>
        <Typography style={{marginBottom: "1em"}}
            variant='h5'>Registramos tu respuesta</Typography>
        <Typography style={{marginBottom: "1em"}}
                    variant='body1'>Espera a que el presentador cambie de diapositiva</Typography>
        <Typography style={{marginBottom: "2em"}}
                    variant='body2'>¿La diapositiva no ha cambiado?<Button>Recarga la pagina</Button></Typography>
    </>;
}

export function AnswerPresentationPage() {
    const [presentation, setPresentation] = React.useState(null);
    const [index, setIndex] = React.useState(0);
    const [selected, setSelected] = React.useState(-1);
    const [success, setSuccess] = React.useState(false);

    let {id} = useParams();

    useEffect(() => {
        PresentationService.getById(id)
            .then(setPresentation)
    }, [])

    const handleSubmit = () => {
        AnswerService.create(
            {
                values: [presentation.slides[index].options[selected]],
                questionId: presentation.slides[index].id
            }
        ).then(() => setSuccess(true))
    }

    return (
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <Typography style={{margin: "1em"}} variant='h3'>Menti UNQ</Typography>
            {
                success ? <SuccessScreen/>
                    :
                    <>
                        <Typography style={{marginBottom: "1em"}}
                                    variant='h5'>{presentation?.slides[index].question}</Typography>
                        <div>
                            {presentation?.slides[index].options.map((o, i) => <MCQVoteOption id={i} key={o} text={o}
                                                                                              selected={selected}
                                                                                              onClick={() => setSelected(i)}/>)}
                        </div>
                        <Button variant='contained' sx={{width: "24em"}} onClick={handleSubmit}>Enviar</Button>
                    </>
            }

        </div>
    );
}
