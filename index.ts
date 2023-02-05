import express from "express";
import cors from "cors";
import "express-async-errors";
import journeyRouter from "./routes/journey";
import stationRouter from "./routes/station";
import { PORT, INIT_FROM_CSV } from "./config";
import { connectToDatabase } from "./db";
import { initDBfromCsv } from "./utils/initDbData";

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use("/api/stations", stationRouter);
app.use("/api/journeys", journeyRouter);

const start = async (): Promise<void> => {
  await connectToDatabase();
  if (INIT_FROM_CSV) {
    await initDBfromCsv();
  }
  app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
  });
};

start().catch((err) => {
  console.log(err);
  process.exit(1);
});
