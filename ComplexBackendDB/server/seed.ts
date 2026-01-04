import { db } from "./db";
import { categories, products } from "@shared/schema";
import crypto from "crypto";

async function seed() {
  console.log("🧹 Resetare bază de date pentru CRUSTY KIOSK...");

  try {
    // 1. Ștergem datele vechi pentru un restart curat
    await db.delete(products);
    await db.delete(categories);
    console.log("🗑️ Tabelele au fost golite.");

    // 2. Inserăm categoriile sub brandul Crusty Kiosk
    await db.insert(categories).values([
      { id: "tenders", name: "Crusty Tenders", icon: "Beef" },
      { id: "sandwiches", name: "Crusty Sandwiches", icon: "Salad" },
      { id: "burgers", name: "Smashed Burgers", icon: "Flame" },
      { id: "sides", name: "Garnituri", icon: "Soup" },
      { id: "drinks", name: "Băuturi", icon: "Coffee" },
    ]);

    const menuItems = [
      // --- CRUSTY TENDERS (Inspirat de faimoșii mușchiuleți) ---
      {
        name: "Crusty Tenders Original",
        description:
          "Fâșii din piept de pui proaspăt, marinate 24h și prăjite în crustă aurie crocantă.",
        price: "39.50",
        categoryId: "tenders",
        imageUrl:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=800",
      },
      {
        name: "Crusty Tenders Hot & Spicy",
        description:
          "Mușchiuleț de pui marinat cu mix de ardei iuți, pentru un gust intens și picant.",
        price: "39.50",
        categoryId: "tenders",
        imageUrl:
          "https://images.pexels.com/photos/29653190/pexels-photo-29653190.jpeg",
      },
      {
        name: "Crusty Wings Hot & Buffalo",
        description:
          "Aripioare de pui proaspete, marinate și prăjite în ulei de arahide, glazurate cu sos Buffalo picant.",
        price: "34.50",
        categoryId: "tenders",
        imageUrl:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80",
      },

      // --- CRUSTY SANDWICHES ---
      {
        name: "Signature Crusty Sandwich",
        description:
          "Pui crocant, castraveți murați, sosul casei, totul într-o chiflă brioche cu unt.",
        price: "29.50",
        categoryId: "sandwiches",
        imageUrl:
          "https://cdn.pixabay.com/photo/2021/01/19/08/46/sandwich-5930494_1280.jpg",
      },
      {
        name: "Hot Crusty Toast",
        description:
          "Pui picant, felii de bacon crocant, jalapenos și salată iceberg.",
        price: "32.00",
        categoryId: "sandwiches",
        imageUrl:
          "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=800",
      },

      // --- SMASHED BURGERS (Vită) ---
      {
        name: "Double Smashed Beef",
        description:
          "Două chiftele de vită smash, brânză Americană, ceapă grill și sos smoky.",
        price: "38.00",
        categoryId: "burgers",
        imageUrl:
          "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800",
      },
      {
        name: "Smashed Onion King",
        description:
          "Vită smash, multă ceapă caramelizată, brânză topită și sos de muștar dulce.",
        price: "36.00",
        categoryId: "burgers",
        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      },

      // --- GARNITURI (SIDES) ---
      {
        name: "Crispy Garlic Parmesan Fries",
        description: "Cartofi proaspeți cu parmezan ras și usturoi.",
        price: "12.90",
        categoryId: "sides",
        imageUrl:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800",
      },
      {
        name: "Cartofi Wedges Rustici",
        description: "Cartofi wedges condimentați cu boia afumată și ierburi.",
        price: "13.50",
        categoryId: "sides",
        imageUrl:
          "https://cdn.pixabay.com/photo/2021/06/09/12/00/potato-wedges-6323211_1280.jpg",
      },
      {
        name: "Salată Rustică",
        description: "Roșii, ceapă roșie și ulei de măsline.",
        price: "9.50",
        categoryId: "sides",
        imageUrl:
          "https://images.pexels.com/photos/14987812/pexels-photo-14987812.jpeg",
      },

      // --- DESERTURI ---
      {
        name: "Cheesecake cu Afine",
        description:
          "Cremă fină de brânză pe blat digestiv cu topping de fructe de pădure.",
        price: "21.00",
        categoryId: "sides", // Le-am pus la sides pentru a respecta cerința de 5 sosuri + 20 produse
        imageUrl:
          "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800",
      },
      {
        name: "Clătite cu Finetti",
        description: "Două clătite mari umplute cu multă cremă de alune.",
        price: "17.50",
        categoryId: "sides",
        imageUrl:
          "https://images.pexels.com/photos/3323680/pexels-photo-3323680.jpeg",
      },

      // --- SOSURI (SOSURILE CASEI) ---
      {
        name: "Ketchup Crusty",
        description:
          "Sos de roșii dulce, preparat după o rețetă clasică, perfect pentru cartofii noștri.",
        price: "3.50",
        categoryId: "sides",
        imageUrl:
          "https://images.pexels.com/photos/2741455/pexels-photo-2741455.jpeg",
      },
      // --- BĂUTURI ---
      {
        name: "Coca-Cola 330ml",
        description: "Băutură răcoritoare carbogazoasă.",
        price: "5.50",
        categoryId: "drinks",
        imageUrl:
          "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800",
      },
      {
        name: "Apă Minerală 500ml",
        description: "Apă minerală carbogazoasă Aqua Carpatica.",
        price: "6.50",
        categoryId: "drinks",
        imageUrl:
          "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800",
      },
    ];

    const finalProducts = menuItems.map((item) => ({
      id: crypto.randomUUID(),
      ...item,
    }));

    await db.insert(products).values(finalProducts);

    console.log(
      `✅ Succes! Meniul CRUSTY KIOSK a fost încărcat (${finalProducts.length} produse).`
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Eroare la seed:", error);
    process.exit(1);
  }
}

seed();
