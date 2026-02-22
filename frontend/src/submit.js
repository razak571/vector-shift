import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      alert("Please create at least one node before analyzing the pipeline.");
      return;
    }

    if (edges.length === 0) {
      alert("Pipeline must contain at least one connection.");
      return;
    }
    const pipeline = {
      nodes,
      edges,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/pipelines/parse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pipeline),
        },
      );

      const result = await response.json();

      alert(
        `Pipeline Analysis:

num_nodes: ${result.num_nodes}
num_edges: ${result.num_edges}
is_dag: ${result.is_dag ? "Yes ✅" : "No ❌"}`,
      );
    } catch (error) {
      console.error(error);

      alert("Backend connection failed");
    }
  };

  const containerStyle = {
    position: "absolute",
    top: 25,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "999px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(99,102,241,0.5)",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        containerStyle,
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <button style={buttonStyle} onClick={handleSubmit}>
        Analyze Pipeline
      </button>
    </div>
  );
};
