import * as React from "react";
import { EditableMCQOption } from "./EditableMCQOption";
import { StaticMCQOption } from "./StaticMCQOption";

export function MCQOption({
  option,
  updateOption,
  id,
  removeOption,
  editable,
}) {
  return editable ? (
    <EditableMCQOption
      id={id}
      value={option}
      onChange={(e) => updateOption(e.target.value)}
      onClick={removeOption}
    />
  ) : (
    <StaticMCQOption id={id} option={option} />
  );
}
