

# Proje Vitrini (Student Project Sharing System)

**Proje Vitrini** is a full-stack web application developed as an internship project. It serves as a social platform where Computer Engineering students can share their projects, customize their professional profiles, and interact with fellow peers through a global feed with search, like, and comment features.

---

## 🎬 Gameplay / Application Demo
Watch the full application walk-through showing registration, login, profile customisation, and project sharing features:

https://github.com/user-attachments/assets/1e3102c7-bcc6-4c07-b9b9-5bbb5d47e5ab

---

## 📸 Screenshots

### 🖥️ Authentication & Navigation
| Menu |
| :---: |
|<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/ccfd6db8-94fb-4080-9baf-5e2630be4926" />|

| Register Page | Login Page |
| :---: | :---: |
| <img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/b2f8e733-22f2-4471-aa85-b014b78af521" />|
  <img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/c3db8bc3-8938-45ae-a1e5-f478f232ad68" />|

### 📰 User Interaction & Dashboard
| Global Feed (Home) | User Profile |
| :---: | :---: |
| <img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/8efd5063-1cd7-4b6d-9031-3a4642824ad7" />| 
 <img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/71fad635-7d69-4fa6-9cc4-be3e77cedf5b" />|

---

## 🚀 Key Features

* **User Authentication:** Secure registration and login mechanism for students.
* **Student Dashboard & Profiles:** Custom profiles showcasing professional student titles (e.g., Computer Engineer), bio details, and individual shared project logs.
* **Project CRUD Operations:** Users can dynamically create, view, and delete their project entries.
* **Social Interactions:** A global timeline where users can search for posts, add comments, and like shared content interactively.

---

## 🛠️ Tech Stack

### Backend
* **Framework:** .NET 8 Web API (C#)
* **ORM:** Entity Framework Core
* **Architecture:** Layered Architecture (Controllers, Services, Data, DTOs, Helpers)

### Frontend
* **Framework:** React.js (Single Page Application)
* **Routing:** React Router DOM
* **Styling:** Custom Component-based CSS

### Database
* **Engine:** SQL Server (Database deployment managed via `.bacpac` data-tier backup)

---
```markdown
## 📂 Project Structure

```text
staj_proje/
├── my-app/                       # Frontend: React.js SPA
│   ├── public/                   # Static public assets
│   └── src/                      # Source files
│       ├── assets/               # Images and icons
│       ├── components/           # Reusable layout components (Navbar, Sidebar, etc.)
│       ├── pages/                # Page components (Home, Profile, Login, Register)
│       ├── services/             # API connection and Axios handlers
│       ├── App.js                # Core routing application
│       └── index.js              # React entry point
├── staj_proje/                   # Backend: .NET 8 Web API
│   ├── Controllers/              # API endpoints mapping HTTP requests
│   ├── Data/                     # DbContext and database seeding logic
│   ├── DTOs/                     # Secure Data Transfer Objects
│   ├── Helpers/                  # Utility classes and helper functions
│   ├── Migrations/               # Entity Framework Core database state snapshots
│   ├── Models/                   # Core Database Entities
│   ├── Services/                 # Business Logic Layer (BLL)
│   └── Program.cs                # Dependency injections and server bootstrapper
├── pictures/                     # Documentation media files
├── staj_proje.sln                # Visual Studio Solution file
└── WebProjectDatabase.bacpac      # SQL Server Database schema & data backup

```

---

## 🛫 Getting Started

### 1. Database Restoration

This repository includes a full database backup in `.bacpac` format.

1. Open **SQL Server Management Studio (SSMS)**.
2. Right-click on **Databases** -> **Import Data-tier Application...**
3. Select `WebProjectDatabase.bacpac` from the project root and proceed with the restoration steps.
4. Verify/Update the connection string inside `staj_proje/appsettings.json`.

### 2. Running the Backend (.NET 8)

1. Navigate into the backend repository:
```bash
cd staj_proje

```


2. Restore package dependencies and run:
```bash
dotnet restore
dotnet run

```


3. The API Gateway will spin up on its configured localhost port.

### 3. Running the Frontend (React)

1. Navigate into the frontend repository:
```bash
cd my-app

```


2. Install dependencies via npm:
```bash
npm install

```


3. Boot up the local development web server:
```bash
npm start

```


4. Open `http://localhost:3000` in your web browser.

---

## 🎓 Credits

Developed as part of a Computer Engineering Internship Project at **Aydın Adnan Menderes University**.

```

```
