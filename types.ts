export type JourneyDataPoint = {
  departure: string;
  return: string;
  departureStationId: number;
  returnStationId: number;
  coveredDistance: number;
  duration: number;
};

export type StationData = {
  id: number;
  name: string;
  address: string;
  city: string;
  operator: string;
  capacity: number;
  x: number;
  y: number;
};
