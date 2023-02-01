import { isValidStation } from "../utils/validateStation";

describe("isValidStation() returns", () => {
  test("false for station without id", () => {
    const invalidStation = {
      name: "Station",
      osoite: "abc A 13",
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(invalidStation);
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
  test("true for valid station", () => {
    const validStation = {
      ID: 10,
      name: "abc",
      osoite: "abc A",
      kapasiteetti: 10,
      x: "10.2",
      y: "12.3",
    };
    const result = isValidStation(validStation);
    expect(result).toBe(true);
  });
});
