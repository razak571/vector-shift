import os
from dotenv import load_dotenv

load_dotenv()
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"],
    allow_origins=[FRONTEND_URL] if FRONTEND_URL != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Request Models
# -------------------------

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# -------------------------
# Root test endpoint
# -------------------------

@app.get("/")
def read_root():
    return {"Ping": "Pong"}


# -------------------------
# DAG Check Function
# -------------------------

def is_dag(nodes, edges):

    graph = {node.id: [] for node in nodes}

    for edge in edges:
        graph[edge.source].append(edge.target)

    visited = set()
    rec_stack = set()

    def dfs(node):

        if node in rec_stack:
            return False

        if node in visited:
            return True

        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False

        rec_stack.remove(node)

        return True

    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False

    return True


# -------------------------
# Parse Endpoint
# -------------------------

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):

    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    dag_status = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_status
    }