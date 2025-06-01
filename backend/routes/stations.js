const express = require('express');
const {
  createStation,
  getAllStations,
  updateStation,
  deleteStation
} = require('../controller/station');
const auth = require('../auth');
const router = express.Router();

router.use(auth);  // protect all station routes

router.post('/', createStation);
router.get('/', getAllStations);
router.put('/:id', updateStation);
router.delete('/:id', deleteStation);

module.exports = router;
