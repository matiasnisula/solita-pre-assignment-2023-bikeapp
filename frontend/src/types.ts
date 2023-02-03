export type Station = {
  id: number;
  name: string;
  address: string;
  city?: string;
  operator?: string;
  capacity?: number;
  x: number;
  y: number;
};

export type JourneyEntry = {
  id: number;
  departureDate?: string;
  returnDate?: string;
  departureStation: Station;
  returnStation: Station;
  coveredDistance: number;
  duration: number;
};
