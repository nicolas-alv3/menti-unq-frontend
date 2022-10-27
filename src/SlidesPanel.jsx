import * as React from "react";
import {useState} from "react";
import {Box, Container, Tab, Tabs, Typography} from "@mui/material";
import MultipleChoiceIcon from "@mui/icons-material/Leaderboard";
import {MCQPanel} from "./components/MCQPanel";

export function SlidesPanel({slides, slideChange}) {
    const [selectedTab, setSelectedTab] = useState(0);
    return <>
        <Tabs value={selectedTab} orientation='vertical' variant='scrollable'
              sx={{borderColor: 'black', width: '10em', height: '90%'}}
        >
            {slides.map((_slide, i) =>
                <Tab key={i.toString()} component={() => <Container onClick={() => setSelectedTab(i)} sx={{
                    height: '5.3em',
                    backgroundColor: selectedTab === i ? '#D3E1FF' : 'white',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Box sx={{
                        padding: '0.5em 0.7em',
                        border: 'solid 1px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 'fit-content'
                    }}>
                        <MultipleChoiceIcon/>
                        <Typography variant="subtitle2">Multiple-Choice</Typography>
                    </Box>

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