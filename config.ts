const PORT = process.env.PORT || 3001;
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://admin:admin@localhost:5432/database";
const INIT_FROM_CSV = process.env.INIT_FROM_CSV || null;

export { PORT, INIT_FROM_CSV, DATABASE_URL };
