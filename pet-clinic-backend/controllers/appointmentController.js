import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import { sendReminder } from '../utils/emailService.js';

/** Create Appointment and send confirmation email */
export const createAppointment = async (req, res) => {
  try {
    const { pet, date, service, price, doctor } = req.body;

    if (!pet || !date || !service || !price || !doctor) {
      return res.status(400).json({ error: '❌ All fields are required' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: '❌ Unauthorized user' });
    }

    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ error: '❌ Invalid date format' });
    }

    const appointment = await Appointment.create({
      user: req.userId,
      pet,
      doctor,
      date: appointmentDate,
      service,
      price
    });

    // ✅ Send confirmation email to the user
    const user = await User.findById(req.userId);
    if (user?.email) {
      const subject = `🐾 Appointment Confirmed for ${pet}`;
      const text = `
Hello ${user.name},

Your appointment has been successfully created:

🐶 Pet: ${pet}
🩺 Doctor: ${doctor}
📅 Date: ${appointmentDate.toLocaleString()}
🧾 Service: ${service}
💰 Price: Rs. ${price}

Thank you for trusting Pet Clinic!

🐾 Pet Clinic Team
      `;

      sendReminder(user.email, subject, text);
    }

    res.status(201).json({
      message: '✅ Appointment created successfully',
      appointment
    });

  } catch (error) {
    console.error('Create appointment error:', error.message);
    res.status(500).json({
      error: '🔥 Server error creating appointment',
      details: error.message
    });
  }
};

/** Get All Appointments */
export const getAppointments = async (req, res) => {
  try {
    const appointments = req.userRole === 'admin'
      ? await Appointment.find().populate('user', 'name email')
      : await Appointment.find({ user: req.userId });

    res.json(appointments);
  } catch (error) {
    console.error('Get all appointments error:', error.message);
    res.status(500).json({ error: '🔥 Server error fetching appointments' });
  }
};

/** Get Appointment by ID */
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = req.userRole === 'admin'
      ? { _id: id }
      : { _id: id, user: req.userId };

    const appointment = await Appointment.findOne(filter).populate('user', 'name email');

    if (!appointment) {
      return res.status(404).json({ error: '❌ Appointment not found or access denied' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Get by ID error:', error.message);
    res.status(500).json({ error: '🔥 Server error fetching appointment' });
  }
};

/** Update Appointment */
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const filter = req.userRole === 'admin'
      ? { _id: id }
      : { _id: id, user: req.userId };

    const appointment = await Appointment.findOneAndUpdate(
      filter,
      update,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: '❌ Appointment not found or access denied' });
    }

    res.json({
      message: '✅ Appointment updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error.message);
    res.status(500).json({
      error: '🔥 Server error updating appointment',
      details: error.message
    });
  }
};

/** Delete Appointment */
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = req.userRole === 'admin'
      ? { _id: id }
      : { _id: id, user: req.userId };

    const appointment = await Appointment.findOneAndDelete(filter);

    if (!appointment) {
      return res.status(404).json({ error: '❌ Appointment not found or access denied' });
    }

    res.json({ message: '✅ Appointment deleted successfully' });
  } catch (error) {
    console.error('Delete appointment error:', error.message);
    res.status(500).json({ error: '🔥 Server error deleting appointment' });
  }
};
