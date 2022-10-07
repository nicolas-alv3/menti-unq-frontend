import * as React from "react";
import {useContext, useState} from "react";
import {Header} from "./components/Header";
import {Box, Button, Container, Divider, Input, Paper, Tab, Tabs, Typography} from "@mui/material";
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


export function CreatePresentationPage(props) {
    const [title, setTitle] = useState('Nueva presentacion');
    const [selectedTab, setSelectedTab] = useState(0);
    const navigate = useNavigate();

    return <>
        <Header/>
        <Container sx={{position: 'fixed', backgroundColor: "#F0EDE0", minHeight: '100vh'}} maxWidth={false}>
            <Paper sx={{marginTop: '1em', padding: '1em'}}>
                <Input sx={{fontSize: '40px', ":hover": {border: 'solid 1px'}}} variant='standard' value={title}
                       onChange={e => setTitle(e.target.value)}/>
                <Divider/>
                <Box sx={{marginTop: '1em'}}>
                    <Button variant='contained'>
                        Nueva slide
                    </Button>
                </Box>
                <Box sx={{height: '70vh', display: 'flex'}}>
                    <Tabs value={selectedTab} orientation='vertical' variant='scrollable'
                          sx={{borderRight: 1, borderColor: 'black', width: '10em', padding: '1em 0', height: '90%'}}
                    >
                        <Tab component={() => <Container onClick={() => setSelectedTab(0)} sx={{
                            display: 'flex',
                            border: 'solid 1px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '5em',
                            width: '8em'
                        }}>
                            MCQ
                        </Container>}/>
                        <Tab component={() => <Container onClick={() => setSelectedTab(1)} sx={{
                            display: 'flex',
                            border: 'solid 1px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '5em',
                            width: '8em'
                        }}>
                            Comment
                        </Container>}/>
                    </Tabs>
                    <TabPanel show={selectedTab === 0} index={0}>
                        <Typography>Aca van cosas para MCQ</Typography>
                    </TabPanel>
                    <TabPanel show={selectedTab === 1} index={1}>
                        <Typography>Aca van cosas para Comment</Typography>
                    </TabPanel>
                </Box>
                <Button onClick={() => {
                    PresentationService.create({name: title})
                        .then((res) => navigate('/'))
                        .catch((err) => console.log(err));
                }}>Guardar</Button>
            </Paper>
        </Container>
    </>;
}