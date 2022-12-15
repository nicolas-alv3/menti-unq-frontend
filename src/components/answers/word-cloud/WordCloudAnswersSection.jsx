import React, { useMemo } from "react";
import ReactWordcloud from "react-wordcloud";

export function WordCloudAnswersSection({ answers }) {
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
