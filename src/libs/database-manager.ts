import { DataSource, EntityManager } from "typeorm";

let dataSource: DataSource;

const getDatabaseConnection = async (): Promise<EntityManager> => {
  if (dataSource && dataSource.isInitialized) {
    console.log("connection already available, reusing existing");
    return dataSource.manager;
  } else {
    console.log("connection not available, creating new one");
    dataSource = new DataSource({
      applicationName: "employee-service",
      type: "postgres",
      host: process.env.DBHOSTNAME,
      port: +process.env.DBPORT,
      database: process.env.DBNAME,
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      schema: process.env.DBSCHEMA,
      connectTimeoutMS: 30000,
      synchronize: true,
      logging: false,
      useUTC: true,
      entities: [],
    });
    return await dataSource.initialize().then(() => {
      console.trace("new database connection maded");
      return dataSource.manager;
    });
  }
};
