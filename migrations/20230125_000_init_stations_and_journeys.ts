import { DataTypes, QueryInterface } from "sequelize";

export = {
  up: async ({ context }: { context: QueryInterface }) => {
    await context.createTable("stations", {
      id: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      y: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    });
    await context.createTable("journeys", {
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
      covered_distance: {
        type: DataTypes.DOUBLE,
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
    });
    await context.addColumn("journeys", "departure_station_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "stations", key: "id" },
    });
    await context.addColumn("journeys", "return_station_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "stations", key: "id" },
    });
  },
  down: async (context: QueryInterface) => {
    await context.dropTable("stations");
    await context.dropTable("journeys");
  },
};
