# React Product CRUD Frontend

A simple Vite + React frontend that communicates with the Laravel backend repository.

## First-time setup

1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Start the Laravel backend at `http://127.0.0.1:8000`.
4. Run `npm run dev`.

## Configuration

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Only variables starting with `VITE_` can be read by React in Vite.

## Included CRUD actions

- **Create** a product
- **Read** the product list
- **Update** a product
- **Delete** a product

The main UI and API calls are in `src/App.jsx`. Comments explain where to change fields, URLs, and requests.
