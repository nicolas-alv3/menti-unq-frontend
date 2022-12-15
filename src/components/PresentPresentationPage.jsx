import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, Divider, Typography } from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { ArrowBack } from "@mui/icons-material";
import ReactWordcloud from "react-wordcloud";
import { Header } from "./Header";
import PresentationService from "../service/PresentationService";
import AnswerService from "../service/AnswerService";
import InviteToPresentationModal from "./InviteToPresentationModal";
import { slideTypes } from "./EditSlidePanel/EditSlidePanel";
import { MCQAnswersSection } from "./answers/MCQ/MCQAnswersSection";

function WordCloudAnswersSection({ answers }) {
  function answersToWords() {
    return answers.map((answer) => {
      const answerValue = Object.keys(answer)[0];
      return { text: answerValue, value: answer[answerValue] };
    });
  }

  const answToWod = useMemo(() => {
    return answersToWords();
  }, [answers]);

  return (
    <ReactWordcloud
      options={{
        fontSizes: [30, 80],
        scale: "log",
        rotations: 2,
        rotationAngles: [0, 90],
        padding: 1,
      }}
      words={answToWod}
    />
  );
}

export default function PresentPresentationPage() {
  const [presentation, setPresentation] = React.useState(null);
  const [answers, setAnswers] = React.useState([]);
  const [finished, setFinished] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchAnswers = () => {
    AnswerService.getAnswersBySlideId(
      presentation.slides[presentation.currentSlide].id
    ).then((res) => {
      if (res?.error) {
        console.log("Hubo un error obteniendo las respuestas");
      } else {
        setAnswers((prevState) => {
          return JSON.stringify(prevState) !== JSON.stringify(res)
            ? res
            : prevState;
        });
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (presentation) {
        fetchAnswers();
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [presentation?.currentSlide]);

  useEffect(() => {
    PresentationService.getById(id).then((res) => {
      if (res?.error) {
        navigate("/pathError");
      } else {
        setPresentation(res);
      }
      return res;
    });
  }, []);

  const boxSx = {
    display: "flex",
    flexDirection: "column",
    padding: "1em 5em",
    gap: ".7em",
  };

  const isLastQuestion = () => {
    return presentation.currentSlide === presentation.slides.length - 1;
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion()) {
      PresentationService.update({
        ...presentation,
        currentSlide: presentation.currentSlide + 1,
      }).then((p) => {
        setPresentation(p);
        fetchAnswers();
      });
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    PresentationService.update({ ...presentation, currentSlide: 0 }).then(
      (p) => {
        setPresentation(p);
        fetchAnswers();
        setFinished(false);
      }
    );
  };

  const handleShare = () => {
    setOpen(true);
  };
  const currentSlide = presentation?.slides[presentation?.currentSlide] ?? {
    type: null,
  };

  function resolveShowAnswersSection() {
    switch (currentSlide.type) {
      case slideTypes.mcq:
        return (
          <MCQAnswersSection
            answers={answers}
            question={currentSlide?.question}
          />
        );
      case slideTypes.wordCloud:
        return <WordCloudAnswersSection answers={answers} />;
      default:
        return (
          <Typography>No podemos manejar este tipo de slides aun!</Typography>
        );
    }
  }

  return (
    <>
      <Header />
      <Box sx={boxSx}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowBack
              fontSize="large"
              sx={{
                ":hover": {
                  cursor: "pointer",
                  color: "#696969",
                },
                marginRight: "1em",
              }}
              onClick={() => navigate(-1)}
            />
            <Typography align="left" variant="h3">
              {presentation?.name}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<InsertLinkIcon />}
            onClick={handleShare}
          >
            Compartir
          </Button>
        </Box>
        <Divider />
        {finished ? (
          <>
            <Typography variant="h4">
              ¡Has llegado al final de la presentación!
            </Typography>
            <Button onClick={handleRestart}>Volver a empezar</Button>
          </>
        ) : (
          <>
            {resolveShowAnswersSection()}
            <Button onClick={handleNextQuestion}>Siguiente pregunta</Button>
          </>
        )}
      </Box>
      <InviteToPresentationModal
        open={open}
        setOpen={setOpen}
        id={presentation?.id}
      />
    </>
  );
}
