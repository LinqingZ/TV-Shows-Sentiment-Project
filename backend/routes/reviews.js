const express = require("express");
const z = require("zod");
const prisma = require("../db/index");
const { analyzeSentiment } = require("../utils/ai");
const { authenticateToken } = require("../middleware/auth");
const validateBody = require("../middleware/validate");

const reviewPostSchema = z.object({
  tvShow: z.object({
    id: z.number(),
    title: z.string(),
  }),
  review: z.string(),
});

module.exports = function () {
  const router = express.Router();

  router.post(
    "/",
    authenticateToken,
    validateBody(reviewPostSchema),
    async function (req, res) {
      const { tvShow, review } = req.body;
      try {
        const result = await analyzeSentiment(tvShow.title, review);
        console.log(result)
        if (result.success) {
          console.log("Saving to database")
          const createdReview = await prisma.review.create({
            data: {
              tvShowId: tvShow.id,
              review,
              sentiment: result.sentiment,
              userId: req.user.userId,
            },
          });
          console.log(createdReview)

          if (createdReview) {
            console.log("Created review")
            res.status(201).json({
              success: true,
            });
          } else {
            console.log("Fail to create review")
            res.status(500).json({
              success: false,
            });
          }
        }
      } catch (error) {
        console.log("Error creating review", error)
        res.status(500).json({
          success: false,
        });
      }
    }
  );

  router.get("/:tvShowId", authenticateToken, async function (req, res) {
    const tvShowId = req.params.tvShowId;
    const reviews = await prisma.review.findMany({
      where: {
        tvShowId: parseInt(tvShowId),
      },
      include: {
        userId: false,
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      reviews,
    });
  });
  return router;
};
