import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const MemoryNode = ({ id }) => {
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
        <span>Memory</span>
      </div>

      <div>
        <span>Stores conversation history</span>
      </div>
    </BaseNode>
  );
};
