# 📦 Micro Frontend Workspace  
## React 18 · Webpack 5 · Module Federation

---

## 📌 Overview

This repository demonstrates a **production-grade Micro Frontend (MF) architecture** using  
**Webpack 5 Module Federation** and **React 18**.

The primary goal of this project is to understand **how Module Federation works at runtime**, not just at a configuration level.

This setup demonstrates:

- Independent build and deployment of frontend applications
- Runtime composition using Webpack Module Federation
- Safe dependency sharing (React as a singleton)
- Library-style remotes (Shared UI)
- Async bootstrap pattern to avoid eager loading issues
- Clear routing ownership and responsibility boundaries
- Interview-ready, enterprise-aligned structure

This repository is intentionally **small, readable, and concept-focused**, while still following **real-world enterprise patterns**.

---

## 🧩 Applications in This Workspace

This workspace contains **one Host application** and **multiple Remote applications**.

---

## 🏠 Host Application

### Shell (Host)

The **Shell** is the entry point of the system and acts as the **orchestrator** for all micro-frontends.

### Responsibilities

- Owns **application-level routing**
- Handles **authentication & authorization**
- Provides **global layout** (Header, Footer)
- Loads remote applications dynamically
- Provides shared runtime context (Router, React)

### Key Characteristics

- Uses `React.lazy` and `Suspense` to load remotes
- Contains **no business logic**
- Does **not** depend on remote internals
- Shares `react`, `react-dom`, and `react-router-dom` as singletons

> The Shell decides **what** to load and **when**, but never **how** features are implemented.

---

## 📦 Remote Applications (`packages/`)

---

### 🎨 shared-ui (Library Remote)

A **pure UI component library**, exposed via Module Federation.

#### Exposed Components

- `Input`
- `Button`
- `Textarea`

#### Important Characteristics

- ❌ No routing
- ❌ No `ReactDOM.render`
- ❌ No `bootstrap.js`
- ✅ Library-style remote
- ✅ Exports components only
- ✅ Loaded asynchronously to avoid eager consumption

#### Why this matters

`shared-ui` is **consumed**, not **mounted**.

Treating a shared UI library like a full application causes:

- Eager loading issues
- React singleton conflicts
- `Shared module is not available for eager consumption` errors

This project intentionally keeps `shared-ui` **stateless and mount-free**.

---

### 📝 form-designer (Feature Remote)

A feature-level micro-frontend responsible for rendering a form.

#### Responsibilities

- Displays a form screen
- Uses components from `shared-ui`
- Can run:
  - Standalone (local development)
  - Embedded inside the Shell or other remotes

#### Characteristics

- Uses async `bootstrap.js`
- Can expose full screens or individual components
- Shares React and Router context from the Shell
- Own build, own deploy

---

### 📊 dashboard (Feature Remote)

A feature-level micro-frontend representing the dashboard domain.

#### Responsibilities

- Displays dashboard UI
- Contains a **New** button
- On click → navigates to **Form Designer**
- Handles **feature-level navigation logic**

#### Characteristics

- Uses `useNavigate` from Shell router context
- Does **not** declare its own `BrowserRouter`
- Loaded lazily by the Shell
- Can consume other remotes

---

## 🔐 Authentication Flow (Shell-Owned)

Authentication is centralized in the **Shell**, not in remotes.

```text
User opens app
   ↓
Shell checks auth state
   ↓
Not logged in → redirect to /login
   ↓
User enters credentials
   ↓
Login success
   ↓
Auth state updated (token stored)
   ↓
Redirect to Dashboard


---

Login page
   ↓
Call Redux action
   ↓
Redux updates auth state
   ↓
Redux writes token to localStorage
   ↓
ProtectedRoute allows access
   ↓
Page refresh
   ↓
Redux hydrates state from localStorage


## 🗂 Folder Structure

```text
workspace/
│
├── app/
│   └── shell/
│       ├── public/
│       │   └── index.html
│       ├── src/
│       │   ├── auth/
│       │   │   └── auth.js
│       │   ├── layout/
│       │   │   ├── Header.js
│       │   │   ├── Footer.js
│       │   │   └── MainLayout.js
│       │   ├── pages/
│       │   │   ├── Login.js
│       │   │   └── NotFound.js
│       │   ├── routes/
│       │   │   └── ProtectedRoute.js
│       │   ├── App.jsx
│       │   ├── bootstrap.js
│       │   └── index.js
│       ├── webpack.config.js
│       ├── .babelrc
│       └── package.json
│
├── packages/
│   ├── shared-ui/
│   │   ├── src/
│   │   │   ├── Input.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Textarea.jsx
│   │   │   └── exports.js
│   │   └── webpack.config.js
│   │
│   ├── form-designer/
│   │   ├── src/
│   │   │   ├── Form.jsx
│   │   │   ├── bootstrap.js
│   │   │   └── index.js
│   │   └── webpack.config.js
│   │
│   └── dashboard/
│       ├── src/
│       │   ├── Dashboard.jsx
│       │   ├── bootstrap.js
│       │   └── index.js
│       └── webpack.config.js
│
├── .gitignore
├── package.json
└── README.md
```

                 ┌──────────────────┐
                 │      SHELL       │
                 │  (Host App)      │
                 │  - Routing       │
                 │  - Auth          │
                 │  - Layout        │
                 └─────────┬────────┘
                           │
        ┌──────────────────┼───────────────────┐
        │                  │                   │
┌───────▼────────┐  ┌──────▼────────┐  ┌───────▼────────┐
│   Dashboard     │  │ Form Designer │  │  Shared UI     │
│   (Remote)      │  │   (Remote)    │  │  (Library MF)  │
│                 │  │               │  │               │
│ - Feature UI    │  │ - Business UI │  │ - Input       │
│ - Own build     │  │ - Own build   │  │ - Button      │
│ - Own deploy    │  │ - Own deploy  │  │ - Textarea    │
└─────────────────┘  └────────────────┘  └───────────────┘




