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
    coveredDistance: {
      type: DataTypes.INTEGER,
      validate: {
        min: 10,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        min: 10,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "Journey",
  }
);

export default Journey;
