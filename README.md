# Gaza Market

Monorepo split into:

- `frontend`: React + Vite
- `backend`: Node.js + Express + MongoDB

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Health check:

```bash
GET http://localhost:5000/api/v1/health
```

## Backend Environment

Minimum required in `backend/.env`:

- `MONGODB_URI`
- `JWT_SECRET` (32+ chars)
- `CLIENT_ORIGIN`

Optional hardening:

- `CORS_ORIGINS` (comma-separated)
- `COOKIE_NAME`
- `COOKIE_DOMAIN`
- `TRUST_PROXY`

## Tests

Backend integration tests (Vitest + Supertest + in-memory Mongo):

```bash
cd backend
npm run test:run
```

Frontend quality checks:

```bash
cd frontend
npm run lint
npm run build
```

## Docker

Run full stack with MongoDB:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

## CI

GitHub Actions workflow at `.github/workflows/ci.yml` runs:

- Frontend lint + build
- Backend integration tests
