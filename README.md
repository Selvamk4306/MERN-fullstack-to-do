# 📝 MERN Stack To-Do Application

A full-stack To-Do application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** that allows users to manage daily tasks efficiently with a clean and responsive UI.

---

## 🚀 Features

* ➕ Add new tasks
* 📝 Edit existing tasks
* ✅ Mark tasks as completed
* ❌ Delete tasks
* 📋 View all tasks in real-time
* 🔄 Persistent storage using MongoDB
* ⚡ Fast and responsive UI with React

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5, CSS3
* Axios (API calls)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📂 Project Structure

```
/client   → React frontend  
/server   → Node + Express backend  
/models   → Mongoose schemas  
/routes   → API routes  
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

---

### 2️⃣ Setup Backend

```
cd server
npm install
```

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```
npm start
```

---

### 3️⃣ Setup Frontend

```
cd client
npm install
npm start
```

---

## 🔗 API Endpoints

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /tasks     | Get all tasks   |
| POST   | /tasks     | Create new task |
| PUT    | /tasks/:id | Update task     |
| DELETE | /tasks/:id | Delete task     |

---

## 📸 Screenshots

*Add screenshots here (UI, task list, etc.)*

---

## 💡 Future Improvements

* 🔐 User Authentication (JWT)
* 📅 Due dates & reminders
* 🌙 Dark mode
* 📊 Task analytics

---

## 🙌 Acknowledgements

This project was built as part of my full-stack development learning journey using the MERN stack.

---

## 📬 Contact

If you’d like to connect or collaborate:

* GitHub: https://github.com/YOUR_USERNAME
* LinkedIn: (Add your profile link)

---
