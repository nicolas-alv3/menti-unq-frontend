import { Button, Container, Typography } from "@mui/material";
import "../styles/Home.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import PresentationService from "../service/PresentationService";
import { PresentationsList } from "./PresentationsList";

export default function Home() {
  const [presentations, setPresentations] = useState([]);
  const { isAuthenticated, error, isLoading, loginWithRedirect } = useAuth0();

  const fetchPresentations = () => {
    PresentationService.getPresentations()
      .then((presentations) => {
        setPresentations(presentations);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return loginWithRedirect();
  }
  return (
    <>
      <Header />
      <Container
        sx={{
          position: "fixed",
          backgroundColor: "#F0EDE0",
          minHeight: "100vh",
        }}
        maxWidth={false}
      >
        {isAuthenticated && presentations.length === 0 && (
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "7vh",
            }}
          >
            <Container
              sx={{ padding: "3vh 3vh", width: "75vh", height: "75vh" }}
            >
              <Typography variant="h4">
                Obtené una mayor participacion de tu publico con slides
                interactivas.
              </Typography>
              <Typography sx={{ color: "#4f4c45" }} variant="h6">
                ¡Vaya! Aun no tenes ninguna presentacion creada.Comenzá creando
                tu primera presentacion
              </Typography>
              <Link to="/crearPresentacion" style={{ textDecoration: "none" }}>
                <Button
                  sx={{ backgroundColor: "#970C10", marginTop: "3em" }}
                  variant="contained"
                >
                  Crear presentación
                </Button>
              </Link>
            </Container>
          </Container>
        )}
        {presentations.length > 0 && (
          <PresentationsList
            presentations={presentations}
            updateList={fetchPresentations}
          />
        )}
      </Container>
    </>
  );
}
