import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ToolNode = ({ id, data }) => {
  const [toolName, setToolName] = useState(data?.toolName || "weather_api");

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
        <span>Tool</span>
      </div>

      <div>
        <label>
          Tool:
          <input
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
          />
        </label>
      </div>
    </BaseNode>
  );
};
