import { DraggableNode } from "./draggableNode";
import { RestartButton } from "./RestartButton";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* LEFT SIDE — Node Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          maxWidth: "85%",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="prompt" label="Prompt" />
        <DraggableNode type="knowledgeBase" label="KnowledgeBase" />
        <DraggableNode type="tool" label="Tool" />
        <DraggableNode type="memory" label="Memory" />
        <DraggableNode type="condition" label="Condition" />
      </div>

      {/* RIGHT SIDE — Restart Button */}
      <div>
        <RestartButton />
      </div>
    </div>
  );
};
