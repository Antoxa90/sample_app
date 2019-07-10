# React Typescript Node App

## Server

1. Create docker container with mysql server

    `make create`
    
2. Start server

    `npm run start` or `npm run watch`

3. Load migrations and, if necessary, seeders (compiled js files are used)

    ```
    make db-update
    make db-seeds
    ```
    
4. Run tests (need migrations for test database)

`npm test`

## Client

Run webpack dev server

`npm run dev`