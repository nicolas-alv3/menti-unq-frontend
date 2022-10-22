import {Button, Container, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import React from 'react';

export default function FindByCodePage() {
    const [id, setId] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        setSubmitted(true);
        if(id) {
            navigate(`/presentacion/${id}`)
        }
    }

    return <Container
        sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "2em"}} maxWidth={"md"}>
        <Typography sx={{fontWeight: 500}} variant={"h2"}>Unquimeter</Typography>
        <Typography variant={"h5"}>Ingresa el código</Typography>
        <TextField label="Código" fullWidth helperText={"Este campo es requerido"} error={!id && submitted} placeholder={"1234 5678"} onChange={e => setId(e.target.value)} value={id}
                   variant="outlined" />
        <Button size={"large"} fullWidth variant={"contained"} onClick={handleSubmit}>Ingresar</Button>
        <Typography variant={"body2"}>El código se encuentra en la pantalla en frente suyo</Typography>
    </Container>
}