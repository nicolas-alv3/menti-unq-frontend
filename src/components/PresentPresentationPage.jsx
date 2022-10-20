import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router";
import {Header} from "./Header";
import {Box, Button, Divider, Typography} from "@mui/material";
import PresentationService from "../service/PresentationService";
import AnswerService from "../service/AnswerService";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import InviteToPresentationModal from "./InviteToPresentationModal";

export default function PresentPresentationPage() {
    const [presentation, setPresentation] = React.useState(null);
    const [answers, setAnswers] = React.useState({});
    const [finished, setFinished] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    const {id} = useParams();
    const navigate = useNavigate();

    function fetchPresentation() {
        return PresentationService.getById(id)
            .then((res) => {
                if (res?.error) {
                    navigate('/pathError');
                } else {
                    setPresentation(res);
                    return res;
                }
            })
    }

    const fetchAnswers = () => {
        AnswerService.getAnswersBySlideId(presentation.slides[presentation.currentSlide].id)
            .then(res => {
                if (res?.error) {
                    console.log("Hubo un error obteniendo las respuestas")
                } else {
                    setAnswers(res);
                }
            })
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (presentation) {
                fetchAnswers();
            }
        }, 2000);

        return () => clearInterval(intervalId);
    }, [presentation?.currentSlide]);

    useEffect(() => {
        fetchPresentation()
    }, []);

    const boxSx = {display: 'flex', flexDirection: 'column', padding: '1em 5em', gap: ".7em"};

    const isLastQuestion = () => {
        return presentation.currentSlide === presentation.slides.length - 1
    }

    const handleNextQuestion = () => {
        if (!isLastQuestion()) {
            PresentationService.update({...presentation, currentSlide: presentation.currentSlide + 1})
                .then((p) => {
                    setPresentation(p);
                    fetchAnswers()
                });
        } else {
            setFinished(true);
        }
    }

    const handleRestart = () => {
        PresentationService.update({...presentation, currentSlide: 0})
            .then((p) => {
                setPresentation(p);
                fetchAnswers();
                setFinished(false);
            });
    }

    const handleShare = () => {
        setOpen(true)
    }

    return <>
        <Header/>
        <Box sx={boxSx}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant='h3'>{presentation?.name}</Typography>
                <Button variant={"contained"} startIcon={<InsertLinkIcon/>} onClick={handleShare}>Compartir</Button>
            </Box>
            <Divider/>
            {
                finished ?
                    <>
                        <Typography variant={"h4"}>¡Has llegado al final de la presentación!</Typography>
                        <Button onClick={handleRestart}>Volver a empezar</Button>
                    </>
                    :
                    <>
                        <Typography
                            variant='h5'>{presentation?.slides[presentation?.currentSlide].question}</Typography>
                        {
                            answers.map(({option, count}, i) => <b>{`${i+1}. ${option}: ${count} respuestas`}</b>)
                        }
                        <Button onClick={handleNextQuestion}>Siguiente pregunta</Button>
                    </>}
        </Box>
        <InviteToPresentationModal open={open} setOpen={setOpen} id={presentation?.id}/>
    </>
}