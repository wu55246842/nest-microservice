
#complete life cycle
HTTP request --> middleware --> guard --> interceptor --> pipeline --> filter --> controller

#How to source code 
create a new database in your mysql,name:nest_wuliangtech
npm run start:dev

#nest-cli.json file config

"collection": "@nestjs/schematics",
  "sourceRoot": "apps/app-gateway/src",
  "monorepo": true,
  "root": "apps/app-gateway",
  "compilerOptions": {
    "webpack": true,
    "tsConfigPath": "apps/app-gateway/tsconfig.app.json",
    "assets": ["**/*.yml","**/*.ttf"],
    "watchAssets": true
  },


The backend requires MySql and Redis environments

This project uses TypeOrm to connect to the MySql database, please configure the database connection in the servers/src/config/dev.yml file before running



#under folder :microservice-architecture> 
#create the new micro-services

nest g app service-a ../apps/modules
nest g app service-b ../apps/modules
nest g app service-c ../apps/modules

#contact me : wuliangtech0118@gmail.com

