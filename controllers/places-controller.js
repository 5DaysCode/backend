const HttpError = require("../models/http-error");

const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrappers in the world!",
    // keep as-is except swap the imageUrl to a direct URL:
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/54dcfcd7e4b0bdd45b3e2738/1734380078282-RDXO3QENDJXVFR1N9JS2/unsplash-image-z7NPKKXzY20.jpg",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lat: 40.7484445,
      lng: -73.9882393,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Erwin State Building",
    description: "One of the most famous sky scrappers in the world!",
    // keep as-is except swap the imageUrl to a direct URL:
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/54dcfcd7e4b0bdd45b3e2738/1734380078282-RDXO3QENDJXVFR1N9JS2/unsplash-image-z7NPKKXzY20.jpg",
    location: {
      lat: 40.7484445,
      lng: -73.9882393,
    },
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const place = DUMMY_PLACES.find((p) => p.id === req.params.pid);
  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }
  res.json({ place });
};

const getPlacseByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find  places for the provided user id", 404)
    );
  }

  res.json({ places });
};

const ceratePlace = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passes , please check your data.", 422);
  }

  const { title, description, coordinates, address, creator } = req.body;
  const ceratedPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(ceratedPlace); //unshift()
  res.status(201).json({ place: ceratedPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  const updatedPlace = { ...DUMMY_PLACES[placeIndex] };
  if (title !== undefined) updatedPlace.title = title;
  if (description !== undefined) updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacseByUserId = getPlacseByUserId;
exports.ceratePlace = ceratePlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
