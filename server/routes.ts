import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMenuItemSchema, insertSpecialItemSchema, insertTestimonialSchema, insertGalleryImageSchema, insertTableBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // GET: Special Menu Items
  app.get('/api/special-menu', async (_req, res) => {
    const specialItems = await storage.getSpecialItems();
    res.json(specialItems);
  });

  // GET: Menu Items
  app.get('/api/menu-items', async (_req, res) => {
    const menuItems = await storage.getMenuItems();
    res.json(menuItems);
  });

  // GET: Testimonials
  app.get('/api/testimonials', async (_req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  // GET: Gallery Images
  app.get('/api/gallery', async (_req, res) => {
    const galleryImages = await storage.getGalleryImages();
    res.json(galleryImages);
  });

  // POST: Book a Table
  app.post('/api/bookings', async (req, res) => {
    try {
      const validatedData = insertTableBookingSchema.parse(req.body);
      
      // Create booking in database
      const booking = await storage.createTableBooking(validatedData);

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
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid booking data", 
          errors: error.errors 
        });
      }
      console.error("Booking error:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  return httpServer;
}
