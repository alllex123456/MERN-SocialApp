const express = require('express');
const { check } = require('express-validator');
const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/places-controller');

const router = express.Router();

router.get('/:placeId', getPlaceById);
router.get('/:userId/places', getPlacesByUserId);
router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 15 }).not().isEmpty(),
  ],
  createPlace
);
router.patch(
  '/:placeId',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 15 }).not().isEmpty(),
  ],
  updatePlace
);
router.delete('/:placeId', deletePlace);

module.exports = router;
