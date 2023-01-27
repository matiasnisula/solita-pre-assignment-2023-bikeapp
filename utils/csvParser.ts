import csv from "csv-parser";
import fs from "fs";

const parseCSV = async (
  path: string,
  columnNames: Array<string>,
  parseDataPoint: (data: unknown) => object | null
) => {
  const resultArr: Array<unknown> = [];
  console.log("reading csv..");
  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv(columnNames))
        .on("data", (data) => {
          const parsedData = parseDataPoint(data);
          if (parsedData) {
            resultArr.push(parsedData);
          }
        })
        .on("end", resolve)
        .on("error", reject);
    });
  } catch (error) {
    console.error(error);
  }
  return resultArr;
};

export default parseCSV;
