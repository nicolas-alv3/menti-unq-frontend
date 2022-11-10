import {Box, Button, Divider, InputBase, Paper} from "@mui/material";
import * as React from "react";
import {SlidesPanel} from "./SlidesPanel";
import {MCQSlide} from "./MCQSlide";

export function EditPresentationPanel({title, slides, setSlides, onSave, changeTitle}) {

    const handleSlideChange = (index, newValue) => {
        const newSlidesList = slides.map((s, currentIndex) => {
            if (index === currentIndex) {
                return newValue
            } else {
                return s;
            }
        })
        setSlides(newSlidesList);
    };

    const addNewSlide = () => {
        setSlides([...slides, new MCQSlide(slides.length + 1)]);
    };



    return <Paper sx={{marginTop: "1em", padding: "1em 0"}}>
        <InputBase sx={{fontSize: "40px", ":hover": {border: "solid 1px"}, marginLeft: "0.5em"}} value={title}
                   onChange={changeTitle}/>
        <Divider/>
        <Box marginLeft={1} marginY={2}>
            <Button variant="contained" size="small" onClick={addNewSlide}>
                Agregar slide
            </Button>
        </Box>
        <Divider/>
        <Box sx={{height: "60vh", display: "flex"}}>
            <SlidesPanel slideChange={handleSlideChange} slides={slides}/>
        </Box>
        <Button onClick={onSave}>Guardar</Button>
    </Paper>;
}