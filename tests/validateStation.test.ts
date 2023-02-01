import { isValidStation, parseNewStation } from "../utils/validateStation";

describe("isValidStation(csvLine) returns", () => {
  test("false for station without id", () => {
    const stationWithoutId = {
      name: "Station",
      osoite: "abc A 13",
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(stationWithoutId);
    expect(result).toBe(false);
  });

  test("false for station with invalid data type id", () => {
    const stationWithInvalidId = {
      ID: "abc",
      name: "Station",
      osoite: "abc A 13",
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(stationWithInvalidId);
    expect(result).toBe(false);
  });

  test("false for station without name", () => {
    const stationWithoutName = {
      ID: 10,
      osoite: "abc A 13",
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(stationWithoutName);
    expect(result).toBe(false);
  });

  test("false for station with invalid data type name", () => {
    const stationWithInvalidName = {
      ID: 10,
      name: 13,
      osoite: "abc A 13",
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(stationWithInvalidName);
    expect(result).toBe(false);
  });

  test("false for station without address", () => {
    const stationWithoutAddress = {
      ID: 10,
      name: "abc",
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(stationWithoutAddress);
    expect(result).toBe(false);
  });

  test("false for station with invalid data type address", () => {
    const stationWithInvalidAddress = {
      ID: 10,
      name: "abc",
      osoite: 14,
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(stationWithInvalidAddress);
    expect(result).toBe(false);
  });

  test("false for station with invalid city data type", () => {
    const stationWithInvalidCity = {
      ID: 10,
      name: "abc",
      osoite: "abc A",
      kaupunki: 10,
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(stationWithInvalidCity);
    expect(result).toBe(false);
  });
  test("false for station with invalid operator data type", () => {
    const stationWithInvalidOperator = {
      ID: 10,
      name: "abc",
      osoite: "abc A",
      kaupunki: "Helsinki",
      operaattor: 4,
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(stationWithInvalidOperator);
    expect(result).toBe(false);
  });

  test("false for station with invalid capacity data type", () => {
    const stationWithWrongCapacity = {
      ID: 10,
      name: "abc",
      osoite: "abc A",
      kapasiteetti: "invalid",
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(stationWithWrongCapacity);
    expect(result).toBe(false);
  });

  test("false for station with invalid x position data type", () => {
    const stationWithWrongPositionX = {
      ID: 10,
      name: "abc",
      osoite: "abc A",
      kapasiteetti: "15",
      x: "invalid",
      y: "10",
    };
    const result = isValidStation(stationWithWrongPositionX);
    expect(result).toBe(false);
  });

  test("false for station with invalid y position data type", () => {
    const stationWithWrongPositionY = {
      ID: 10,
      name: "abc",
      osoite: "abc A",
      kapasiteetti: "15",
      x: "10",
      y: "invalid",
    };
    const result = isValidStation(stationWithWrongPositionY);
    expect(result).toBe(false);
  });

  test("true for station with missing capacity, city and operator", () => {
    const stationWithoutCapacity = {
      ID: 10,
      name: "abc",
      osoite: "abc A",
      x: "10",
      y: "11",
    };
    const result = isValidStation(stationWithoutCapacity);
    expect(result).toBe(true);
  });

  test("true for valid station", () => {
    const validStation = {
      ID: 10,
      name: "abc",
      osoite: "abc A",
      kaupunki: "helsinki",
      operaattor: "aaaa",
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(validStation);
    expect(result).toBe(true);
  });
});
