import * as React from "react";
import {useContext, useState} from "react";
import {Header} from "./components/Header";
import {Box, Button, Container, Divider, Input, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import PresentationService from "./service/PresentationService";
import {AuthContext} from "./App";
import {useNavigate} from "react-router";

function TabPanel(props) {
    const {children, value, index, show, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={!show}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{width:'100%'}}
        >
            {show && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
};


function SlidesPanel({slides, slideChange}) {
    const [selectedTab, setSelectedTab] = useState(0);
    return <>
        <Tabs value={selectedTab} orientation='vertical' variant='scrollable'
              sx={{borderRight: 1, borderColor: 'black', width: '10em', padding: '1em 0', height: '90%'}}
        >
            {slides.map((_slide, i) =>
                <Tab id={i.toString()} component={() => <Container onClick={() => setSelectedTab(i)} sx={{
                    display: 'flex',
                    border: 'solid 1px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '5em',
                    width: '8em',
                    marginBottom:'1em'
                }}>
                    MCQ
                </Container>}/>
            )}
        </Tabs>
        {slides.map((slide, index) => {
            return <TabPanel index={index} show={selectedTab === index}>
                <TextField variant="standard" sx={{width:'30%'}} value={slide.question} onChange={(e) => {
                    slideChange(index, {...slide, question: e.target.value});
                }}/>

            </TabPanel>
        })}
    </>;
}

SlidesPanel.propTypes = {slides: PropTypes.arrayOf(PropTypes.any)};

class MCQSlide {

    constructor() {
        this.question = "Pregunta de seleccion multiple";
    }
}

export function CreatePresentationPage(props) {
    const [title, setTitle] = useState('Nueva presentacion');
    const [slides, setSlides] = useState([new MCQSlide()]);
    const {accessToken} = useContext(AuthContext);
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
            <Paper sx={{marginTop: '1em', padding: '1em'}}>
                <Input sx={{fontSize: '40px', ":hover": {border: 'solid 1px'}}} variant='standard' value={title}
                       onChange={e => setTitle(e.target.value)}/>
                <Divider/>
                <Box sx={{marginTop: '1em'}}>
                    <Button variant='contained' size="small" onClick={addNewSlide}>
                        Agregar slide
                    </Button>
                </Box>
                <Box sx={{height: '70vh', display: 'flex'}}>
                    <SlidesPanel slideChange={handleSlideChange} slides={slides}/>
                </Box>
                <Button onClick={() => {
                    PresentationService.create({name: title, slides})
                        .then((res) => navigate('/'))
                        .catch((err) => console.log(err));
                }}>Guardar</Button>
            </Paper>
        </Container>
    </>;
}