import { JourneyDataPoint, StationData } from "../types";

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

const isDate = (date: unknown): boolean => {
  if (!date || !isString(date) || Boolean(Date.parse(date)) === false) {
    return false;
  }
  return true;
};

const isNumber = (number: unknown): boolean => {
  if (!number || isNaN(Number(number))) {
    return false;
  }
  return true;
};

const isValidDistance = (number: unknown): boolean => {
  if (!isNumber(number) || Number(number) < 10) {
    return false;
  }
  return true;
};

const isValidDuration = (duration: unknown): boolean => {
  if (!isNumber(duration) || Number(duration) < 10) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidJourneyDataPoint = (object: any): boolean => {
  if (
    !isDate(object.departure) ||
    !isDate(object.return) ||
    !isNumber(object.departureStationId) ||
    !isNumber(object.returnStationId) ||
    !isValidDistance(object.coveredDistance) ||
    !isValidDuration(object.duration)
  ) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidStation = (object: any): boolean => {
  if (
    !isNumber(object.ID) ||
    !isString(object.name) ||
    !isString(object.osoite) ||
    !isNumber(object.kapasiteetti) ||
    !isNumber(object.x) ||
    !isNumber(object.y)
  ) {
    return false;
  }
  return true;
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewJourneyDataPoint = (object: any): JourneyDataPoint | null => {
  try {
    if (!isValidJourneyDataPoint(object)) {
      return null;
    }
    const newJourneyDataPoint: JourneyDataPoint = {
      departure: object.departure,
      return: object.return,
      departureStationId: Number(object.departureStationId),
      returnStationId: Number(object.returnStationId),
      coveredDistance: Number(object.coveredDistance),
      duration: Number(object.duration),
    };
    return newJourneyDataPoint;
  } catch (error) {
    console.log(error);
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNewStation = (object: any) => {
  try {
    if (!isValidStation(object)) {
      return null;
    }
    const newStation: StationData = {
      id: Number(object.ID),
      name: object.name,
      address: object.osoite,
      city: object.kaupunki,
      operator: object.operaattor,
      capacity: Number(object.kapasiteetti),
      x: Number(object.x),
      y: Number(object.y),
    };
    return newStation;
  } catch (error) {
    console.log(error);
  }
  return null;
};

/* eslint-enable @typescript-eslint/no-unsafe-assignment */

export { parseNewJourneyDataPoint, parseNewStation };
