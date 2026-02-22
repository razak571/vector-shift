import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ConditionNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-true`,
      style: { top: "30%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-false`,
      style: { top: "70%" },
    },
  ];

  return (
    <BaseNode id={id} handles={handles}>
      <div>
        <span>Condition</span>
      </div>

      <div>
        <span>Branch logic</span>
      </div>
    </BaseNode>
  );
};
