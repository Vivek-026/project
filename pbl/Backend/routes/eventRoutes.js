const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  sendEventReminders,
  getMyEvents
} = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.get('/', getAllEvents); // Get all events
router.get('/:id', getEventById); // Get event by ID

// Routes requiring authentication
router.post('/', authMiddleware, createEvent); // Create event
router.put('/:id', authMiddleware, updateEvent); // Update event
router.delete('/:id', authMiddleware, deleteEvent); // Delete event
router.get('/leader/myevents', authMiddleware, getMyEvents); // Get events by club leader

// Registration route (can be used by both authenticated and non-authenticated users)
router.post('/:id/register', registerForEvent);

// Admin-only route for sending reminders manually
router.post('/send-reminders', authMiddleware, sendEventReminders);

module.exports = router;