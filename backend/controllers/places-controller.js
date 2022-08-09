const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=w408-h272-k-no',
    address: '20 W 34th St., New York, NY 10001, Statele Unite ale Americii',
    location: {
      lat: 40.7484445,
      lng: -73.9878531,
    },
    description:
      'Clădire emblematică de birouri în stil Art Deco din 1931, cu exponate și observatoare la etajele 86 și 102.',
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Taj Mahal',
    imageUrl:
      'https://lh5.googleusercontent.com/p/AF1QipPs5ptSYsVyEfwYmykXwQRkF-NZH8W5eMU_smnT=w408-h306-k-no',
    address:
      'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
    location: {
      lat: 27.1751448,
      lng: 78.0399535,
    },
    description:
      'Mausoleu din marmură în stil mogul din sec. XVII, cu minarete, o moschee și grădini de o simetrie renumită.',
    creator: 'u2',
  },
];

exports.getPlaceById = (req, res, next) => {
  const { placeId } = req.params;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);
  if (!place) {
    return next(new HttpError('No place found by that id', 404));
  }

  res.json({ place });
};

exports.getPlacesByUserId = (req, res, next) => {
  const { userId } = req.params;
  const places = DUMMY_users.filter((place) => place.creator === userId);
  if (!places || places.length === 0) {
    return next(new HttpError('No user found by that id', 404));
  }

  res.json({ user });
};

exports.createPlace = (req, res, next) => {
  const { title, imageUrl, location, description, address, creator } = req.body;

  const errors = validationResult({ req });
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs', 422);
  }

  const createdPlace = {
    title,
    imageUrl,
    location,
    description,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(200).json({ message: createdPlace });
};

exports.updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const { placeId } = req.params;

  const errors = validationResult({ req });
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs', 422);
  }

  const updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.id === placeId),
  };
  const updatedPlaceIndex = DUMMY_PLACES.findIndex(
    (place) => place.id === placeId
  );
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[updatedPlaceIndex] = updatedPlace;

  res.status(200).json({ message: updatedPlace });
};

exports.deletePlace = (req, res, next) => {
  const { placeId } = req.params;

  if (!DUMMY_PLACES.find((place) => place.id === placeId)) {
    throw new HttpError('Place not found by that id', 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);
  res.status(200).json({ message: DUMMY_PLACES });
};
