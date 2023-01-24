import http from "http";
import { connectToDatabase } from "./db";

const port = 3000;

const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

const start = async (): Promise<void> => {
  await connectToDatabase();
  server.listen(port, () => {
    console.log(`Server running at port: ${port}`);
  });
};

start().catch((err) => {
  console.log(err);
  process.exit(1);
});
