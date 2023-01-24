export type JourneyDataPoint = {
  departure: string;
  return: string;
  departureStationId: number;
  departureStationName: string;
  returnStationId: number;
  returnStationName: string;
  coveredDistance: number;
  duration: number;
};
