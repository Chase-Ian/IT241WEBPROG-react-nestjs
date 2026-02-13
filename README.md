# IT241WEBPROG-react-nestjs
a submission to program task

# 🖊️ Full-Stack Guestbook Monorepo

This project is a full-stack application featuring a **NestJS** backend and a **Vite/React** frontend, unified in a single repository for seamless deployment on **Vercel**.

---

## 🚀 Deployment Checklist

### 1. Environment Variables
Add these to your **Vercel Project Settings**:

| Key | Description |
| :--- | :--- |
| `SUPABASE_URL` | Your Supabase Project URL (https://...) |
| `SUPABASE_KEY` | Your **Service Role** Secret Key |

### 2. Vercel Project Configuration
Ensure these settings are used during import/deployment:
* **Root Directory:** `./`
* **Build Command:** `cd frontend && npm install && npm run build`
* **Output Directory:** `frontend/dist`

---

## 🏗️ Project Architecture

### **The Backend (`/backend`)**
* **Framework:** NestJS
* **Database:** Supabase
* **Route:** Responds to `/guestbook`
* **Key Feature:** Acts as a secure proxy between the frontend and Supabase.

### **The Frontend (`/frontend`)**
* **Framework:** React (Vite)
* **API Calls:** Uses relative paths (`const API = "/guestbook"`) to avoid CORS issues.

### **The Router (`vercel.json`)**
The root configuration file directs traffic:
1.  Requests to `/guestbook` $\rightarrow$ **NestJS**
2.  All other requests $\rightarrow$ **React Frontend**

---

## 🛠️ Step-by-Step Setup

### **Backend Setup**
1.  Ensure `backend/src/main.ts` uses the `export default` handler for Vercel.
2.  Ensure `GuestbookController` is decorated with `@Controller('guestbook')`.

### **Frontend Setup**
1.  In `frontend/src/App.jsx`, ensure the API variable is relative:
    ```javascript
    const API = "/guestbook";
    ```

### **Database Setup**
1.  In Supabase, create a table named `guestbook`.
2.  Columns needed: `id` (int8/uuid), `name` (text), `message` (text), `created_at` (timestamp).

---

## 💻 Local Development

Run the backend and frontend in two separate terminals:

**Terminal 1 – Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🛑 Troubleshooting

* **500 Error:** Check Vercel logs for a missing `SUPABASE_URL`.
* **404 Error:** Verify the `rewrites` section in the root `vercel.json` matches the backend controller path (`/guestbook`).
* **CORS Error:** Ensure both apps are deployed within the same Vercel project using the monorepo structure.

---

## 📄 License

This project is released under the [MIT License](LICENSE) unless otherwise noted.