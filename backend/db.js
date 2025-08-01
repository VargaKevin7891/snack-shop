import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';

const db = new Database('./data/database.db', { verbose: console.log });

export function initDb() {
  // products
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
  
  // users
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `).run();

  // products base set-up
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

  // users base set-up
  const existing = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (existing.count === 0) {
    const insert = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
    insert.run('admin', bcrypt.hashSync('SnackBoss2025', 10), 'admin');
    insert.run('user', bcrypt.hashSync('user123', 10), 'user');
  }
}

export function getAllProducts() {
  return db.prepare('SELECT * FROM products').all();
}

export function getFeaturedProducts() {
  return db.prepare('SELECT * FROM products LIMIT 3').all();
}

export function getProduct(pid) {
  return db.prepare('SELECT * FROM products WHERE id = ?').get(pid);
}

export function getUserByUsername(username) {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

export function insertUser(username, hashedPassword) {
  if (userExistsByName(username)) {
    const err = new Error('Username already taken');
    err.code = 'USERNAME_TAKEN';
    err.statusCode = 409;
    throw err;
  }

  return db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hashedPassword, 'user');
}

function userExistsByName(username) {
  const stmt = db.prepare('SELECT 1 FROM users WHERE username = ?');
  const result = stmt.get(username);
  return !!result;
}