import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  // -------------------------
  // Node ID Generator
  // -------------------------

  getNodeID: (type) => {
    const ids = get().nodeIDs || {};
    const newCount = (ids[type] || 0) + 1;

    set({
      nodeIDs: {
        ...ids,
        [type]: newCount,
      },
    });

    return `${type}_${newCount}`;
  },

  // -------------------------
  // ReactFlow Handlers (REQUIRED)
  // -------------------------

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          id: `${connection.source}-${connection.target}-${connection.targetHandle}`,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
          },
        },
        get().edges,
      ),
    });
  },

  // -------------------------
  // Node Operations
  // -------------------------

  addNode: (node) =>
    set({
      nodes: [...get().nodes, node],
    }),

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                [fieldName]: fieldValue,
              },
            }
          : node,
      ),
    });
  },

  // -------------------------
  // Restart (REAL RESET)
  // -------------------------

  restart: () =>
    set({
      nodes: [],
      edges: [],
      nodeIDs: {},
    }),
}));
