const express = require('express');
const protect = require('../middleware/authMiddleware'); // Using only 'protect'

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents,
  registerForEvent,
  getEventRegistrations
} = require('../controllers/eventController');

const router = express.Router();

router.get("/:eventId/registrations", protect, getEventRegistrations);
router.post('/create', protect, createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.get('/my-events', protect, getMyEvents);
router.post('/:eventId/register', protect, registerForEvent);

module.exports = router;
