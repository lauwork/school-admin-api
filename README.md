# 📦 School Admin API (TypeScript + Express + Sequelize)

A backend assessment project built with **Node.js**, **TypeScript**, **Express**, and **MySQL**.

---

## 🚀 Features

- Upload CSV files via `/api/upload`
  → Parses teacher/student/class/subject data and inserts them into MySQL.
- Modular routing and controller structure
- Sequelize ORM with models for:
  - Teachers
  - Students
  - Classes
  - Subjects
  - Class Assignments
- Ready for expansion (`/api/class/...` endpoints)

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Runtime | Node.js (TypeScript) |
| Framework | Express |
| ORM | Sequelize |
| Database | MySQL |
| File Upload | Multer |
| CSV Parser | csv-parser |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/school-admin-api.git
cd school-admin-api/typescript
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the project root:
```
DB_NAME=school_db
DB_USER=root
DB_PASS=
DB_HOST=localhost
DB_PORT=3306
```

### 4. Run Database Sync (optional)
```bash
npx ts-node sync-models.ts
```

### 5. Start the Server
```bash
npx ts-node src/server.ts
```

Server runs at:
```
http://localhost:3000
```

---

## 📤 CSV Upload API

### **POST** `/api/upload`

**Body (form-data):**
| Key | Type | Description |
|------|------|-------------|
| `file` | File | CSV file to upload |

**Example CSV:**
```csv
teacherEmail,teacherName,studentEmail,studentName,classCode,className,subjectCode,subjectName,toDelete
teacher1@gmail.com,Teacher 1,student1@gmail.com,John Lim,P1-1,P1 Integrity,MATHS,Mathematics,0
```

**Response:**
```json
{
  "message": "Processed 3 rows successfully."
}
```

---

## 🧪 Healthcheck (optional)

```
GET /api/healthcheck
```
Returns basic API status.

---

## 🧑‍💻 Author

**Lau Lau**  
📧 laushihongwork@gmail.com  
GitHub: [@<lauwork>](https://github.com/lauwork)

---

> 💡 _Built as part of a backend coding assessment to demonstrate Express + TypeScript + Sequelize integration._
