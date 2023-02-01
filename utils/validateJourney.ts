import { JourneyDataPoint } from "../types";
import { isDate, isNumber, isValidId } from "./validators";

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

const departureBeforeReturn = (
  departureDate: string,
  returnDate: string
): boolean => {
  if (Date.parse(departureDate) > Date.parse(returnDate)) {
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidJourneyDataPoint = (object: any): boolean => {
  if (
    !isDate(object.departure) ||
    !isDate(object.return) ||
    !departureBeforeReturn(
      object.departure as string,
      object.return as string
    ) ||
    !isValidId(object.departureStationId) ||
    !isValidId(object.returnStationId) ||
    !isValidDistance(object.coveredDistance) ||
    !isValidDuration(object.duration)
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
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

export { isValidJourneyDataPoint, parseNewJourneyDataPoint };
