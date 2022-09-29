import {Button, Container, Typography} from "@mui/material";
import "../styles/Home.css";
import AddPresentationModal from "./AddPresentationModal";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {AuthContext} from "../App";
import {Header} from "./Header";
import PresentationService from "../service/PresentationService";
import * as PropTypes from "prop-types";
import {PresentationsList} from "./PresentationsList";
import {Link} from "react-router-dom";

PresentationsList.propTypes = {presentations: PropTypes.arrayOf(PropTypes.any)};
export default function Home() {
    const [openPresentation, setOpenPresentation] = useState(false);
    const [presentations, setPresentations] = useState([]);
    const {isAuthenticated, getAccessTokenSilently, error, isLoading, loginWithRedirect} = useAuth0();
    const {accessToken, setAccessToken} = useContext(AuthContext);
    useEffect(() => {
        getAccessTokenSilently().then(data => {
            setAccessToken(data)
            return data
        }).then((data) => {
            PresentationService.getPresentations(data).then(presentations => {
                setPresentations(presentations)
            })
        }).catch((e) => {
            console.log("error", e)
        })
    }, [getAccessTokenSilently]);

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!isAuthenticated) {
        return loginWithRedirect()
    }
    return <>
        <Header/>
        <Container sx={{position: 'fixed', backgroundColor: "#F0EDE0", minHeight: '100vh'}} maxWidth={false}>
            {isAuthenticated && presentations.length === 0 &&
                <Container sx={{display: "flex", alignItems: "center", justifyContent: "center", padding: "7vh"}}>
                    <Container sx={{padding: '3vh 3vh', width: '75vh', height: '75vh'}}>
                        <Typography variant='h4'>
                            Obtené una mayor participacion de tu publico con slides interactivas.
                        </Typography>
                        <Typography sx={{color: '#4f4c45'}} variant='h6'>
                            ¡Vaya! Aun no tenes ninguna presentacion creada.Comenzá creando tu primera
                            presentacion
                        </Typography>
                        <Link to='/crearPresentacion' style={{textDecoration: 'none'}}>
                            <Button sx={{backgroundColor: '#970C10', marginTop: '3em'}} variant='contained'>Crear
                                presentación</Button>
                        </Link>
                    </Container>
                    {isAuthenticated &&
                        <AddPresentationModal isOpen={openPresentation} setIsOpen={setOpenPresentation}/>}
                </Container>
            }
            <PresentationsList presentations={presentations}/>
        </Container>
    </>
}