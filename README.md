# React Product CRUD Frontend

A Vite + React frontend that communicates with the Laravel API in the companion `backendLaravelApp` repository.

## Run locally

1. Pull the latest changes.
2. Install dependencies with `npm.cmd install` in PowerShell. This installs React Router and updates the lock file.
3. Copy `.env.example` to `.env`.
4. Start Laravel at `http://127.0.0.1:8000`.
5. Start React with `npm.cmd run dev`.

## API configuration

The frontend reads its API base URL from `VITE_API_URL`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

The Product page calls `/products` under that base URL.

## App structure

```text
src/
├── main.jsx                 # Starts React and renders App
├── App.jsx                  # Shared layout and route definitions
├── pages/
│   ├── LandingPage.jsx      # Home route (/)
│   └── ProductPage.jsx     # Product CRUD route (/product)
└── components/
    ├── Header.jsx
    ├── Nav.jsx
    ├── SideBar.jsx
    ├── Footer.jsx
    ├── ProductForm.jsx     # Reusable create/edit form
    └── ProductList.jsx     # Reusable list and row actions
```

The page owns API requests and product state. Reusable components receive data and event handlers through props.
