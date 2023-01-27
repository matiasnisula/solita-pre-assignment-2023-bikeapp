import { StationData } from "../types";
import { isString, isNumber } from "./validators";

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

export { isValidStation, parseNewStation };
