import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import {
  categories,
  products,
  orders,
  orderItems,
  insertOrderSchema,
} from "@shared/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const result = await db.select().from(categories);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching categories: " + error.message });
    }
  });

  // Get all products or filter by category
  app.get("/api/products", async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string | undefined;

      const result = categoryId
        ? await db.select().from(products).where(eq(products.categoryId, categoryId))
        : await db.select().from(products);

      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching products: " + error.message });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const result = await db
        .select()
        .from(products)
        .where(eq(products.id, req.params.id));

      const product = result[0];
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching product: " + error.message });
    }
  });

  // Create new order
app.post("/api/orders", async (req, res) => {
  try {
    // 1. Pregătim datele pentru a ne asigura că numerele sunt numere
    const items = (req.body.items || []).map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      productPrice: String(item.productPrice), // Schema vrea string pt preț de obicei în Drizzle/Postgres numeric
      quantity: Number(item.quantity)          // Cantitatea trebuie să fie număr
    }));

    const details = {
      customerName: req.body.customerName || "Client",
      paymentMethod: req.body.paymentMethod,
      total: String(req.body.total), // Asigură-te că totalul este string dacă în DB e Numeric
      items: items
    };

    // 2. Validăm datele curățate
    const orderData = insertOrderSchema.parse(details);

    const orderId = crypto.randomUUID();
    
    // 3. Obținem numărul comenzii
    const allOrders = await db.select().from(orders);
    const nextOrderNumber = allOrders.length + 1;

    // 4. Inserăm comanda
    const [newOrder] = await db.insert(orders).values({
      id: orderId,
      orderNumber: nextOrderNumber,
      customerName: orderData.customerName,
      paymentMethod: orderData.paymentMethod,
      total: orderData.total,
      status: "pending",
    }).returning();

    // 5. Inserăm produsele din comandă
    await db.insert(orderItems).values(
      items.map((item: any) => ({
        id: crypto.randomUUID(),
        orderId: newOrder.id,
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: item.quantity,
      }))
    );

    res.status(201).json({ 
      message: "Order created", 
      order: newOrder 
    });
    
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log("❌ Erori validare Zod:", error.errors); // Verifică terminalul pentru detalii
      return res.status(400).json({
        message: "Date comandă invalide",
        errors: error.errors,
      });
    }
    console.error("❌ Eroare server:", error);
    res.status(500).json({ message: "Error creating order: " + error.message });
  }
});

  // Get all orders
  app.get("/api/orders", async (_req, res) => {
    try {
      const result = await db.select().from(orders);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching orders: " + error.message });
    }
  });

  // Get single order with items
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const orderResult = await db
        .select()
        .from(orders)
        .where(eq(orders.id, req.params.id));

      const order = orderResult[0];
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const items = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, req.params.id));

      res.json({ order, items });
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching order: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
