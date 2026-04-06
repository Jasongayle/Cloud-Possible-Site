# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `artifacts/cloud-possible` (`@workspace/cloud-possible`)

Marketing website for Cloud Possible (Think Jay Inc, Ontario). 6-page React+Vite+Tailwind site targeting small businesses (10–50 employees) with managed IT support. Sky-blue/white design.

- Pages: Home, Services, Residential, Pricing, Contact, Privacy, Terms
- Contact: info@cloudpossible.ca | Calendly: https://calendly.com/jasongayle-8d-d/30min
- Formspree ID: xwvrzqqd (used on contact form)
- LinkedIn: https://www.linkedin.com/company/cloud-possible
- Pricing: Starter $79/mo, Growth $149/mo, Business $299/device/mo
- Service cities: Brampton, Mississauga, Caledon, Georgetown, Oakville, Milton, Kitchener, Guelph, Waterloo, Cambridge, Brantford, Paris
- No phone number on site (email + Calendly only)

### `artifacts/lead-form` (`@workspace/lead-form`)

Standalone embeddable lead capture form. Designed to be iframed into the main site. Sky-blue palette.

- 5-step form: client type → contact info → dynamic fields (residential/business) → urgency → consent + submit
- Submits to `POST /api/leads` on the api-server
- Uses `postMessage` to notify parent window of height changes for auto-resize in iframes
- Success screen shown after submission
- Validation on every step before advancing

#### Embedding the form in another site

Copy-paste this snippet anywhere you want the form to appear:

```html
<iframe
  id="cloud-possible-lead-form"
  src="https://YOUR_DOMAIN/lead-form/"
  width="100%"
  height="640"
  style="border: none; border-radius: 12px; display: block;"
  title="Get IT Support — Cloud Possible">
</iframe>

<!-- Optional: auto-resize the iframe to fit its content -->
<script>
  window.addEventListener("message", function (e) {
    if (e.data && e.data.type === "lead-form-resize") {
      var frame = document.getElementById("cloud-possible-lead-form");
      if (frame) frame.style.height = e.data.height + "px";
    }
  });
</script>
```

Replace `YOUR_DOMAIN` with the deployed domain (e.g. `cloud-possible.replit.app`) or the Replit dev domain for local testing. The form broadcasts `{ type: "lead-form-resize", height: <px> }` messages to the parent window so no fixed height is required.

### `lib/db` leads table

Schema: `lib/db/src/schema/leads.ts`
Fields: id, name, email, phone, clientType (residential/business), deviceType, companyName, employeeCount, issueType, urgency, consent, createdAt

### `artifacts/api-server` leads route

Route: `artifacts/api-server/src/routes/leads.ts`
- Validates with Zod, inserts to DB, sends admin + user confirmation emails via Resend
- Resend emails skipped gracefully if RESEND_API_KEY not set
- Admin email goes to info@cloudpossible.ca

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
