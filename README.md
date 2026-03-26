# MERN Contact Management MVP

## 🚀 Live Links
* **Frontend:** [Insert Vercel URL Here]
* **Backend API:** [Insert Render URL Here]

## 🧠 Architecture & Logic Decisions
Given the strict deadline constraints, I prioritized **reliable functionality and successful deployment** over deep UI polish, adhering to the assignment guidelines.

* **Backend:** Monolithic Express file for rapid prototyping. Used Mongoose for schema validation.
* **Frontend:** Vite + React. Kept state management native (`useState`/`useEffect`) to avoid the overhead of Redux for a simple CRUD app.
* **The "Extra Mile":** I expanded the base schema to include a `status` tag, demonstrating how this could scale into a lightweight CRM.

## 🛠 Local Setup
1. Clone repo.
2. `cd server` -> `npm install` -> add `.env` with `MONGO_URI` -> `node server.js`
3. `cd client` -> `npm install` -> `npm run dev`