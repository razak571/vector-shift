# AI Workflow Builder — VectorShift Frontend Technical Assessment

A full-stack AI workflow builder built with React + React Flow, FastAPI, and Zustand.

| Layer      | Technology        |
| ---------- | ----------------- |
| Frontend   | React, React Flow |
| Backend    | FastAPI (Python)  |
| State      | Zustand           |
| Deployment | Vercel + Render   |

---

## Features

### Node Abstraction

Reusable `BaseNode` abstraction with 9 built-in node types: Input, Output, Text, LLM, Prompt, Knowledge Base, Tool, Memory, and Condition. Easily extendable architecture.

### Modern SaaS UI

Dark workflow builder with glass-style nodes, animated edges, styled MiniMap, responsive layout, and a Restart button to clear the pipeline.

### Advanced Text Node Logic

Auto-resizing textarea with dynamic variable parsing. Any `{{variable}}` syntax in the text automatically generates a corresponding input handle.

```
Hello {{first}} and {{second}}
```

The above creates two independent input handles on the node.

### Backend Integration

The frontend sends a `POST /pipelines/parse` request and receives:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

The backend handles node/edge counting and DAG validation via DFS.

---

## Local Development

**Frontend**

```bash
cd frontend
npm install
npm start
# → http://localhost:3000
```

**Backend**

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
# → http://localhost:8000
```

---

## Deployment

**Frontend → Vercel**

1. Push repo to GitHub and import in Vercel
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `build`

**Backend → Render**

1. Create a new Web Service and connect your GitHub repo
2. Root directory: `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port 10000`

After deploying, update the frontend fetch URL:

```js
// Before
"http://localhost:8000/pipelines/parse";

// After
"https://your-render-backend.onrender.com/pipelines/parse";
```

**CORS**

The backend currently allows all origins (`"*"`). For production, restrict it to your frontend domain:

```python
allow_origins=["https://ai-workflow.vercel.app"]
```

---

## Project Structure

```
ABC/
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/
│   ├── main.py
│   └── requirements.txt
└── README.md
```

**`backend/requirements.txt`**

```
fastapi
uvicorn
pydantic
```

**Root `.gitignore`**

```
node_modules/
frontend/node_modules/
backend/__pycache__/
*.pyc
.env
build/
```

---

## Demo

The demo covers: creating nodes, dynamic TextNode handle generation, multi-handle connections, DAG validation, and the Restart functionality.

---

_Built as part of the VectorShift Frontend Technical Assessment._
