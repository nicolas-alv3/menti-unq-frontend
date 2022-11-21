import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, Radio, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PresentationService from "../../service/PresentationService";
import AnswerService from "../../service/AnswerService";

function MCQVoteOption({ id, text, selected, onClick }) {
  const styles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1em",
    border: "1px solid lightgray",
    borderRadius: 2,
    padding: "6px",
    width: "20em",
    cursor: "pointer",
  };
  return (
    <Box onClick={onClick} id={id} sx={styles}>
      <Radio checked={selected === id} />
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
}

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
  const [selected, setSelected] = React.useState(0);
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

  const handleSubmit = () => {
    AnswerService.create({
      values: [
        presentation.slides[presentation.currentSlide].options[selected],
      ],
      slide: presentation.slides[presentation.currentSlide],
    }).then(() => {
      setSuccess(true);
      startPolling();
    });
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
        <>
          <Typography style={{ marginBottom: "1em" }} variant="h5">
            {presentation?.slides[presentation.currentSlide].question || ""}
          </Typography>
          <div>
            {presentation?.slides[presentation.currentSlide].options.map(
              (o, i) => (
                <MCQVoteOption
                  id={i}
                  key={o}
                  text={o}
                  selected={selected}
                  onClick={() => setSelected(i)}
                />
              )
            )}
          </div>
          <Button
            variant="contained"
            sx={{ width: "24em" }}
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </>
      )}
    </div>
  );
}
