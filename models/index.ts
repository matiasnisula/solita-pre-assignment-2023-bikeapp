import Journey from "./journey";
import Station from "./station";

Journey.belongsTo(Station, {
  as: "departureStation",
  foreignKey: "departureStationId",
});
Journey.belongsTo(Station, {
  as: "returnStation",
  foreignKey: "returnStationId",
});
Station.hasMany(Journey, {
  foreignKey: "departureStationId",
});
Station.hasMany(Journey, {
  foreignKey: "returnStationId",
});

export { Journey, Station };
