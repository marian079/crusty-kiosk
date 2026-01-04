import { 
  type Category, 
  type InsertCategory,
  type Product, 
  type InsertProduct,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  
  // Orders
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<{ order: Order; items: OrderItem[] }>;
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
}

export class MemStorage implements IStorage {
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;
  private orderCounter: number;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.orderCounter = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Categories with Lucide icon names
    const categories: Category[] = [
      { id: "burgers", name: "Burgeri", icon: "Beef" },
      { id: "sides", name: "Garnituri", icon: "Salad" },
      { id: "drinks", name: "Băuturi", icon: "Coffee" },
      { id: "desserts", name: "Deserturi", icon: "IceCream2" },
    ];

    categories.forEach(cat => this.categories.set(cat.id, cat));

    // Products - no emoji, just data
    const products: Product[] = [
      // Burgers
      {
        id: "burger-1",
        name: "Cheeseburger Clasic",
        description: "Burger cu carne de vită, brânză cheddar, salată, roșii și sos special",
        price: "24.99",
        categoryId: "burgers",
        imageUrl: null,
      },
      {
        id: "burger-2",
        name: "Double Burger",
        description: "Două carne de vită, brânză dublă, bacon crocant, ceapă caramelizată",
        price: "34.99",
        categoryId: "burgers",
        imageUrl: null,
      },
      {
        id: "burger-3",
        name: "Chicken Burger",
        description: "Piept de pui crocant, salată verde, maioneză cu usturoi",
        price: "22.99",
        categoryId: "burgers",
        imageUrl: null,
      },
      {
        id: "burger-4",
        name: "Veggie Burger",
        description: "Chiftea vegetariană, avocado, rucola, sos chimichurri",
        price: "21.99",
        categoryId: "burgers",
        imageUrl: null,
      },
      {
        id: "burger-5",
        name: "BBQ Bacon Burger",
        description: "Carne de vită, bacon afumat, onion rings, sos BBQ",
        price: "29.99",
        categoryId: "burgers",
        imageUrl: null,
      },
      {
        id: "burger-6",
        name: "Spicy Jalapeño Burger",
        description: "Carne picantă, jalapeños, brânză pepper jack, sos chipotle",
        price: "26.99",
        categoryId: "burgers",
        imageUrl: null,
      },
      
      // Sides
      {
        id: "side-1",
        name: "Cartofi Prăjiți",
        description: "Cartofi prăjiți aurii și crocanți, porție mare",
        price: "9.99",
        categoryId: "sides",
        imageUrl: null,
      },
      {
        id: "side-2",
        name: "Cartofi Wedges",
        description: "Cartofi wedges cu coajă, condimentați cu ierburi",
        price: "11.99",
        categoryId: "sides",
        imageUrl: null,
      },
      {
        id: "side-3",
        name: "Onion Rings",
        description: "Inele de ceapă pane, servite cu sos ranch",
        price: "10.99",
        categoryId: "sides",
        imageUrl: null,
      },
      {
        id: "side-4",
        name: "Chicken Nuggets",
        description: "8 bucăți de nuggets crocante cu sos la alegere",
        price: "14.99",
        categoryId: "sides",
        imageUrl: null,
      },
      {
        id: "side-5",
        name: "Mozzarella Sticks",
        description: "6 stickuri de mozzarella pane cu sos marinara",
        price: "13.99",
        categoryId: "sides",
        imageUrl: null,
      },

      // Drinks
      {
        id: "drink-1",
        name: "Coca-Cola",
        description: "Băutură răcoritoare carbogazoasă, 500ml",
        price: "6.99",
        categoryId: "drinks",
        imageUrl: null,
      },
      {
        id: "drink-2",
        name: "Fanta",
        description: "Băutură răcoritoare cu aromă de portocale, 500ml",
        price: "6.99",
        categoryId: "drinks",
        imageUrl: null,
      },
      {
        id: "drink-3",
        name: "Sprite",
        description: "Limonadă răcoritoare, 500ml",
        price: "6.99",
        categoryId: "drinks",
        imageUrl: null,
      },
      {
        id: "drink-4",
        name: "Apă Minerală",
        description: "Apă minerală plată sau carbogazoasă, 500ml",
        price: "4.99",
        categoryId: "drinks",
        imageUrl: null,
      },
      {
        id: "drink-5",
        name: "Limonadă Naturală",
        description: "Limonadă fresh cu lămâie și mentă, 400ml",
        price: "8.99",
        categoryId: "drinks",
        imageUrl: null,
      },
      {
        id: "drink-6",
        name: "Milkshake Vanilie",
        description: "Milkshake cremos cu aromă de vanilie, 400ml",
        price: "12.99",
        categoryId: "drinks",
        imageUrl: null,
      },
      {
        id: "drink-7",
        name: "Milkshake Ciocolată",
        description: "Milkshake cremos cu ciocolată belgiană, 400ml",
        price: "12.99",
        categoryId: "drinks",
        imageUrl: null,
      },

      // Desserts
      {
        id: "dessert-1",
        name: "Înghețată Sundae",
        description: "Înghețată de vanilie cu topping de ciocolată și frișcă",
        price: "11.99",
        categoryId: "desserts",
        imageUrl: null,
      },
      {
        id: "dessert-2",
        name: "Apple Pie",
        description: "Plăcintă cu mere caldă, servită cu înghețată de vanilie",
        price: "13.99",
        categoryId: "desserts",
        imageUrl: null,
      },
      {
        id: "dessert-3",
        name: "Brownie cu Ciocolată",
        description: "Brownie cald cu ciocolată belgiană și nuci",
        price: "14.99",
        categoryId: "desserts",
        imageUrl: null,
      },
      {
        id: "dessert-4",
        name: "Cookies",
        description: "3 cookies cu bucăți de ciocolată, fresh din cuptor",
        price: "9.99",
        categoryId: "desserts",
        imageUrl: null,
      },
      {
        id: "dessert-5",
        name: "Cheesecake",
        description: "Cheesecake NY style cu topping de fructe de pădure",
        price: "16.99",
        categoryId: "desserts",
        imageUrl: null,
      },
    ];

    products.forEach(prod => this.products.set(prod.id, prod));
  }

  // Categories
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      p => p.categoryId === categoryId
    );
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  // Orders
  async createOrder(
    orderData: InsertOrder, 
    itemsData: InsertOrderItem[]
  ): Promise<{ order: Order; items: OrderItem[] }> {
    const orderId = randomUUID();
    const orderNumber = this.orderCounter++;
    
    const order: Order = {
      id: orderId,
      orderNumber,
      customerName: orderData.customerName || null,
      paymentMethod: orderData.paymentMethod,
      total: orderData.total,
      status: orderData.status || "pending",
      createdAt: new Date(),
    };

    this.orders.set(orderId, order);

    const items: OrderItem[] = itemsData.map(itemData => {
      const itemId = randomUUID();
      const item: OrderItem = {
        id: itemId,
        orderId,
        productId: itemData.productId,
        productName: itemData.productName,
        productPrice: itemData.productPrice,
        quantity: itemData.quantity,
      };
      this.orderItems.set(itemId, item);
      return item;
    });

    return { order, items };
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      item => item.orderId === orderId
    );
  }
}

export const storage = new MemStorage();
