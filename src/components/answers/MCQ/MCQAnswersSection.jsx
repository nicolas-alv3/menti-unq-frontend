import React from "react";
import { BarChart } from "../../BarChart";

export function MCQAnswersSection({ question, answers }) {
  function answersToDatapoints() {
    return answers.map((answer) => {
      const label = Object.keys(answer)[0];
      const count = answer[label];
      return { label, y: count };
    });
  }

  return <BarChart title={question} data={answersToDatapoints()} />;
}
