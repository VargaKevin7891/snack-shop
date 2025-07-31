import Database from 'better-sqlite3';

const db = new Database('./data/database.db', { verbose: console.log });

export function initDb() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT,
      price INTEGER NOT NULL,
      description TEXT,
      category TEXT,
      stock INTEGER NOT NULL,
      discount INTEGER NOT NULL
    )
  `).run();

  const count = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  if (count === 0) {
    const insert = db.prepare('INSERT INTO products (name, price, description, image, category, stock, discount) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const products = [
      ['Choco Delight', 299, 'Rich chocolate snack', '/images/Milka-chocholate.png', 'Sweet Snack' , 5, 0],
      ['Salty Cracker', 1490, 'Crunchy and salty', '/images/cracker.png', 'Salty Snack' , 3, 10],
      ['Apple Chips', 950, 'Dried apple slices', '/images/apple-chips.png', 'Healthy Snack' , 11, 20],
      ['Cheese Bites', 360, 'Mini cheese crackers', '/images/cheese-bites.png', 'Sweet Snack' , 0, 30],
      ['Nut Mix', 3149, 'Mixed nuts in a pouch', '/images/nut-mix.png', 'Healthy Snack' , 123, 40]
    ];
    const insertMany = db.transaction((products) => {
      for (const p of products) insert.run(...p);
    });
    insertMany(products);
  }
}

export function getAllProducts() {
  return db.prepare('SELECT * FROM products').all();
}

export function getFeaturedProducts() {
  return db.prepare('SELECT * FROM products LIMIT 3').all();
}