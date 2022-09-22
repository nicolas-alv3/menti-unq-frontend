import {useAuth0} from "@auth0/auth0-react";
import {Button, Container, Typography} from "@mui/material";

export function Welcome() {
    const {loginWithRedirect} = useAuth0();
    return <Container sx={{display: "flex", alignItems: "center", justifyContent: "center", padding: "7vh"}}>
        <Container sx={{width: "75vh", height: "75vh", padding: "5vh 5vh", display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h3">
                Vaya! Parece que no estas logeado. Intenta inicar sesion con una cuenta existente o crea una nueva.
            </Typography>
            <Button onClick={loginWithRedirect} size='large' variant='contained'
                    sx={{width: "35%", marginTop: '2em', backgroundColor: '#970C10'}}>Ingresar</Button>
        </Container>
    </Container>;
}