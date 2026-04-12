import { drizzle } from "drizzle-orm/mysql2";
import { products } from "./drizzle/schema.js";
import { rareKnowledgeProducts } from "./catalog-data.js";
import * as dotenv from "dotenv";
dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

async function seed() {
  try {
    console.log("Seeding products...");
    for (const product of rareKnowledgeProducts) {
      await db.insert(products).values(product).onDuplicateKeyUpdate({
        set: product,
      });
      console.log(`✓ Created: ${product.title}`);
    }
    console.log("✓ Seed complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
