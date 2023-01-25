import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

class Journey extends Model {}

Journey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departure: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    departureStationId: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: { model: "stations", key: "id" },
    },
    returnStationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "stations", key: "id" },
    },
    coveredDistance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "journey",
  }
);

export default Journey;
