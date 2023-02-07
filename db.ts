import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import { DATABASE_URL } from "./config";

const sequelize = new Sequelize(DATABASE_URL);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.ts",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("connected to db");
  } catch (err) {
    console.log("db connection failded:", err);
    process.exit(1);
  }
};

export { connectToDatabase, sequelize };
