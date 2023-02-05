import express from "express";
import { Journey, Station } from "../models";
import { Op } from "sequelize";
import { isInteger } from "../utils/validators";

const journeyRouter = express.Router();

const PAGE_SIZE = 80;

journeyRouter.get("/", async (req, res) => {
  if (!isInteger(req.query.page) || !isInteger(req.query.lastItemId)) {
    return res
      .json({
        error: "Provide query page as integer",
      })
      .status(404);
  }
  const page = req.query.page;
  const lastItemId = req.query.lastItemId;
  const journeys = await Journey.findAll({
    attributes: {
      exclude: ["departureStationId", "returnStationId", "departure", "return"],
    },
    include: [
      {
        model: Station,
        as: "departureStation",
      },
      {
        model: Station,
        as: "returnStation",
      },
    ],
    where: {
      id: {
        [Op.gt]: Number(lastItemId),
      },
    },
    order: [["id", "ASC"]],
    limit: PAGE_SIZE,
  });
  const pageInfo = {
    hasNext: journeys.length < PAGE_SIZE ? false : true,
    hasPrev: Number(page) === 0 ? false : true,
    lastItemId: journeys[journeys.length - 1].get("id"),
    pageSize: PAGE_SIZE,
  };
  return res.json({ journeys, pageInfo });
});

export default journeyRouter;
