import * as React from "react";
import {useState} from "react";
import {Header} from "./components/Header";
import {Box, Button, Container, Divider, Input, InputBase, Paper, Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import PresentationService from "./service/PresentationService";
import {useNavigate} from "react-router";
import {MCQPanel} from "./components/MCQPanel";


function SlidesPanel({slides, slideChange}) {
    const [selectedTab, setSelectedTab] = useState(0);
    return <>
        <Tabs value={selectedTab} orientation='vertical' variant='scrollable'
              sx={{borderRight: 1, borderColor: 'black', width: '10em', padding: '1em 0', height: '90%'}}
        >
            {slides.map((_slide, i) =>
                <Tab key={i.toString()} component={() => <Container onClick={() => setSelectedTab(i)} sx={{
                    display: 'flex',
                    border: 'solid 1px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '5em',
                    width: '8em',
                    marginBottom: '1em'
                }}>
                    MCQ
                </Container>}/>
            )}
        </Tabs>
        {slides.map((slide, index) => {
            return <MCQPanel index={index} selectedTab={selectedTab} slide={slide} onChange={(newSlide) => {
                slideChange(index, newSlide);
            }}/>
        })}
    </>;
}

SlidesPanel.propTypes = {slides: PropTypes.arrayOf(PropTypes.any)};

class MCQSlide {

    constructor() {
        this.question = "Pregunta de seleccion multiple";
        this.options = [];
    }
}

export function CreatePresentationPage() {
    const [title, setTitle] = useState('Nueva presentacion');
    const [slides, setSlides] = useState([new MCQSlide()]);
    const navigate = useNavigate();

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
        setSlides([...slides, new MCQSlide()]);
    };

    return <>
        <Header/>
        <Container sx={{position: 'fixed', backgroundColor: "#F0EDE0", minHeight: '100vh'}} maxWidth={false}>
            <Paper sx={{marginTop: '1em', padding: '1em 0'}}>
                <InputBase sx={{fontSize: '40px', ":hover": {border: 'solid 1px'}, marginLeft:'0.5em'}} value={title}
                       onChange={e => setTitle(e.target.value)}/>
                <Divider/>
                <Box marginLeft={1} marginY={2}>
                    <Button variant='contained' size="small" onClick={addNewSlide}>
                        Agregar slide
                    </Button>
                </Box>
                <Divider/>
                <Box sx={{height: '60vh', display: 'flex'}}>
                    <SlidesPanel slideChange={handleSlideChange} slides={slides}/>
                </Box>
                <Button onClick={() => {
                    PresentationService.create({name: title, slides, currentSlide: 0})
                        .then((_) => navigate('/'))
                        .catch((err) => console.log(err));
                }}>Guardar</Button>
            </Paper>
        </Container>
    </>;
}