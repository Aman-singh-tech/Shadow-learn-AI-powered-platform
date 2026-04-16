# ShadowLearn AI - Powered Platform

ShadowLearn is an AI-powered educational platform designed to enhance the learning experience through intelligent search and handoff systems.

## 🚀 Project Structure

This project is organized into a clean `frontend` and `backend` structure for professional development and easy deployment.

```bash
shadowlearn/
├── backend/            # Express.js Server & AI Integration
│   ├── controllers/    # Request handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── server.js       # Entry point
│   └── .env            # Backend environment variables
└── frontend/           # React + Vite UI
    ├── src/            # Application source code
    ├── public/         # Static assets
    ├── index.html      # Main entry point
    └── .env            # Frontend environment variables
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Gemini API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`.
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and set `VITE_API_URL=http://localhost:5000`.
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

- **Frontend**: Recommended to deploy on **Vercel** or **Netlify**. Set the `Root Directory` to `frontend`.
- **Backend**: Recommended to deploy on **Render**, **Railway**, or **Heroku**. Set the `Root Directory` to `backend`.

## 📄 License
This project is licensed under the ISC License.
