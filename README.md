## Development

start the whole stack for local development:

```bash
# 🐳 Docker
docker compose up -d
```

If you want to start apps individually on your local machine, you can use the following predefined scripts to do so (still requires docker for redis and the mock server)

```bash
# 🍅 Manual
toto init

# start dev servers
toto drilbur dev # Start the scraping service along with a docker container running the mock server
toto ralts dev # Start the teaser backend along with a docker container running redis
toto smeargle dev # Start the web frontend app

# other handy commands
toto up # docker compose up -d
toto down # docker compose down

toto < service > install
toto < service > test
```

### Setup

Add an alias to your `~/.bashrc` or `~/.zshrc`.
You can call this however you want but in the following we will go with `toto` since its a bit shorter than `tonemato`.

```nano
alias toto="sh tonemato.sh"
```

This is not required but a handy alternative to:

```bash
# root
sh tonemato.sh
```

#### Notes

- The `ralts` service definitely needs the `redis` Docker container to work.
- The apps currently have a dependency on each other from Frontend to Backend:
  - if you start `smeargle`, you will also have to start `ralts` which also needs `drilbur` if there is no current cache stored in redis.

#### Overview
<img width="981" alt="Screenshot 2023-05-31 at 13 07 25" src="https://github.com/ropfoo/tonemato/assets/18482002/609b82ed-24ec-4edc-a82d-23a0b93bdce4">

