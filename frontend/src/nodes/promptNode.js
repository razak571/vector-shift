import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const PromptNode = ({ id, data }) => {
  const [promptName, setPromptName] = useState(
    data?.promptName || id.replace("prompt-", "prompt_"),
  );

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode id={id} handles={handles}>
      <div>
        <span>Prompt</span>
      </div>

      <div>
        <label>
          Name:
          <input
            value={promptName}
            onChange={(e) => setPromptName(e.target.value)}
          />
        </label>
      </div>
    </BaseNode>
  );
};
