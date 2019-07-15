# React Typescript Node App

## Server

1. Create docker container with mysql server

    `make up`
    
2. Start server

    `npm run start` or `npm run watch`

3. Load migrations and, if necessary, seeders (compiled js files are used)

    ```
    make db-update
    make db-seeds
    ```
    
4. Run tests (need migrations for test database)

    ```
    make db-update-test
    npm test
    ```

## Client

Run webpack dev server and go to http://localhost:8000

    `cd frontend/ && npm run dev`

Or compile frontend and go to http://localhost:9000

    `cd frontend/ && npm run build`