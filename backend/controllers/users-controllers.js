const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

exports.getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, '-password');
  } catch (error) {
    return next(new HttpError('Error while trying to find users', 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.signup = async (req, res, next) => {
  const { name, email, password, imageUrl } = req.body;

  const errors = validationResult({ req });
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs', 422));
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError(
        'There was a problem while trying to create a user (check existing user)',
        500
      )
    );
  }

  if (existingUser) {
    return next(new HttpError('User already exists.', 422));
  }

  const newUser = new User({
    name,
    email,
    password,
    imageUrl,
    places: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(
      new HttpError(
        'There was a problem while trying to create a user (save new user). Not all required data could be validated.',
        500
      )
    );
  }

  res.json({ message: newUser });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult({ req });
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs', 422));
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    next(
      new HttpError('There was a problem while trying to find the user', 500)
    );
  }

  if (!existingUser || password !== existingUser.password) {
    return next(
      new HttpError('Incorrect credentials or user does not exist', 401)
    );
  }
  res.json({ message: existingUser.toObject({ getters: true }) });
};
