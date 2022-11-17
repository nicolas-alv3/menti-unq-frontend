import {Box, Button, Divider, InputBase, Paper} from "@mui/material";
import * as React from "react";
import {SlidesPanel} from "./SlidesPanel";
import {MCQSlide} from "./MCQSlide";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router";

export function EditPresentationPanel({title, slides, setSlides, onSave, changeTitle}) {
    const navigate = useNavigate();

    const handleSlideChange = (index, newValue) => {
        const newSlidesList = slides.map((s, currentIndex) => {
            if (index === currentIndex) {
                return newValue
            } else {
                return s;
            }
        })
        setSlides(newSlidesList.filter(x => x));
    };

    const addNewSlide = () => {
        setSlides([...slides, new MCQSlide(slides.length + 1)]);
    };


    let handleSlideDeletion = (slideIndex) => {
        setSlides(slides.filter((_s,i) => i !== slideIndex).map((s,i) => {
            return {
                ...s,
                presentationOrder: i + 1
            }
        }))
    };
    return <Paper sx={{marginTop: "1em", padding: "1em 0"}}>
        <Box sx={{display: "flex", flexDirection: "row", alignItems: 'center', paddingLeft: '1em'}}>
            <ArrowBack fontSize="large" sx={{':hover': {cursor: 'pointer', color: '#696969'}}}
                       onClick={() => navigate(-1)}/>
            <Divider orientation="vertical"/>
            <InputBase sx={{fontSize: "40px", ":hover": {border: "solid 1px"}, marginLeft: "0.5em"}} value={title}
                       onChange={changeTitle}/>
        </Box>
        <Divider/>
        <Box marginLeft={1} marginY={2}>
            <Button variant="contained" size="small" onClick={addNewSlide}>
                Agregar slide
            </Button>
        </Box>
        <Divider/>
        <Box sx={{height: "60vh", display: "flex"}}>
            <SlidesPanel slideChange={handleSlideChange} slides={slides} deleteSlide={handleSlideDeletion}/>
        </Box>
        <Button onClick={onSave}>Guardar</Button>
    </Paper>;
}