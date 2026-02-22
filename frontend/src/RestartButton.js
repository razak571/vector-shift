import { useStore } from "./store";

export const RestartButton = () => {
  const nodes = useStore((state) => state.nodes);
  const restart = useStore((state) => state.restart);

  if (nodes.length === 0) return null;

  const buttonStyle = {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(220,38,38,0.4)",
  };

  const containerStyle = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        // onClick={handleRestart}
        onClick={restart}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
      >
        Restart
      </button>
    </div>
  );
};
