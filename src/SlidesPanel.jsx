import * as React from "react";
import {useState} from "react";
import {Box, Container, IconButton, Tab, Tabs, Typography} from "@mui/material";
import MultipleChoiceIcon from "@mui/icons-material/Leaderboard";
import {MCQPanel} from "./components/MCQPanel";
import {Delete} from "@mui/icons-material";
import * as PropTypes from "prop-types";

function DeleteSlideButton(props) {
    return <IconButton sx={{
        alignSelf: "flex-end",
        color: "light-grey",
        ":hover": {color: "black", cursor: "click"},
        fontSize: "16px",
        width: "20px"
    }}
                       onClick={props.onClick}>
        <Delete fontSize="16px"/>
    </IconButton>;
}

DeleteSlideButton.propTypes = {onClick: PropTypes.func};

export function SlidesPanel({slides, slideChange}) {
    const [selectedTab, setSelectedTab] = useState(0);

    function deleteSlide(i) {
        slideChange(i, null)
    }

    return <>
        <Tabs value={selectedTab} orientation='vertical' variant='scrollable'
              sx={{borderColor: 'black', height: '90%'}}
        >
            {slides.map((_slide, i) =>
                <Tab key={i.toString()} component={() => <Container onClick={() => setSelectedTab(i)} sx={{
                    height: '5.3em',
                    backgroundColor: selectedTab === i ? '#D3E1FF' : 'white',
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: "0 !important"
                }}>
                    <DeleteSlideButton onClick={() =>
                        deleteSlide(i)
                    }/>
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