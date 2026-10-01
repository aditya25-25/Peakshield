# PeakShield Backend

A FastAPI-based backend for the PeakShield mountain safety and emergency intelligence platform. The service is designed to support citizen safety intelligence, rescue operations, weather/risk evaluation, and an AI-ready decision-support layer without fabricating live emergency data.

## Architecture

- API layer: FastAPI routers under `app/api/routes`
- Core services: auth, weather, risk, route, incident, alert, analytics, notification, AI
- Database layer: SQLAlchemy models under `app/models` with async/SQLite-friendly configuration
- Security: JWT authentication, password hashing, CORS, validation, route-level protections
- External integrations: weather and AI hooks with graceful degraded fallback behavior

## Local development

1. Open a terminal in the `backend` directory.
2. Create a virtual environment if needed.
3. Install dependencies:

   python -m pip install -r requirements.txt

4. Start the API:

   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

5. Open the docs:

   - http://localhost:8000/docs
   - http://localhost:8000/redoc

## Environment variables

See `.env.example` for the required keys. At minimum:

- DATABASE_URL
- JWT_SECRET
- JWT_REFRESH_SECRET
- ACCESS_TOKEN_EXPIRE_MINUTES
- REFRESH_TOKEN_EXPIRE_DAYS
- CORS_ORIGINS
- OPENWEATHER_API_KEY
- OPENAI_API_KEY
- REDIS_URL
- MAP_PROVIDER_KEY
- FCM_PROJECT_ID
- FCM_PRIVATE_KEY
- FCM_CLIENT_EMAIL

Do not commit real secrets.

## Database setup

The app is configured for PostgreSQL/PostGIS in production, while local development may default to SQLite for lightweight testing. PostgreSQL settings are supported through `DATABASE_URL` and can be run with the provided docker-compose service.

## Migrations

This project includes Alembic scaffolding under `backend/alembic` and a SQLAlchemy metadata layer under `app/models`.

Example:

   alembic revision --autogenerate -m "initial schema"
   alembic upgrade head

## Authentication and roles

Supported roles:

- USER
- RESCUER
- ADMIN
- ANALYST

Endpoints support secure JWT access and refresh tokens. The service validates tokens and enforces role checks on protected routes.

## Risk and safety services

The backend exposes weather, risk assessment, route evaluation, facilities, and alert endpoints that are aligned to PeakShield’s mountain-safety use case. Risk output is intentionally framed as environment assessment rather than confirmed disaster status unless a verified source is present.

## AI and RAG foundation

The AI layer exposes a chat endpoint and a rescue-copilot endpoint. It uses a trusted-context pattern and explicitly avoids fabricating weather, rescue dispatches, or user safety assurances without verification.

## Docker

Local development support is included through:

- `backend/Dockerfile`
- `backend/docker-compose.yml`

Run:

   docker compose up --build

## Testing

Execute from the backend directory:

   python -m pytest -q
   python -m ruff check app tests
   python -m compileall .

## Known limitations

- This implementation uses in-memory authentication state and in-memory fallback data to keep the project runnable without external services during local testing.
- Full PostGIS vector indexing and production-grade alert ingestion are scaffolded but not fully backed by a live external data pipeline in this repository snapshot.
- Frontend integration is implemented at the API contract layer; the current Vite app still uses mock fallback data when no backend URL is configured.

## Deployment

For production deployment, configure a PostgreSQL/PostGIS instance, Redis, and secure environment variables before enabling live weather and AI integrations.
