const HttpError = require('../models/http-error');
const { uuidv4 } = require('uuid');

const USERS = [
  {
    id: 'u1',
    name: 'Alex',
    email: 'test@test.com',
    password: 'tacataca',
    image: 'images/avatar.jpg',
    places: 3,
  },
];

exports.getAllUsers = (req, res, next) => {
  res.json({ users: USERS });
};

exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const existingUser = USERS.find((user) => user.email === email);

  const errors = validationResult({ req });
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs', 422);
  }

  if (existingUser) {
    throw new HttpError('User already exists.', 422);
  }
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  USERS.push(newUser);
  res.json({ message: 'User created' });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = USERS.find((user) => user.email === email);

  const errors = validationResult({ req });
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs', 422);
  }

  if (!existingUser || password !== existingUser.password) {
    throw new HttpError('Incorrect credentials or user does not exist', 401);
  }
  res.json({ message: 'Logged in' });
};
