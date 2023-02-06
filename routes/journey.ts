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
  let where;

  if (req.query.previousPage === "true") {
    where = {
      id: {
        [Op.lt]: Number(req.query.firstItemId),
      },
    };
  } else {
    where = {
      id: {
        [Op.gt]: Number(req.query.lastItemId),
      },
    };
  }

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
    where,
    order: [["id", req.query.previousPage === "true" ? "DESC" : "ASC"]],
    limit: PAGE_SIZE,
  });

  if (req.query.previousPage) {
    journeys.sort((a: Journey, b: Journey) => {
      return Number(a.getDataValue("id")) - Number(b.getDataValue("id"));
    });
  }

  const pageInfo = {
    hasNext: journeys.length < PAGE_SIZE ? false : true,
    hasPrev: Number(req.query.page) === 0 ? false : true,
    firstItemId: journeys[0].get("id"),
    lastItemId: journeys[journeys.length - 1].get("id"),
    pageSize: PAGE_SIZE,
  };

  return res.json({ journeys, pageInfo });
});

export default journeyRouter;
