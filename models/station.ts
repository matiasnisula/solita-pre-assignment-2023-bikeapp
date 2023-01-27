import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

class Station extends Model {}

Station.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.TEXT,
    },
    operator: {
      type: DataTypes.TEXT,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    x: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    y: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "station",
  }
);

export default Station;
