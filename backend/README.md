# noove-samo challenge solution

### Before you begin:

-   make sure that you have `node` installed
-   make sure you have `docker` installed

### Run Local development environment:

1. Pull the repository using `git pull <repository_url>`
2. Enter the projects directory `cd samo-backend`
3. Run `npm install`
4. Make a copy of `.env.dev` file and rename it to `.env`
5. Run `docker compose up db` (this will run a postgres DB in docker)
6. Make sure the DB is running using command `docker ps` (you should see container running with a name 'samo-backend-db-1')
7. Run `npx prisma generate` (generates typescript types for DB model)
8. Run `npx prisma migrate reset` (this will reset the DB, create all the tables, generate dummy data)
9. If you want to see the data in a DB, run `npx prisma studio`. This will open a window in browser where you can see all the tables and data inside the db.
10. Run `npm run dev` for server start

### OpenAI section

1. Install packages:
   `bun install`

2. Run:
   `bun run index.ts`
