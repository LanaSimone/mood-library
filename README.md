# 🎵 Mood Library

A full-stack web application that enables users to organize songs by mood, generate dynamic playlists, and play music through an embedded YouTube player with automatic playlist navigation.

---

## 🚀 Live Demo

Frontend: https://mood-library-one.vercel.app
Backend API: https://mood-library-api.onrender.com  

> ⚠️ The backend is hosted on Render and may take a few seconds to wake up on first request.

---

## ✨ Features

- 🔐 User authentication (register & login)
- 🎶 Add, edit, and delete songs
- 📚 Personal song library per user
- 🎧 Automatically generated mood-based playlists
- ▶️ Embedded YouTube player with autoplay
- ⏭️ Playlist navigation (Next / Previous)
- 🔄 Playlist state persistence on refresh
- 💾 Data stored per user via backend API

---

## 🧪 Demo Account

Use the following credentials to explore the app without creating an account:

- Username: demo  
- Password: demo123

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- CSS (custom styling)

### Backend
- Node.js
- Express
- SQLite

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🧠 How It Works

- Songs are stored in a SQLite database with a `moodId`
- Songs are grouped dynamically into playlists based on mood
- The YouTube URL is parsed to extract the video ID
- The player automatically advances through the playlist
- User sessions are stored locally and tied to API requests

---

## 📸 Screenshots

### 🔐 Login
![Login](https://github.com/user-attachments/assets/6a414a9d-ff37-44e5-aa89-b1fc1bdae7fe)

### 🏠 Dashboard
![Dashboard](https://github.com/user-attachments/assets/123fcd0d-56aa-4b6a-8438-588d7cbed079)

### ➕ Add Song
![Add Song](https://github.com/user-attachments/assets/e66288a5-1a7a-43d3-9e77-00a7f2d23447)

### 📚 Library
![Library](https://github.com/user-attachments/assets/2aabaf23-1367-47d1-aa91-a0dd6aeb31a4)

### 🎵 Mood Playlists
![Playlist](https://github.com/user-attachments/assets/7cf3b261-915f-4b7e-92bb-e93194460209)

### 🎧 Playlist Player
![Moods](https://github.com/user-attachments/assets/e1007f74-30df-4a3f-9f2d-23fdd9f1430c)

---

## ⚙️ Installation (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mood-library.git
cd mood-library
