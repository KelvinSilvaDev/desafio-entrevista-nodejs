const { DataSource } = require("typeorm")

module.exports = {
  "type": "mysql",
  "host": "0.0.0.0",
  "port": 3306,
  "username": "root",
  "password": "password",
  "database": "nestjs_parking_lot",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "migrations": ["dist/database/migrations/*.js"],
  "autoLoadEntities": true,
  "synchronize": false,
}

// const config = new DataSource()

// config.runMigrations = true
// config.type = "mysql"
// config.host = "localhost"
// config.port = 3306
// config.username = "root"
// config.password = "password"
// config.database = "nestjs_parking_lot"
// config.entities = ["dist/**/*.entity{.ts,.js}"]
// config.migrations = ["dist/database/migrations/*.js"]
// config.autoLoadEntities = true
// config.synchronize = false
// config.datasource = "default"


// module.exports = config