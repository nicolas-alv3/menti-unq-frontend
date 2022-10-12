import {Box, Button, Radio, TextField} from "@mui/material";
import * as React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {TabPanel} from "./TabPanel";
import * as PropTypes from "prop-types";

function MCQOption({option, updateOption, id, removeOption}) {
    return <Box id={id} sx={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: '1em'}}>
        <Radio disabled/>
        <TextField value={option} onChange={e => updateOption(e.target.value)} variant="outlined"
                   sx={{marginRight: "1em", width: "25%"}}/>
        <Button onClick={removeOption}>
            <ClearIcon/>
        </Button>
    </Box>;
}

function AddOptionButton(props) {
    return <Button onClick={props.onClick} sx={{width: "25%", marginLeft: "3em"}} variant="outlined">
        Agregar opción
    </Button>;
}

AddOptionButton.propTypes = {onClick: PropTypes.func};

export function MCQPanel(props) {

    function updateOption(index) {
        return (newOption) => {
            let newOptions = [...props.slide.options];
            newOptions[index] = newOption;

            props.onChange({...props.slide, options: newOptions})
        };
    }

    return <TabPanel key={`mcq-panel-${props.index}`} index={props.index} show={props.selectedTab === props.index}>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <TextField variant="standard" sx={{width: "30%", marginBottom: '1em'}} value={props.slide.question}
                       onChange={(e) => props.onChange({...props.slide, question: e.target.value})}/>
            {props.slide.options.map((option, index) => <MCQOption key={`mcq-option-${index}`} option={option}
                                                                   updateOption={updateOption(index)}
                                                                   removeOption={() => {
                                                                       props.onChange({
                                                                           ...props.slide,
                                                                           options: props.slide.options.filter((_, i) => i !== index)
                                                                       });
                                                                   }}/>)}
            <AddOptionButton onClick={() => {
                props.onChange({...props.slide, options: [...props.slide.options, `Opción ${props.slide.options.length + 1}`]})
            }}/>
        </Box>
    </TabPanel>;
}