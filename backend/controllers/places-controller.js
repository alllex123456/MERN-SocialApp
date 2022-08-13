const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');

exports.getPlaceById = async (req, res, next) => {
  const { placeId } = req.params;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError('Something went wrong while trying to find a place', 500)
    );
  }

  if (!place) {
    return next(new HttpError('No place found by that id', 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
};

exports.getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    return next(new HttpError('No places found by that user id', 404));
  }

  res.json({ places });
};

exports.createPlace = async (req, res, next) => {
  const { title, imageUrl, location, description, address, creator } = req.body;

  const errors = validationResult({ req });
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs', 422));
  }

  const createdPlace = new Place({
    title,
    imageUrl,
    location,
    description,
    address,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(
      new HttpError(
        'Could not find a user due to database connection problem',
        401
      )
    );
  }

  if (!user) {
    return next(new HttpError('Could not find a user by this creator id', 401));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    user.places.push(createdPlace);
    await user.save({ session });
    session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError('Could not create the place, please try again', 500)
    );
  }

  res.status(200).json({ message: createdPlace });
};

exports.updatePlace = async (req, res, next) => {
  const { title, description } = req.body;
  const { placeId } = req.params;

  const errors = validationResult({ req });
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs', 422));
  }

  let updatedPlace;

  try {
    updatedPlace = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError(
        'There was a problem while trying to find the place, please retry',
        500
      )
    );
  }

  updatedPlace.title = title;
  updatedPlace.description = description;

  try {
    await updatedPlace.save();
  } catch (error) {
    return next(
      new HttpError(
        'There was a problem while trying to update, please retry',
        500
      )
    );
  }

  res.status(200).json({ message: updatedPlace.toObject({ getters: true }) });
};

exports.deletePlace = async (req, res, next) => {
  const { placeId } = req.params;

  let deletedPlace;

  try {
    deletedPlace = await Place.findById(placeId).populate('creator');
  } catch (error) {
    return next(
      new HttpError(
        'There was a problem while trying to find a place, please retry',
        500
      )
    );
  }

  if (!deletedPlace) {
    return next(new HttpError('No place found by that id', 401));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await deletedPlace.remove({ session });
    deletedPlace.creator.places.pull(deletedPlace);
    await deletedPlace.creator.save({ session });
    session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError(
        'There was a problem while trying to delete, please retry',
        500
      )
    );
  }

  res.status(200).json({
    message: { place: deletedPlace.toObject({ getters: true }).title },
  });
};
