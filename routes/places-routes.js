const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const placesControllers = require("../controllers/places-controller");

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacseByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("desscription").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.ceratePlace
);

router.patch("/:pid", placesControllers.updatePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
