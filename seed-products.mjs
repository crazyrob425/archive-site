import mysql from "mysql2/promise";
import { rareKnowledgeProducts } from "./catalog-data.js";
import fs from "node:fs";
import path from "node:path";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!process.env[key] || filePath.endsWith(".env.local")) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.resolve(".env"));
loadEnvFile(path.resolve(".env.local"));

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to seed products");
}

const dbUrl = new URL(process.env.DATABASE_URL);
const db = await mysql.createConnection({
  host: dbUrl.hostname,
  port: Number(dbUrl.port || 3306),
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.replace(/^\//, ""),
  ssl: {
    rejectUnauthorized: false,
  },
});

const SQL = `
  INSERT INTO products
    (title, slug, description, category, price, featured, active)
  VALUES
    (?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    description = VALUES(description),
    category = VALUES(category),
    price = VALUES(price),
    featured = VALUES(featured),
    active = VALUES(active)
`;

async function seed() {
  try {
    console.log("Seeding products...");
    for (const product of rareKnowledgeProducts) {
      await db.execute(SQL, [
        product.title,
        product.slug,
        product.description,
        product.category,
        product.price,
        product.featured ? 1 : 0,
        1,
      ]);
      console.log(`✓ Created: ${product.title}`);
    }
    console.log("✓ Seed complete!");
    await db.end();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    try {
      await db.end();
    } catch {
      // ignore shutdown errors
    }
    process.exit(1);
  }
}

seed();
