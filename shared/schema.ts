import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keeping from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Menu items table
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Price in cents
  image: text("image").notNull(),
  thumbnail: text("thumbnail").notNull(),
  tags: text("tags").array(), // Array of tags like "Vegetarian", "Gluten Free", "Spicy"
  category: text("category").notNull(), // "starters", "mains", "desserts", "drinks"
});

export const insertMenuItemSchema = createInsertSchema(menuItems);

// Special menu items table
export const specialItems = pgTable("special_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Price in cents
  image: text("image").notNull(),
});

export const insertSpecialItemSchema = createInsertSchema(specialItems);

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  image: text("image").notNull(),
  rating: integer("rating").notNull(), // Rating out of 5 (can be 4.5 for half stars)
  comment: text("comment").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials);

// Gallery images table
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages);

// Table bookings table
export const tableBookings = pgTable("table_bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guests: text("guests").notNull(),
  occasion: text("occasion"),
  specialRequests: text("special_requests"),
  createdAt: text("created_at").notNull(),
  notificationSent: boolean("notification_sent").default(false),
});

export const insertTableBookingSchema = createInsertSchema(tableBookings)
  .omit({ id: true, createdAt: true, notificationSent: true });

// Define types from schemas
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

export type SpecialItem = typeof specialItems.$inferSelect;
export type InsertSpecialItem = z.infer<typeof insertSpecialItemSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

export type TableBooking = typeof tableBookings.$inferSelect;
export type InsertTableBooking = z.infer<typeof insertTableBookingSchema>;
