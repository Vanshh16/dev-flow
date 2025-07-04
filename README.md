# Flow — Full-Stack App Generation with AI Agents

**Flow** is a modern full-stack platform that turns simple prompts into fully functional web applications. Leveraging **programmable AI agents** powered by **Inngest**, it integrates OpenAI, Docker, and secure cloud sandboxes (E2B) to orchestrate code generation, background task execution, authentication, billing, and full development lifecycles with Git.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, ShadCN
- **Backend**: tRPC, Inngest, Prisma ORM
- **Database**: PrismaPostgres
- **Authentication & Billing**: Clerk
- **Execution Environment**: E2B cloud sandboxes + Docker templating
- **AI Models**: OpenAI
- **DevOps**: Git, Docker, Inngest agent runners

---

## Key Features

- **AI Agent App Builder**  
  Generate complete full-stack apps using natural language prompts.

- **Inngest Agent Toolkit**  
  Define programmable background jobs and triggers using Inngest.

- **Clerk Auth + Billing**  
  Seamlessly manage users, sessions, plans, and usage-based billing.

- **Type-Safe Full Stack with tRPC**  
  Ensure type safety across client and server.

- **Docker-based Sandbox Execution**  
  Run code securely in isolated cloud containers using E2B.

- **Live Preview + Code Explorer**  
  Instantly preview deployed projects via unique URLs and inspect source files.

- **Credit System & Usage Tracking**  
  Monitor resource consumption and stay on top of your plan.


---

## Project Structure

```bash
src/
├── middleware.ts                  # Clerk middleware for route protection
├── prompt.ts                      # Prompt processing or schema
├── app/                           # App Router root
│   ├── error.tsx                  # Global error boundary
│   ├── globals.css                # Tailwind + global styles
│   ├── layout.tsx                 # Root layout
│   ├── (home)/                    # Landing/homepage group
│   │   ├── layout.tsx             # Layout for home
│   │   ├── page.tsx               # Landing page
│   │   └── pricing/               # Pricing section
│   ├── api/                       # API routes
│   │   ├── inngest/               # Inngest webhook handler
│   │   └── trpc/[trpc]/           # tRPC handler
│   ├── projects/[projectId]/      # Project-specific views & previews
│   ├── sign-in/[[...sign-in]]/    # Clerk sign-in routes
│   └── sign-up/[[...sign-in]]/    # Clerk sign-up routes
├── inngest/                       # Inngest agent functions & jobs
├── lib/                           # Utility functions, DB, helper clients
├── modules/                       # Feature-based module separation
│   ├── home/                      # Home page UI logic
│   ├── messages/                  # Chat or LLM messages module
│   ├── projects/                  # Project generation + preview logic
│   └── usage/                     # Usage and billing dashboard logic
└── trpc/
    └── routers/                   # Modular tRPC route definitions
```