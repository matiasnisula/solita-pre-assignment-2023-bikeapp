import express from "express";
import { Station } from "../models";
import { Op } from "sequelize";
import { sequelize } from "../db";
import { isInteger } from "../utils/validators";

const stationRouter = express.Router();

const PAGE_SIZE = 80;

stationRouter.get("/", async (req, res) => {
  if (!isInteger(req.query.page) || !isInteger(req.query.lastItemId)) {
    return res
      .json({
        error: "Provide query page or lastItemId as integer",
      })
      .status(404);
  }
  const lastItemId = req.query.lastItemId;
  const page = req.query.page;
  const stations = await Station.findAll({
    where: {
      id: {
        [Op.gt]: Number(lastItemId),
      },
    },
    order: [["id", "ASC"]],
    limit: PAGE_SIZE,
  });

  const pageInfo = {
    hasNext: stations.length < PAGE_SIZE ? false : true,
    hasPrev: Number(page) === 0 ? false : true,
    lastItemId: stations[stations.length - 1].get("id"),
    pageSize: PAGE_SIZE,
  };
  return res.json({ stations, pageInfo });
});

stationRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!isInteger(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const result = await Station.findOne({
    replacements: [id, id],
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM journeys
            WHERE
              journeys.departure_station_id=?
          )`),
          "totalJourneysStarted",
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM journeys
            WHERE
              journeys.return_station_id=?
          )`),
          "totalJourneysEnded",
        ],
      ],
    },
    where: {
      id: id,
    },
  });

  if (!result) {
    return res.status(404).json({ error: "No station found with given id" });
  }

  return res.json(result);
});

export default stationRouter;
