import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router";
import {Header} from "./Header";
import {Box, Button, Divider, Typography} from "@mui/material";
import PresentationService from "../service/PresentationService";
import AnswerService from "../service/AnswerService";

export default function PresentPresentationPage() {
    const [presentation, setPresentation] = React.useState(null);
    const [answers, setAnswers] = React.useState({});

    let {id} = useParams();
    const navigate = useNavigate();

    const getAnswers = (pres) => {
        AnswerService.getAnswersBySlideId(pres?.slides[pres.currentSlide].id)
            .then( res => {
                if(res?.error) {
                    console.log("Hubo un error obteniendo las respuestas")
                } else {
                    setAnswers(res);
                }
            })
    }

    function fetchPresentation() {
        PresentationService.getById(id)
            .then((res) => {
                if(res?.error) {
                    navigate('/pathError');
                } else {
                    setPresentation(res);
                    getAnswers(res);
                }
            })
    }

    useEffect(() => {
        fetchPresentation();
    }, []);

    const boxSx = {display: 'flex', flexDirection: 'column', padding: '1em 5em', gap:".7em"};

    const handleNextQuestion = () => {
        PresentationService.update({...presentation, currentSlide: presentation.currentSlide + 1})
            .then(fetchPresentation);
    }

    return <>
        <Header/>
        <Box sx={boxSx}>
            <Typography variant='h3'>{presentation?.name}</Typography>
            <Divider/>
            <Typography variant='h5'>{presentation?.slides[presentation?.currentSlide].question}</Typography>
            {
                Object.keys(answers).map( k => <b>{`${k}: ${answers[k]} respuestas`}</b>)
            }
            <Button onClick={handleNextQuestion}>Siguiente pregunta</Button>
        </Box>
    </>
}