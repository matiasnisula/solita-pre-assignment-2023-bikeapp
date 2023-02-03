import Journey from "./journey";
import Station from "./station";

Journey.belongsTo(Station, {
  as: "startStation",
  foreignKey: "departureStationId",
});
Journey.belongsTo(Station, {
  as: "endStation",
  foreignKey: "returnStationId",
});
Station.hasMany(Journey, {
  foreignKey: "departureStationId",
});
Station.hasMany(Journey, {
  foreignKey: "returnStationId",
});

export { Journey, Station };
