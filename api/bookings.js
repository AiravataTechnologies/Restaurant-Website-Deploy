import { storage } from './storage.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      // Basic validation
      const { name, phone, date, time, guests } = req.body;
      if (!name || !phone || !date || !time || !guests) {
        return res.status(400).json({ 
          message: "Missing required fields: name, phone, date, time, guests" 
        });
      }
      
      // Create booking in database
      const booking = await storage.createTableBooking(req.body);

      // Send WhatsApp notification to restaurant owner
      try {
        await storage.sendWhatsAppNotification(booking);
        res.status(201).json({ 
          message: "Booking successful! You'll receive a confirmation shortly.",
          success: true,
          booking
        });
      } catch (error) {
        console.error("WhatsApp notification failed:", error);
        // Still return success since booking was created
        res.status(201).json({ 
          message: "Booking successful, but confirmation notification couldn't be sent.",
          success: true,
          booking
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}