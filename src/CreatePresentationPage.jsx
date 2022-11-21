import * as React from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router";
import { Header } from "./components/Header";
import PresentationService from "./service/PresentationService";
import { EditPresentationPanel } from "./EditPresentationPanel";
import { MCQSlide } from "./MCQSlide";

export function CreatePresentationPage() {
  const [title, setTitle] = useState("Nueva presentacion");
  const [slides, setSlides] = useState([new MCQSlide(1)]);
  const navigate = useNavigate();

  const createPresentation = () => {
    PresentationService.create({ name: title, slides, currentSlide: 0 })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

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
        <EditPresentationPanel
          title={title}
          changeTitle={(e) => setTitle(e.target.value)}
          setSlides={setSlides}
          slides={slides}
          onSave={createPresentation}
        />
      </Container>
    </>
  );
}
