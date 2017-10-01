# NOTIA test project
- Project consists of 2 separate applications: **frontend** + **backend** (server) 
- Frontend app is in Angular 4 and created with Angular-CLI 
- Backend app is in Node.js and Express

## Getting started
- To get started run:
```
npm install
```
- Next step is to create a database configuration file */server/config/db.ts.*
A template file for this configuration is */server/config/db.ts.example.* You can use the following command:
```
cp server/config/db.ts.example server/config/db.ts
```
- This *db.ts* file containing the real database configuration should never be tracked in Git. Therefore the file is already included in *.gitignore.*
If you decide to call your configuration file something else, you need to add it to *.gitignore* yourself
- Last step is to make a fresh dev-build so you have the */dist* folder ready:
```
npm run build:all:dev
```

## Development
- When developing, run:
```
npm run watch:all
```
- Browser should open automatically. If not, open it and load [localhost:4200](http://localhost:4200)
- When making changes to the frontend the code automatically re-compiles when saved and the browser refreshes. Same thing happens with the backend app - when changes are made the backend app re-compiles and the node server restarts.

### Frontend app structure
- All frontend files are in */client/* folder. All frontend source files are then in sub-folder *app/*
- App's components go in folder *components/,* interfaces in folder *interfaces/* and so on 
- App's root component is called **AppComponent**
- Routing is defined in *app-routing.module.ts*

#### Frontend code scaffolding
- When creating new components, services, interfaces etc., use generator provided by angular-cli
```
ng g component components/my-new-component
ng g interface interfaces/my-new-interface
ng g pipe pipes/my-new-pipe
```
- For more information about generation commands see [here](https://github.com/angular/angular-cli/wiki/generate)

### Backend app structure
- All backend files are in */server/* folder
- Server's main file is *server.ts*
- **Routing** is defined in *router.ts*
- **Models** are in 'models/' sub-folder. Models should be the only place where you interact with the database
- **Controllers** in sub-folder 'controllers/' handle REST requests and use mentioned models to get the data
- For database access use **Db** singleton class defined in *helpers/db.ts*
  - You must call `Db.init()` before using the class (this project already calls it in *server.ts*)
  - Database connection configuration is specified in **DbConfig** module in *db.ts* (which you must create yourself initially - see section *Getting started*)
  - Use `Db.query()` to execute SQL
    
### How the dev environment works
Under the hood there are two instances running. One instance (run by `ng serve`) serves only the frontend app - that's the one you are loading in the browser.
The other instance is running the Node backend (default on port 9002). In development mode this instance only serves for API requests processing. 
Whenever there is a REST API request on *localhost:4200/api/&ast;* it gets re-routed to the Node backend which then processes that request. In production mode everything is served by the backend app.

The re-route/proxy path is by default *localhost:4200/api/&ast;*. It can be changed or extended in *proxy.config.json*.

## Production

- For clean production build run:
```
npm run build:all:prod
```

- If you want make a production build and test-run the server afterwards run:
```
npm run run:prod
```

- Build process creates */dist* folder with */client* and */server* sub-folders where both front and backend apps are compiled'. On production server simply run `node dist/server/server.js`.
