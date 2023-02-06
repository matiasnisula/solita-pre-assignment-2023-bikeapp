export type StationEntry = {
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
  departureStation: StationEntry;
  returnStation: StationEntry;
  coveredDistance: number;
  duration: number;
};

export type PageInfo = {
  hasNext: boolean;
  hasPrev: boolean;
  pageSize: number;
  lastItemId: number;
  firstItemId: number;
};
