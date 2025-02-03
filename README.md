# Codenames Game

A real-time, multiplayer Codenames game built with **Vite (React)** for the frontend and **Node.js (Express + Socket.io)** for the backend.

## 🚀 Features

- **Fast & Optimized:** Uses Vite for fast development and builds.
- **Real-Time Gameplay:** Socket.io for instant game updates.
- **Responsive UI:** Styled with Emotion.js & optimized for all screen sizes.
- **Turn-Based System:** Spymaster gives clues, operatives guess words.

---

## 📦 Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/davdtheemonk/codenames.git
cd codenames
```

### **2️⃣ Install Dependencies**

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### **3️⃣ Run the Development Servers**

#### Start the Backend (Node.js Express)

```bash
npm start
```

#### Start the Frontend (Vite)

```bash
cd frontend
npm run dev
```

```bash
1. Open a minimum of four tabs, the game requires a minimum of four player( 2 spymasters and 2 operatives)
2. Fill in demo players, 2 on each team, red and blue.
3. Click start game on the first players' tab you added
4. Play
```

---

## 🛠 Environment Variables

For the **frontend**, create a `.env` file in the `client` directory:

```env
VITE_BACKEND_URL = http://localhost:3001
```

---

## 🖥️ Tech Stack

- **Frontend:** React (Vite), TypeScript, Emotion.js (CSS-in-JS)
- **Backend:** Node.js, Express, Socket.io
- ***

## 📌 Future Enhancements

- 🏆 Store game state in **Redis** for scalability
- 🔄 Add **MongoDB/PostgreSQL** for persistent game history
- 📱 Improve mobile experience with better touch interactions
- **Deployment:** Nginx, Docker
