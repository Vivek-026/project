const Event = require('../models/Event');
const User = require('../models/User');
const cloudinary = require("../config/cloudinary");
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Create a new event (Club Admins only)
exports.createEvent = async (req, res) => {
   try {
     if (req.user.role !== 'club-admin') {
       return res.status(403).json({ message: 'Only club-admins can create events' });
     }
     console.log("User Data:", req.user);
     
     const { title, description, date, time, location, registrationLimit } = req.body;
 
     // Fetch the club ID from the logged-in user
     const clubId = req.user.club;
     if (!clubId) {
       return res.status(400).json({ message: "Club ID not found for this user" });
     }
 
     if (!req.files || !req.files.image) {
       return res.status(400).json({ message: "No image file uploaded" });
     }
 
     const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
       folder: "events",
       use_filename: true,
       unique_filename: false
     });
 
     const event = new Event({
       title,
       description,
       date,
       time,
       location,
       image: result.secure_url,
       organizer: req.user.id,
       club: clubId, // Use the auto-fetched club ID
       registrationLimit: registrationLimit || 0
     });
 
     await event.save();
     res.status(201).json({ message: "Event created successfully", event });
   } catch (err) {
     res.status(500).json({ message: "Failed to create event", error: err.message });
   }
 }; 

// Get all events
exports.getAllEvents = async (req, res) => {
   try {
     const events = await Event.find().populate('organizer', 'name email').sort({ date: 1 });
     res.json({ events }); // Wrap it in an object
   } catch (err) {
     res.status(500).json({ message: 'Failed to fetch events', error: err.message });
   }
 };
 
// Get a specific event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('registrations.user', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch event', error: err.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
   try {
     if (req.user.role !== "club-admin") {
       return res.status(403).json({ message: "Only club-admin can update events" });
     }
 
     const event = await Event.findById(req.params.id);
     if (!event) {
       return res.status(404).json({ message: "Event not found" });
     }
     if (event.organizer.toString() !== req.user.id) {
       return res.status(403).json({ message: "You can only update events you organized" });
     }
 
     const { title, description, date, time, location, club, registrationLimit, isActive } = req.body;
 
     if (req.files?.image) {
       const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
         folder: "events",
         use_filename: true,
         unique_filename: false,
       });
       event.image = result.secure_url;
     }
 
     // Update only provided fields
     if (title) event.title = title;
     if (description) event.description = description;
     if (date) event.date = date;
     if (time) event.time = time;
     if (location) event.location = location;
     if (club) event.club = club;
     if (registrationLimit !== undefined) event.registrationLimit = registrationLimit;
     if (isActive !== undefined) event.isActive = isActive;
 
     await event.save();
     res.json({ message: "Event updated successfully", event });
   } catch (err) {
     res.status(500).json({ message: "Failed to update event", error: err.message });
   }
 };
 
 // Delete an event
 exports.deleteEvent = async (req, res) => {
   try {
       const event = await Event.findById(req.params.id);
       if (!event) return res.status(404).json({ message: "Event not found" });

       if (event.createdBy.toString() !== req.user.id && req.user.role !== "club-admin") {
           return res.status(403).json({ message: "Not authorized to delete this event" });
       }

       await event.deleteOne();
       res.json({ message: "Event deleted successfully!" });
   } catch (error) {
       res.status(500).json({ message: "Server error", error });
   }
};

 
// Get events created by the logged-in club-admin
exports.getMyEvents = async (req, res) => {
  try {
    if (req.user.role !== 'club-admin') {
      return res.status(403).json({ message: 'Only club-admin can access this endpoint' });
    }

    const events = await Event.find({ organizer: req.user.id })
      .sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your events', error: err.message });
  }
};
