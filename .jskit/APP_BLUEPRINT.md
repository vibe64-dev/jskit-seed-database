# App Blueprint

<!-- vibe64-blueprint-covered-commit: 5eb11c00cbcec451a752e5941edd2f3f669d4729 -->

## Product foundation

**App** is a small account-based application. People register with an email and password, enter the signed-in home surface, sign out, and can sign in again with the same database-backed account.

- Tenancy mode is `none`; there are no teams or workspaces.
- Authentication is local username/password with a database backend.
- MariaDB is the durable store for authentication and user profile data.
- AI, payments, mobile packaging, collaboration, and other product extras are outside the current scope.

## JSKIT architecture

The application is a JSKIT Fastify + Vue shell generated directly at the repository root.

- `@jskit-ai/database-runtime` and `@jskit-ai/database-runtime-mysql` own database runtime integration.
- `@jskit-ai/auth-core`, `@jskit-ai/auth-web`, `@jskit-ai/auth-provider-local-core`, and `@jskit-ai/auth-provider-local-db-core` own authentication and the generated login, registration, and sign-out surfaces.
- `@jskit-ai/users-core` and `@jskit-ai/users-web` own user profile behavior and account settings surfaces.
- `@local/main` is limited to app composition and lightweight provider wiring.
- `@local/users` is the generated CRUD package for the `users` table. Its repository owns persistence and row mapping, its service owns operations, and its provider registers the resource, actions, and routes.
- New framework-owned packages, routes, resources, migrations, providers, and generated UI surfaces must continue to be created through `npx jskit add ...` or `npx jskit generate ...` before narrow manual edits.

## Data and runtime

- Vibe64 supplies `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`; credentials are not stored in source.
- `npm run db:migrate` synchronizes JSKIT migrations and applies them through Knex.
- Generated migrations under `migrations/` define the `users` profile table and `auth_local_users` local-auth table.
- `config/server.js` selects users-backed auth profiles.
- `config/public.js` defines `home`, `auth`, and authenticated `account` surfaces and keeps workspace requirements disabled.

## Browser surfaces

- `/auth/login` hosts local sign-in and registration.
- `/home` is the main shell surface.
- `/account` is authenticated account settings, with profile, preferences, and notifications sections registered through placements.
- `/home/settings/general` contains the shell navigation preference. Its wrapper intentionally omits the generic “Settings / Home settings” introduction.
- Navigation and UI composition are registered in `src/placement.js` and `src/placementTopology.js`; client pages should remain thin and composable-driven.

## Verification

Primary commands:

```bash
npm install
npm run db:migrate
npm run build
npm run verify
```

Portable browser coverage is in:

- `tests/auth-flow.spec.ts`: register, verify the signed-in identity, sign out, create a fresh browser context, and sign in again.
- `tests/settings-general.spec.ts`: verify the General Settings behavior and confirm the removed introduction stays absent.
- `tests/support/base-url.ts`: prefer `PLAYWRIGHT_BASE_URL`, otherwise discover the Vibe64-managed preview endpoint, with the ordinary local port as the non-Vibe64 fallback.

Inside Vibe64, browser tests use the managed runtime only:

```bash
vibe64-playwright test tests/auth-flow.spec.ts tests/settings-general.spec.ts
npx jskit app verify-ui --command "vibe64-playwright test tests/auth-flow.spec.ts tests/settings-general.spec.ts" --feature "database-backed account flow and general settings copy" --auth-mode custom-local
```

The project Playwright version is pinned to the matching Vibe64-managed runtime and should be updated in lockstep with that runtime. Any browser-visible change must refresh `.jskit/verification/ui.json` before the final `npm run verify`.
