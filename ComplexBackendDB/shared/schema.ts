import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories table
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(), // Lucide icon name
});

// Category relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const insertCategorySchema = createInsertSchema(categories);
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Products table
export const products = pgTable("products", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  categoryId: varchar("category_id")
    .notNull()
    .references(() => categories.id),
  imageUrl: text("image_url"), // Optional image URL
});

// Product relations
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
}));

export const insertProductSchema = createInsertSchema(products);
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Orders table
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey(),
  orderNumber: integer("order_number").notNull().unique(),
  customerName: text("customer_name"),
  paymentMethod: text("payment_method").notNull(), // 'cash' or 'card'
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'preparing', 'ready', 'completed'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Order relations
export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

// Definim schema pentru un item din comandă
const orderItemInputSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  productPrice: z.string(), // Deoarece decimal vine ca string din frontend
  quantity: z.number().min(1),
});

// Schema completă pentru comandă
export const insertOrderSchema = z.object({
  // Nu punem ID aici pentru că îl generăm în server/routes.ts cu crypto.randomUUID()
  customerName: z.string().nullable().optional(),
  paymentMethod: z.string().min(1, "Selectați metoda de plată"),
  total: z.string(),
  items: z.array(orderItemInputSchema).min(1, "Comanda trebuie să conțină cel puțin un produs"),
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order items table
export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey(),
  orderId: varchar("order_id")
    .notNull()
    .references(() => orders.id),
  productId: varchar("product_id")
    .notNull()
    .references(() => products.id),
  productName: text("product_name").notNull(),
  productPrice: decimal("product_price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
});

// Order item relations
export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Cart item interface for frontend
export interface CartItem {
  product: Product;
  quantity: number;
}
