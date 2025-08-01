import bcrypt from 'bcrypt';
import { getUserByUsername, insertUser } from '../db.js';

export async function loginUser(username, password) {
  const user = getUserByUsername(username);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return { id: user.id, username: user.username, role: user.role };
}

export async function registerUser(username, password) {
  const hashed = await bcrypt.hash(password, 10);
  return insertUser(username, hashed);
}