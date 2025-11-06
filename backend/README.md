# Farm Management Backend (Express + SQLite)

## Requirements
- Node.js 18+ (download from https://nodejs.org)

## Install
1. Open a terminal (PowerShell or Command Prompt)
2. Change to the backend directory:

```bash
cd "C:\\Users\\richa\\OneDrive\\Desktop\\farm management mutoroshanga\\backend"
```

3. Install dependencies:

```bash
npm install
```

## Run
- Development (auto-restart on changes in modern Node):

```bash
npm run dev
```

- Production:

```bash
npm start
```

The API will start at: `http://localhost:4000`

## Endpoints
- Health: `GET /health`
- Fields:
  - `GET /api/fields`
  - `GET /api/fields/:id`
  - `POST /api/fields` { name, area_acres?, location? }
  - `PUT /api/fields/:id`
  - `DELETE /api/fields/:id`
- Crops:
  - `GET /api/crops`
  - `GET /api/crops/:id`
  - `POST /api/crops` { name, field_id?, planted_on?, expected_harvest_on? }
  - `PUT /api/crops/:id`
  - `DELETE /api/crops/:id`
- Animals:
  - `GET /api/animals`
  - `GET /api/animals/:id`
  - `POST /api/animals` { type, tag?, birthdate?, location? }
  - `PUT /api/animals/:id`
  - `DELETE /api/animals/:id`
- Tasks:
  - `GET /api/tasks`
  - `GET /api/tasks/:id`
  - `POST /api/tasks` { title, description?, due_on?, status?, field_id?, crop_id?, animal_id? }
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`

- Chat (AI):
  - `POST /api/chat` { message }
    - If `OPENAI_API_KEY` is set in environment, uses OpenAI Chat; otherwise uses a local AI-like fallback.

## Notes
- Database file is created at `backend/data/farm.sqlite` automatically on first run.
- CORS is enabled for all origins so your `index.html` can access the API.

## Optional: Enable OpenAI
Set an environment variable before running:

```bash
$env:OPENAI_API_KEY="YOUR_KEY_HERE"  # PowerShell on Windows
npm run dev
```

## Deploy on Render

This repo includes `render.yaml` for one-click deploy.

Key points:
- Service type: Node Web Service
- Build command: `cd backend && npm install`
- Start command: `cd backend && npm start`
- Persistent Disk: mounted at `/var/data`
- Env var `DATA_DIR` points SQLite to `/var/data` so your DB persists across deploys

Steps:
1) Push this repo to GitHub/GitLab
2) On Render: New + → Blueprint, select the repo
3) Review `render.yaml` and create resources
4) After deploy, visit `/health` to verify status
5) Optional: add `OPENAI_API_KEY` under Environment → Add Secret




