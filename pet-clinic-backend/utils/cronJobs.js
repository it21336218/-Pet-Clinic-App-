import cron from 'node-cron';
import Appointment from '../models/Appointment.js';
import { sendReminder } from './emailService.js';

/**
 * Daily cron job to send appointment reminders
 */
const reminderJob = cron.schedule('0 9 * * *', async () => {
  try {
    console.log('⏰ Running daily reminder check...');
    
    // Calculate time range for tomorrow's appointments
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));

    // Find appointments within time range
    const appointments = await Appointment.find({
      date: { $gte: startOfDay, $lt: endOfDay }
    }).populate('user', 'email name');

    // Send reminders for each appointment
    appointments.forEach(appointment => {
      sendReminder(
        appointment.user.email,
        '🐾 Appointment Reminder',
        `Hi ${appointment.user.name},\n\n` +
        `Your ${appointment.service} appointment for ` +
        `${appointment.pet} is scheduled for:\n` +
        `${appointment.date.toLocaleString()}\n\n` +
        `Total Due: $${appointment.price.toFixed(2)}`
      );
    });

    console.log(`📧 Sent ${appointments.length} reminders`);
  } catch (error) {
    console.error('❌ Reminder job error:', error);
  }
});

export default reminderJob;
