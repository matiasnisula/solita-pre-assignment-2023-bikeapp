import { Dialect, Sequelize } from "sequelize";

const options = {
  host: "localhost",
  port: 5432,
  dialect: "postgres" as Dialect,
};

const sequelize = new Sequelize("database", "admin", "admin", options);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to db");
  } catch (err) {
    console.log("db connection failded:", err);
    process.exit(1);
  }
};

export { connectToDatabase, sequelize };
