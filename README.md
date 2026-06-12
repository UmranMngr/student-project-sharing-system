
```markdown
# Proje Vitrini (Student Project Sharing System)

**Proje Vitrini** is a full-stack web application developed as an internship project. It serves as a social platform where Computer Engineering students can share their projects, customize their professional profiles, and interact with fellow peers through a global feed with search, like, and comment features.

---

## 🎬 Gameplay / Application Demo
Watch the full application walk-through showing registration, login, profile customisation, and project sharing features:

<video src="BURAYA_VIDEO_LINKINI_EKLEYIN" width="100%" controls></video>

---

## 📸 Screenshots

### 🖥️ Authentication & Navigation
| Register Page | Login Page |
| :---: | :---: |
| <img src="BURAYA_REGISTER_RESIM_LINKINI_EKLEYIN" width="100%"/> | <img src="BURAYA_LOGIN_RESIM_LINKINI_EKLEYIN" width="100%"/> |

### 📰 User Interaction & Dashboard
| Global Feed (Home) | User Profile |
| :---: | :---: |
| <img src="BURAYA_HOME_RESIM_LINKINI_EKLEYIN" width="100%"/> | <img src="BURAYA_PROFILE_RESIM_LINKINI_EKLEYIN" width="100%"/> |

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
