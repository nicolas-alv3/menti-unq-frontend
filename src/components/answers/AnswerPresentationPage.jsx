import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PresentationService from "../../service/PresentationService";
import { MCQAnswerSection } from "./MCQ/MCQAnswerSection";

function SuccessScreen() {
  return (
    <>
      <CheckCircleIcon
        color="success"
        sx={{ fontSize: 90, marginBottom: ".4em" }}
      />
      <Typography style={{ marginBottom: "1em" }} variant="h5">
        Registramos tu respuesta
      </Typography>
      <Typography style={{ marginBottom: "1em" }} variant="body1">
        Espera a que el presentador cambie de diapositiva
      </Typography>
      <Typography style={{ position: "absolute", bottom: 0 }} variant="body2">
        ¿La diapositiva no ha cambiado?<Button>Recarga la pagina</Button>
      </Typography>
    </>
  );
}

export function AnswerPresentationPage() {
  const [presentation, setPresentation] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    PresentationService.getById(id).then((res) => {
      if (res?.error) {
        navigate("/pathError");
      } else {
        setPresentation(res);
      }
    });
  }, []);

  const startPolling = () => {
    const timer = setInterval(() => {
      PresentationService.getById(presentation.id).then((pres) => {
        if (!pres.error && pres.currentSlide !== presentation.currentSlide) {
          setPresentation(pres);
          setSuccess(false);
          clearInterval(timer);
        }
      });
    }, 1000);
  };
  const currentSlide = presentation?.slides[presentation?.currentSlide] ?? {
    options: [],
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography style={{ margin: "1em" }} variant="h3">
        UNQui-Meter
      </Typography>
      {success ? (
        <SuccessScreen />
      ) : (
        <MCQAnswerSection
          startPolling={startPolling}
          setSuccess={setSuccess}
          options={currentSlide.options}
          question={currentSlide.question}
          slideId={currentSlide.id}
        />
      )}
    </div>
  );
}
