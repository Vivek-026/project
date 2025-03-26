const Event = require('../models/Event');
const User = require('../models/User');
const cloudinary = require("../config/cloudinary");
const nodemailer = require('nodemailer');

// Configure nodemailer (you'll need to add SMTP settings in your .env)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Create a new event (Club leaders only)
exports.createEvent = async (req, res) => {
  try {
    // Check if user is a club leader
    if (req.user.role !== 'club-admin') {
      return res.status(403).json({ message: 'Only  club-admin can create events' });
    }

    const { title, description, date, time, location, club, registrationLimit } = req.body;

    // Upload image to Cloudinary
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    console.log("Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      folder: "events",
      use_filename: true,
      unique_filename: false
    });

    // Create new event
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      image: result.secure_url,
      organizer: req.user.id,
      club,
      registrationLimit: registrationLimit || 0
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Failed to create event", error: err.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'name email')
      .sort({ date: 1 }); // Sort by date ascending
    
    res.json(events);
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

// Update an event (Club leaders only)
exports.updateEvent = async (req, res) => {
  try {
    // Check if user is a club leader
    if (req.user.role !== 'club-admin') {
      return res.status(403).json({ message: 'Only club-admin can update events' });
    }

    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Verify if the user is the organizer of the event
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only update events you organized' });
    }

    const { title, description, date, time, location, club, registrationLimit, isActive } = req.body;
    
    // Update image if a new one is provided
    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        folder: "events",
        use_filename: true,
        unique_filename: false
      });
      event.image = result.secure_url;
    }

    // Update event fields
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (time) event.time = time;
    if (location) event.location = location;
    if (club) event.club = club;
    if (registrationLimit !== undefined) event.registrationLimit = registrationLimit;
    if (isActive !== undefined) event.isActive = isActive;

    await event.save();
    res.json({ message: 'Event updated successfully', event });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event', error: err.message });
  }
};

// Delete an event (Club leaders only)
exports.deleteEvent = async (req, res) => {
  try {
    // Check if user is a club leader
    if (req.user.role !== 'club-admin') {
      return res.status(403).json({ message: 'Only club leaders can delete events' });
    }

    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Verify if the user is the organizer of the event
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete events you organized' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    if (!event.isActive) {
      return res.status(400).json({ message: 'Registration for this event is closed' });
    }

    // Check if registration limit is reached
    if (event.registrationLimit > 0 && event.registrations.length >= event.registrationLimit) {
      return res.status(400).json({ message: 'Registration limit reached for this event' });
    }

    // Check if user is already registered
    const alreadyRegistered = event.registrations.some(reg => 
      (req.user && reg.user && reg.user.toString() === req.user.id) || 
      reg.email === email
    );
    
    if (alreadyRegistered) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    // Add user to registrations
    const registration = {
      name,
      email
    };
    
    if (req.user) {
      registration.user = req.user.id;
    }

    event.registrations.push(registration);
    await event.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Registration Confirmation: ${event.title}`,
      html: `
        <h1>Registration Confirmed</h1>
        <p>Thank you for registering for ${event.title}!</p>
        <p><strong>Event Details:</strong></p>
        <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
        <p>Time: ${event.time}</p>
        <p>Location: ${event.location}</p>
        <p>We look forward to seeing you there!</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register for event', error: err.message });
  }
};

// Send reminders for upcoming events (can be triggered by a scheduled job)
exports.sendEventReminders = async (req, res) => {
  try {
    // Find events happening in the next 24 hours
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const today = new Date();
    
    const upcomingEvents = await Event.find({
      date: { $gte: today, $lte: tomorrow },
      isActive: true
    }).populate('registrations.user');

    if (upcomingEvents.length === 0) {
      return res.json({ message: 'No upcoming events to send reminders for' });
    }

    // Send reminders for each event
    for (const event of upcomingEvents) {
      for (const registration of event.registrations) {
        const email = registration.email || (registration.user && registration.user.email);
        
        if (email) {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Reminder: ${event.title} is tomorrow!`,
            html: `
              <h1>Event Reminder</h1>
              <p>This is a friendly reminder that ${event.title} is happening tomorrow!</p>
              <p><strong>Event Details:</strong></p>
              <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
              <p>Time: ${event.time}</p>
              <p>Location: ${event.location}</p>
              <p>We look forward to seeing you there!</p>
            `
          };

          transporter.sendMail(mailOptions);
        }
      }
    }

    res.json({ message: 'Reminders sent successfully', count: upcomingEvents.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send reminders', error: err.message });
  }
};

// Get events by club leader
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