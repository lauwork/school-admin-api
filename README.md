# 📦 School Admin API (TypeScript + Express + Sequelize)

A backend assessment project built with **Node.js**, **TypeScript**, **Express**, and **MySQL**.

---

## 🚀 Features

- Upload CSV files via `/api/upload` → Parses teacher/student/class/subject data and inserts them into MySQL.
- List students by class via `/api/class/:classCode/students` (with pagination + optional external merge).
- Update class name via `/api/class/:classCode`.
- Generate hierarchical report via `/api/report` (Teacher → Class → Subject → Students).
- Healthcheck endpoint `/api/healthcheck` to verify API status.
- Sequelize ORM models for: Teachers, Students, Classes, Subjects, Class Assignments.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Runtime | Node.js (TypeScript) |
| Framework | Express |
| ORM | Sequelize |
| Database | MySQL |
| File Upload | Multer |
| CSV Parsing | csv-parser |

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

### 3. Configure Environment Variables
Create a `.env` file in the project root with the following content:
```
DB_NAME=school_db
DB_USER=root
DB_PASS=
DB_HOST=localhost
DB_PORT=3306
EXTERNAL_BASE_URL=http://localhost:4000
```

### 4. Start the Main API Server
```bash
npx ts-node src/server.ts
```

Server runs at:
```
http://localhost:3000
```

---

## 📤 API Endpoints

| Method | Endpoint | Description |
|---------|-----------|-------------|
| **POST** | `/api/upload` | Upload CSV and sync data (teachers, classes, students, subjects) |
| **GET** | `/api/class/:classCode/students` | Get students for a class (pagination, merges external if available) |
| **PUT** | `/api/class/:classCode` | Update a class name |
| **GET** | `/api/report` | Generate Teacher → Class → Subject → Students hierarchy |
| **GET** | `/api/healthcheck` | Check API health status |
| **GET** | `/api/teachers` | (Optional) List all teachers |

---

## 📄 Example CSV

```csv
teacherEmail,teacherName,studentEmail,studentName,classCode,className,subjectCode,subjectName,toDelete
teacher1@gmail.com,Teacher 1,commonstudent1@gmail.com,Common Student 1,P1-1,P1 Integrity,MATHS,Mathematics,0
teacher1@gmail.com,Teacher 1,commonstudent2@gmail.com,Common Student 2,P1-1,P1 Integrity,MATHS,Mathematics,0
teacher1@gmail.com,Teacher 1,commonstudent3@gmail.com,Common Student 3,P1-1,P1 Integrity,MATHS,Mathematics,1
```

---

## ✅ User Stories Coverage

| # | User Story | Endpoint | Status |
|---|-------------|-----------|--------|
| 1 | Upload CSV to import school data | `/api/upload` | ✅ Done |
| 2 | List all students for a class (merged internal & external) | `/api/class/:classCode/students` | ✅ Done |
| 3 | Update class name | `/api/class/:classCode` | ✅ Done |
| 4 | Generate teacher/class/student/subject report | `/api/report` | ✅ Done |
| 5 | Healthcheck for API status | `/api/healthcheck` | ✅ Done |

---

## 🧩 Optional: External Student API (Mock for Testing)

The system supports merging **external students** from another API source.  
This is **optional** — it helps demonstrate integration with external systems.

To simulate this, refer to the file:  
👉 [`src/externalMockServer.ts`](./src/externalMockServer.ts)

### How to Run It

In two separate terminals:

```bash
# Terminal 1 - Main API
npx ts-node src/server.ts

# Terminal 2 - External mock API
npx ts-node src/externalMockServer.ts
```

Then test:
```
GET http://localhost:3000/api/class/P1-1/students
```

When both servers are running, the system will automatically merge **internal and external students**, remove duplicates, and return a single paginated list sorted alphanumerically.

Example merged result:
```json
{
  "classCode": "P1-1",
  "total": 4,
  "page": 1,
  "size": 10,
  "students": [
	{ "email": "commonstudent1@gmail.com", "name": "Common Student 1", "is_external": false },
	{ "email": "commonstudent2@gmail.com", "name": "Common Student 2", "is_external": false },
	{ "email": "extstudent1@gmail.com", "name": "External Student 1", "is_external": true },
	{ "email": "extstudent2@gmail.com", "name": "External Student 2", "is_external": true }
  ]
}
```

---

## 🧾 Submission Summary

This project implements a complete School Administration API built using **Node.js**, **TypeScript**, **Express**, and **Sequelize (MySQL)**.

### Implemented Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/upload` | Upload CSV and sync data |
| **GET** | `/api/class/:classCode/students` | View students in class (pagination, optional external merge) |
| **PUT** | `/api/class/:classCode` | Update class name |
| **GET** | `/api/report` | Teacher → Class → Subject → Students report |
| **GET** | `/api/healthcheck` | Simple health check |

### Tech Stack

- Node.js (TypeScript)
- Express.js
- Sequelize (MySQL)
- Multer (file uploads)
- CSV Parser

**To run locally:**
```bash
npm install
npx ts-node src/server.ts
```

Base URL: `http://localhost:3000/api`

All required environment variables are defined in `.env.example`.

---

---

## 📬 Postman Collection

For easier testing, a ready-to-use **Postman collection** is included with all API endpoints.

📁 **File location:**  
[`postman/SchoolAdminAPI.postman_collection.json`](./postman/SchoolAdminAPI.postman_collection.json)

### 🔹 How to use
1. Open **Postman** → click **Import** → select the file above.  
2. Ensure your backend server is running (`http://localhost:3000`).  
3. Use the requests in the collection to test endpoints such as:
   - `POST /api/upload` – Upload and process CSV file  
   - `GET /api/class/:classCode/students` – List internal + external students  
   - `PUT /api/class/:classCode` – Update class name  
   - `GET /api/report` – Generate teacher/class/student report  
   - `GET /api/healthcheck` – API health status check

💡 *This collection includes all query parameters, example body payloads, and test data for quick validation.*

---


## 🧑‍💻 Author

**Lau Lau**  
📧 laushihongwork@gmail.com  
GitHub: [@lauwork](https://github.com/lauwork)


---

> 💡 Built as part of a backend coding assessment to demonstrate clean REST API design using Express + TypeScript + Sequelize, with optional external data integration support.
