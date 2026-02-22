import { Handle } from "reactflow";

export const BaseNode = ({ children, handles = [], style = {} }) => {
  const nodeStyle = {
    background: "rgba(30, 41, 59, 0.8)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "14px",
    minWidth: "200px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    transition: "all 0.2s ease",
    ...style,
  };

  return (
    <div
      style={nodeStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      {children}

      {handles.map((handle, index) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            width: 12,
            height: 12,
            background: "#6366f1",
            border: "2px solid #0f172a",
            boxShadow: "0 0 8px rgba(99,102,241,0.8)",
            ...handle.style,
          }}
        />
      ))}
    </div>
  );
};
