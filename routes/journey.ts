import express from "express";
import { Journey, Station } from "../models";
import { Op } from "sequelize";

const journeyRouter = express.Router();

//?limit=50&after=ID
journeyRouter.get("/", async (req, res) => {
  const limit = req.query.limit;
  const afterId = req.query.after;
  console.log("limit:", limit);
  console.log("afterId:", afterId);
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
        [Op.lt]: 10,
      },
    },
  });

  res.json(journeys);
});

export default journeyRouter;
