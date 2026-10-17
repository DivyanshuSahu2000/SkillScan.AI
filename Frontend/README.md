# Resume Checker

## Run locally

Use Node.js 20.19 or newer.

1. In `Backend`, create or update `.env` with `MONGO_URI`, `JWT_SECRET`, and
   `SKILLSCAN_GENAI_API_KEY`. `PORT` is optional and defaults to `3000`.
   `CLIENT_URL` is optional and defaults to `http://localhost:5173`.
2. Start the backend:

   ```sh
   cd Backend
   npm install
   npm run dev
   ```

3. Start the frontend in another terminal:

   ```sh
   cd Frontend
   npm install
   npm run dev
   ```

The frontend API defaults to `http://localhost:3000`. Set `VITE_API_URL` in a
Frontend `.env.local` file to use a different backend URL.

## Checks

- Backend: `npm test` and `npm audit`
- Frontend: `npm run lint` and `npm run build`
