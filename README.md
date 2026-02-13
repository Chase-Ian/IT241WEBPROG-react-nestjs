# IT241WEBPROG-react-nestjs
a submission to program task

This is a great idea. A README.md at the root of your project is essential for documenting how this Full-Stack Monorepo actually functions.Here is a clear, professional README structure that explains the architecture and the deployment steps.📖 Full-Stack Guestbook MonorepoA modern full-stack application with a NestJS backend and a Vite/React frontend, deployed as a single unit on Vercel.🏗️ How It Works (The Architecture)This project uses a Monorepo structure, meaning both the frontend and backend live in one repository.Frontend (/frontend): A React application built with Vite. It communicates with the backend using relative paths (/guestbook).Backend (/backend): A NestJS application that handles business logic and communicates with Supabase.Vercel Routing: The root vercel.json acts as a traffic controller.Any request starting with /guestbook is routed to the NestJS Serverless Function.All other requests serve the React Static Files.

📁 Project StructurePlaintext/
├── backend/            # NestJS API
│   ├── src/
│   │   ├── main.ts     # Serverless entry point
│   │   └── ...
│   └── package.json
├── frontend/           # React + Vite
│   ├── src/
│   │   ├── App.jsx     # API calls to "/guestbook"
│   │   └── ...
│   └── package.json
└── vercel.json         # Deployment & Routing config


🚀 Deployment Steps (Step-by-Step)

1. Database Setup (Supabase)Create a project on Supabase.Create a table named guestbook with columns: id, name, message, and created_at.Go to Project Settings > API and grab your URL and service_role secret key.

2. Environment VariablesIn the Vercel Dashboard (under Project Settings > Environment Variables), add the following:KeyValueSUPABASE_URLYour Supabase Project URLSUPABASE_KEYYour Supabase Service Role Key

3. Vercel Configuration (vercel.json)Ensure your root vercel.json maps the paths correctly:JSON{
  "version": 2,
  "rewrites": [
    { "source": "/guestbook/(.*)", "destination": "/backend/src/main.ts" },
    { "source": "/guestbook", "destination": "/backend/src/main.ts" },
    { "source": "/(.*)", "destination": "/frontend/$1" }
  ]
}
4. Build Settings on VercelWhen importing the repo to Vercel, use these settings:Root Directory: ./Framework Preset: Other (or let it auto-detect)Build Command: cd frontend && npm install && npm run buildOutput Directory: frontend/dist🛠️ Local DevelopmentBackend:Bashcd backend
npm install
npm run start:dev
Frontend:Bashcd frontend
npm install
npm run dev
Note: For local development, ensure the API variable in App.jsx points to http://localhost:3000/guestbook.📝 Troubleshooting404 Not Found: Check vercel.json rewrites. Ensure the path matches the @Controller('path') in NestJS.500 Internal Error: Check Vercel Logs. Usually caused by missing Environment Variables.CORS Error: Fixed by the Monorepo setup (both apps share the same domain).