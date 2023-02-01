import {
  isValidJourneyDataPoint,
  parseNewJourneyDataPoint,
} from "../utils/validateJourney";

describe("isValidJourneyDataPoint(csvLine) returns", () => {
  test("false for missing departure date", () => {
    const journeyWithoutDeparture = {
      return: new Date(),
      departureStationId: 10,
      returnStationId: 8,
      coveredDistance: 25,
      duration: 40,
    };
    const result = isValidJourneyDataPoint(journeyWithoutDeparture);
    expect(result).toBe(false);
  });

  test("false for invalid departure and return date", () => {
    const journeyWithInvalidDepartureAndReturn = {
      departure: "01/02/aaa",
      return: "02/02/abc",
      departureStationId: 10,
      returnStationId: 8,
      coveredDistance: 25,
      duration: 40,
    };
    const result = isValidJourneyDataPoint(
      journeyWithInvalidDepartureAndReturn
    );
    expect(result).toBe(false);
  });

  test("false for departure before return", () => {
    const journeyWithInvalidDepartureAndReturn = {
      departure: "02/02/2023",
      return: "01/02/2023",
      departureStationId: 10,
      returnStationId: 8,
      coveredDistance: 25,
      duration: 40,
    };
    const result = isValidJourneyDataPoint(
      journeyWithInvalidDepartureAndReturn
    );
    expect(result).toBe(false);
  });

  test("false for missing departureStationId", () => {
    const journeyWithoutDepartureStationId = {
      departure: "01/01/2023",
      return: "02/01/2023",
      returnStationId: 8,
      coveredDistance: 25,
      duration: 40,
    };
    const result = isValidJourneyDataPoint(journeyWithoutDepartureStationId);
    expect(result).toBe(false);
  });

  test("false for invalid departureStationId", () => {
    const journeyWithInvalidDepartureStationId = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: -1,
      returnStationId: 8,
      coveredDistance: 25,
      duration: 40,
    };
    const result = isValidJourneyDataPoint(
      journeyWithInvalidDepartureStationId
    );
    expect(result).toBe(false);
  });

  test("false for missing returnStationId", () => {
    const journeyWithoutReturnStationId = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: 10,
      coveredDistance: 25,
      duration: 40,
    };
    const result = isValidJourneyDataPoint(journeyWithoutReturnStationId);
    expect(result).toBe(false);
  });

  test("false for invalid returnStationId", () => {
    const journeyWithInvalidReturnStationId = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: 10,
      returnStationId: -4,
      coveredDistance: 25,
      duration: 40,
    };
    const result = isValidJourneyDataPoint(journeyWithInvalidReturnStationId);
    expect(result).toBe(false);
  });

  test("false for invalid distance", () => {
    const journeyWithInvalidDistance = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: 10,
      returnStationId: 4,
      coveredDistance: "as",
      duration: 40,
    };
    const result = isValidJourneyDataPoint(journeyWithInvalidDistance);
    expect(result).toBe(false);
  });

  test("false for invalid distance (less than 10)", () => {
    const journeyWithInvalidDistance = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: 10,
      returnStationId: 4,
      coveredDistance: 9,
      duration: 40,
    };
    const result = isValidJourneyDataPoint(journeyWithInvalidDistance);
    expect(result).toBe(false);
  });

  test("false for invalid duration", () => {
    const journeyWithInvalidDuration = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: 10,
      returnStationId: 4,
      coveredDistance: 11,
      duration: "a",
    };
    const result = isValidJourneyDataPoint(journeyWithInvalidDuration);
    expect(result).toBe(false);
  });

  test("false for invalid duration (less than 10)", () => {
    const journeyWithInvalidDuration = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: 10,
      returnStationId: 4,
      coveredDistance: 11,
      duration: 9,
    };
    const result = isValidJourneyDataPoint(journeyWithInvalidDuration);
    expect(result).toBe(false);
  });

  test("true for valid journey", () => {
    const validJourney = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: 10,
      returnStationId: 4,
      coveredDistance: 11,
      duration: 16,
    };
    const result = isValidJourneyDataPoint(validJourney);
    expect(result).toBe(true);
  });
});

describe("parseNewJourneyDataPoint(csvLine) returns", () => {
  test("object with properties departure, return, departureStationId, returnStationId, coveredDistance, duration when valid input", () => {
    const validJourney = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: 10,
      returnStationId: 4,
      coveredDistance: 11,
      duration: 16,
    };
    const result = parseNewJourneyDataPoint(validJourney);
    expect(result).not.toBeNull();
    expect(result?.departure).toBeDefined();
    expect(result?.return).toBeDefined();
    expect(result?.departureStationId).toBeDefined();
    expect(result?.returnStationId).toBeDefined();
    expect(result?.coveredDistance).toBeDefined();
    expect(result?.duration).toBeDefined();
  });

  test("null for invalid input", () => {
    const invalidJourney = {
      departure: "01/01/2023",
      return: "02/01/2023",
      departureStationId: -1,
      returnStationId: 4,
      coveredDistance: 11,
      duration: 16,
    };
    const result = parseNewJourneyDataPoint(invalidJourney);
    expect(result).toBeNull();
  });
});
