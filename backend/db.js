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
      role TEXT NOT NULL,
      first_name TEXT,
      last_name TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      address TEXT,
      city TEXT,
      zip_code TEXT
    )
  `).run();

  // orders
  db.prepare(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      phone TEXT,
      address TEXT,
      city TEXT,
      zip_code TEXT,
      total INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `).run();

  // order-items
  db.prepare(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product_id INTEGER,
      name TEXT,
      image TEXT,
      quantity INTEGER,
      price INTEGER,
      discount INTEGER,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
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
    const insert = db.prepare(`
      INSERT INTO users (
        username, password, role,
        first_name, last_name, email, phone, address, city, zip_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      'admin',
      bcrypt.hashSync('SnackBoss2025', 10),
      'admin',
      'Admin',
      'User',
      'admin@example.com',
      '+36 70 1234657',
      '100 Admin St.',
      'AdminCity',
      '1234'
    );

    insert.run(
      'user',
      bcrypt.hashSync('user123', 10),
      'user',
      'John',
      'Doe',
      'john.doe@example.com',
      '+36 20 1234567',
      '123 Main Street',
      'User City',
      '4321'
    );
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

export function getProductStock(productId) {
  return db.prepare('SELECT stock FROM products WHERE id = ?').get(productId);
}

export function decreaseProductStock(productId, quantity) {
  return db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(quantity, productId);
}

export function getUserByUsername(username) {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

export function getUserById(id) {
  const query = db.prepare(`SELECT * FROM users WHERE id = ?`);
  return query.get(id);
}

export function updateUserProfile(id, profileData) {
  const query = db.prepare(`
    UPDATE users SET 
      first_name = ?, 
      last_name = ?, 
      email = ?, 
      phone = ?, 
      address = ?, 
      city = ?, 
      zip_code = ?
    WHERE id = ?
  `);
  return query.run(
    profileData.firstName,
    profileData.lastName,
    profileData.email,
    profileData.phone,
    profileData.address,
    profileData.city,
    profileData.zipCode,
    id
  );
}

export function updateUserPassword(id, hashedPassword) {
  const query = db.prepare(`UPDATE users SET password = ? WHERE id = ?`);
  return query.run(hashedPassword, id);
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

export function insertOrder(order) {
  return db.prepare(`
    INSERT INTO orders (
    user_id, first_name, last_name, email, phone, address, city, zip_code, total) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
      order.user_id,
      order.first_name,
      order.last_name,
      order.email,
      order.phone,
      order.address,
      order.city,
      order.zip_code,
      order.total
  );
}

export function insertOrderItems(orderId, items) {
  const stmt = db.prepare(`
    INSERT INTO order_items (order_id, product_id, name, image, quantity, price, discount)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((items) => {
    for (const [product, quantity] of items) {
      stmt.run(
        orderId.lastInsertRowid,
        product.id,
        product.name,
        product.image || '',
        quantity,
        product.price,
        product.discount ?? 0 
      );
    }
  });

  insertMany(items);
}



function userExistsByName(username) {
  const query = db.prepare('SELECT 1 FROM users WHERE username = ?');
  const result = query.get(username);
  return !!result;
}