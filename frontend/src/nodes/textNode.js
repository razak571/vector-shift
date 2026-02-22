import { useState, useMemo, useRef, useEffect } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [nodeSize, setNodeSize] = useState({
    width: 200,
    height: 80,
  });

  // ----------------------------
  // Variable handles (UNCHANGED)
  // ----------------------------

  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    return Array.from(new Set(matches.map((m) => m[1])));
  }, [currText]);

  const handles = [
    ...variables.map((variable, index) => ({
      type: "target",
      position: Position.Left,
      id: `${id}-var-${variable}`, // 🔴 include node id for uniqueness
      style: { top: 40 + index * 25 },
    })),
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Fix height first
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    // Calculate width from longest line ONLY
    const lines = currText.split("\n");

    const longestLine = lines.reduce(
      (max, line) => Math.max(max, line.length),
      0,
    );

    const calculatedWidth = Math.max(200, longestLine * 8 + 40);

    setNodeSize({
      width: calculatedWidth,
      height: textarea.scrollHeight + 60,
    });
  }, [currText]);

  // ----------------------------

  return (
    <BaseNode
      id={id}
      handles={handles}
      style={{
        width: nodeSize.width,
        height: nodeSize.height,
        // border: "1px solid black",
      }}
    >
      <div>
        <span>Text</span>
      </div>

      <div>
        <label>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            rows={1}
            style={{
              width: "100%",
              resize: "none",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
