# Live Migration Dashboard

A **real-time web dashboard** to monitor the state of a virtual machine during live migration.
Built with **Node.js + React + WebSockets**, styled with **Red Hat corporate design**, full-screen demo ready.

---

## 🔹 Features

* Reads a **variable from a file** (`watched.txt`) and sends it in real-time to the frontend
* Monitors **CPU and memory usage** of the system
* **Full-screen, centered dashboard** with **Red Hat Display** font
* Horizontal cards, Red Hat colors, and official logo
* Official Red Hat **favicon**
* Instant updates on the frontend with **WebSockets**
* Docker-ready for quick deployment

---

## 📦 Requirements

* Node.js >= 22
* npm or yarn
* Docker (optional, recommended for demo)

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/live-migration-demo-app.git
cd live-migration-dashboard
```

Install dependencies:

```bash
npm install        # backend
cd frontend
npm install        # frontend
cd ..
```

---

## 💻 Running Locally

1. Start the Node.js server:

```bash
node server.js
```

2. Open your browser:

```
http://localhost:3000
```

3. To test variable updates:

```bash
echo "MIGRATING $(date)" > watched.txt
```

The change will instantly appear in the frontend dashboard.

---

## 🐳 Using Docker

### Build the Docker image:

```bash
docker build -t live-migration-app .
```

### Run the container:

```bash
docker run -it --rm -p 3000:3000 \
  -v $(pwd)/watched.txt:/app/watched.txt \
  live-migration-app
```

### Open the dashboard:

```
http://localhost:3000
```

Full-screen demo is now ready with Red Hat styling and logo.

---

## 🖌 Red Hat Style

* Font: [Red Hat Display](https://fonts.google.com/specimen/Red+Hat+Display)
* Logo: ![Red Hat](https://www.redhat.com/cms/managed-files/Brand_Standars-Red_Hat-_color_on-darkgray.svg)
* Color palette: Red (#f43f5e), Blue (#38bdf8), Dark gray (#020617 ~ #09090b)

---

## 📂 Project Structure

```
live-migration-dashboard/
├─ frontend/                # React frontend
│  ├─ src/
│  ├─ package.json
│  └─ vite.config.js
├─ server.js                # Unified Node.js backend
├─ watched.txt              # Example variable file
├─ Dockerfile
├─ package.json             # Backend
└─ README.md
```

---

## ⚡ Technologies

* [Node.js](https://nodejs.org/)
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Socket.io](https://socket.io/)
* Docker
* Inline CSS styled with Red Hat design

---

## 🔹 Customization

* Change the variable in `watched.txt` and see real-time updates on the dashboard
* Adjust sizes and styles in `App.jsx`
* Change background, colors, and logos while keeping Red Hat style

---

## 📝 License

Open-source project, free for demos and testing.
