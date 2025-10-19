const HttpError = require("../models/http-error");

const uuid = require("uuid").v4;

const DUMMY_PLACES = [
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
const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );
  }

  res.json({ place });
};

const ceratePlace = (req, res, next) => {
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

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.ceratePlace = ceratePlace;
