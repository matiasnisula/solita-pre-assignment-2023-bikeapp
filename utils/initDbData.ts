import parseCSV from "./csvParser";
import { Station, Journey } from "../models";
import { parseNewStation, parseNewJourneyDataPoint } from "./validators";
import { StationData, JourneyDataPoint } from "../types";

const colNamesJourney = [
  "departure",
  "return",
  "departureStationId",
  "departureStationName",
  "returnStationId",
  "returnStationName",
  "coveredDistance",
  "duration",
];

const colNamesStation = [
  "FID",
  "ID",
  "nimi",
  "namn",
  "name",
  "osoite",
  "adress",
  "kaupunki",
  "stad",
  "operaattor",
  "kapasiteetti",
  "x",
  "y",
];

const saveStations = async (stations: Array<StationData>) => {
  try {
    const result = await Station.bulkCreate(stations);
    console.log("station.result.length:", result.length);
  } catch (error) {
    console.error(error);
  }
};

const saveJourneys = async (journeys: Array<JourneyDataPoint>) => {
  console.log("journeys.length:", journeys.length);
  const journeysWithValidStationId: Array<JourneyDataPoint> = [];
  try {
    const stations = await Station.findAll({
      attributes: ["id"],
    });
    const stationsId = stations.map((station) => station.toJSON().id as number);

    for (const journey of journeys) {
      let validDepartureStation = false;
      let validReturnStation = false;
      for (const id of stationsId) {
        if (id === journey.departureStationId) {
          validDepartureStation = true;
        }
        if (id === journey.returnStationId) {
          validReturnStation = true;
        }
      }
      if (validDepartureStation && validReturnStation) {
        journeysWithValidStationId.push(journey);
      }
    }
    console.log("validJourneys:", journeysWithValidStationId.length);
    const resultSave = await Journey.bulkCreate(journeysWithValidStationId, {
      validate: false,
    });
    console.log("resultsave.length:", resultSave.length);
  } catch (error) {
    console.error(error);
  }
};

const initDBfromCsv = async () => {
  try {
    const stations = await parseCSV(
      "data/stations.csv",
      colNamesStation,
      parseNewStation
    );
    await saveStations(stations as StationData[]);

    let journeys = await parseCSV(
      "data/2021-05.csv",
      colNamesJourney,
      parseNewJourneyDataPoint
    );
    await saveJourneys(journeys as JourneyDataPoint[]);

    journeys = await parseCSV(
      "data/2021-06.csv",
      colNamesJourney,
      parseNewJourneyDataPoint
    );
    await saveJourneys(journeys as JourneyDataPoint[]);

    journeys = await parseCSV(
      "data/2021-07.csv",
      colNamesJourney,
      parseNewJourneyDataPoint
    );
    await saveJourneys(journeys as JourneyDataPoint[]);
    console.log("db init finished");
  } catch (error) {
    console.error(error);
  }
};

export { initDBfromCsv };
