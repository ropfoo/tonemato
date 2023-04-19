## Development

### Docker

start the whole stack for local development:

```bash
docker compose up -d
```

### Local

If you want to start apps individually on your local machine, you can use the following predefined scripts to do so

```bash
docker compose up -d redis # Start the Redis container (needed as a backend for ralts)
npm install                # in root folder, install all dependencies of every service in this repository

# then one of the following scripts
npm run dev:drilbur        # Start the scraping service
npm run dev:ralts          # Start the redis cache interface
npm run dev:smeargle       # Start the SolidJS Frontend Application
```

#### Notes
* The `ralts` service definitely needs the `redis` Docker container to work.
* The apps currently have a dependency on each other from Frontend to Backend:
  * if you start `smeargle`, you will also have to start `ralts` which also needs `drilbur` if there is no current cache stored in redis.
* Also make sure your local npm version matches the packageManager version in package.json