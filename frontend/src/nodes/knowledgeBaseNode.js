import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const KnowledgeBaseNode = ({ id, data }) => {
  const [collection, setCollection] = useState(
    data?.collection || "default_collection",
  );

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-query`,
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-documents`,
    },
  ];

  return (
    <BaseNode id={id} handles={handles}>
      <div>
        <span>Knowledge Base</span>
      </div>

      <div>
        <label>
          Collection:
          <input
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          />
        </label>
      </div>
    </BaseNode>
  );
};
