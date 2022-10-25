import {Box, Button, Container, Paper, Radio, TextField, Typography} from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {TabPanel} from "./TabPanel";
import * as PropTypes from "prop-types";
import {BarChart} from "./BarChart";

function EditableMCQOption(props) {
    return <Box id={props.id} sx={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "1em"}}>
        <Radio disabled checked/>
        <TextField value={props.value} onChange={props.onChange} variant="outlined"
                   sx={{width: "40%"}}/>
        <Button onClick={props.onClick}>
            <DeleteIcon/>
        </Button>
    </Box>;
}

EditableMCQOption.propTypes = {
    id: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.any
};

function StaticMCQOption(props) {
    return <Box id={props.id} sx={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "1em"}}>
        <Radio disabled checked/>
        <Typography variant="outlined"
                    sx={{marginRight: "1em", width: "25%"}}>{props.option}</Typography>
    </Box>;
}

StaticMCQOption.propTypes = {
    id: PropTypes.any,
    option: PropTypes.any
};

function MCQOption({option, updateOption, id, removeOption, editable}) {
    return editable ?
        <EditableMCQOption id={id} value={option} onChange={e => updateOption(e.target.value)}
                           onClick={removeOption}/> : <StaticMCQOption
            id={id} option={option}/>;
}

function AddOptionButton(props) {
    return <Button onClick={props.onClick} sx={{width: "50%", marginLeft: "3em"}} variant="outlined">
        Agregar opción
    </Button>;
}

AddOptionButton.propTypes = {onClick: PropTypes.func};

function optionsToBarChartData(options) {
    return options.map(i => {
        return {label: i}
    });
}

export function MCQPanel(props) {

    function updateOption(index) {
        return (newOption) => {
            let newOptions = [...props.slide.options];
            newOptions[index] = newOption;

            props.onChange({...props.slide, options: newOptions})
        };
    }

    return <TabPanel key={`mcq-panel-${props.index}`} index={props.index} show={props.selectedTab === props.index}>
        <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', height:'100%'}}>
            <Container sx={{backgroundColor: "#E7E8EB", display:"flex", alignItems:"center", width:"150%"}}>
                <Paper sx={{height:'95%', width:'100%', borderRadius:'0', padding:'0.5em'}}>
                    <Typography mb={4} variant="h4">{props.slide.question}</Typography>
                    <BarChart data={optionsToBarChartData(props.slide.options)}/>
                </Paper>
            </Container>
            <Container>
                <Typography marginBottom={2} variant="h5">Pregunta: </Typography>
                <TextField fullWidth sx={{marginBottom: '1em'}} value={props.slide.question}
                           onChange={(e) => props.onChange({...props.slide, question: e.target.value})}/>
                <Typography marginBottom={2} variant="h5">Opciones: </Typography>
                {props.slide.options.map((option, index) => <MCQOption editable key={`mcq-option-${index}`}
                                                                       option={option}
                                                                       updateOption={updateOption(index)}
                                                                       removeOption={() => {
                                                                           props.onChange({
                                                                               ...props.slide,
                                                                               options: props.slide.options.filter((_, i) => i !== index)
                                                                           });
                                                                       }}/>)}
                <AddOptionButton onClick={() => {
                    props.onChange({
                        ...props.slide,
                        options: [...props.slide.options, `Opción ${props.slide.options.length + 1}`]
                    })
                }}/>
            </Container>
        </Box>
    </TabPanel>;
}