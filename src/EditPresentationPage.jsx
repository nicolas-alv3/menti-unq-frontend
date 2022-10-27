import * as React from "react";
import {useEffect, useState} from "react";
import {Header} from "./components/Header";
import {
    Alert,
    AlertTitle,
    Container,
} from "@mui/material";
import PresentationService from "./service/PresentationService";
import {useParams} from "react-router";
import {EditPresentationPanel} from "./EditPresentationPanel";
import * as PropTypes from "prop-types";

function SuccessAlert(props) {
    return <Alert id="toast" className={props.alert ? "show" : ""} variant="filled" sx={{}} severity="success">
        <AlertTitle>Exito!</AlertTitle>
        Tu presentacion fue editada correctamente :)
    </Alert>;
}

SuccessAlert.propTypes = {alert: PropTypes.bool};

export function EditPresentationPage() {
    const [alert, setAlert] = useState(false);
    const [presentation, setPresentation] = useState({slides: [], name: ''});
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            PresentationService.getById(id).then(data => {
                    setPresentation(data)
                }
            )
        }
    }, [setPresentation, id])

    let updatePresentation = () => {
        PresentationService.update(presentation).then(() => {
            setAlert(true);
            setTimeout(() => {
                setAlert(false)
            }, 3000)
        })
    };
    return <>
        <Header/>
        <Container sx={{position: 'fixed', backgroundColor: "#F0EDE0", minHeight: '100vh'}} maxWidth={false}>
            <EditPresentationPanel slides={presentation.slides} setSlides={(slides) => {
                setPresentation({...presentation, slides})
            }} onSave={
                updatePresentation
            } changeTitle={e => setPresentation({...presentation, name: e.target.value})} title={presentation.name}/>
        </Container>
        <SuccessAlert alert={alert}/>
    </>;
}