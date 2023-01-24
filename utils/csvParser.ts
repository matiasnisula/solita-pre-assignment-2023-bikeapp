import csv from "csv-parser";
import fs from "fs";

const parseCSV = (path: string, callback: (data: unknown) => void): void => {
  console.log("parsing csv..");
  fs.createReadStream(path)
    .pipe(
      csv([
        "departure",
        "return",
        "departureStationId",
        "departureStationName",
        "returnStationId",
        "returnStationName",
        "coveredDistance",
        "duration",
      ])
    )
    .on("data", (data) => callback(data))
    .on("end", () => {
      console.log("done parsing..");
    });
};
export default parseCSV;
