## Development

### Docker

start the whole stack for local development:

```bash
docker compose up -d
```

### Manually

start individual apps locally:

```bash
npx turbo run dev --filter={app name}
```

---

**NOTE**
since ralts relies on a redis cache it will currently not run propperly when started locally - same goes for smearlge since it has no source to fetch from.

Also make sure your local npm version matches the packageManager version in package.json

---
