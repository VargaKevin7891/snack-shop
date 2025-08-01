import bcrypt from 'bcrypt';
import * as db from '../db.js';

export async function loginUser(username, password) {
  const user = db.getUserByUsername(username);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return { id: user.id, username: user.username, role: user.role };
}

export async function registerUser(username, password) {
  const hashed = await bcrypt.hash(password, 10);
  return db.insertUser(username, hashed);
}

export async function updateProfile(id, profileData) {
  return db.updateUserProfile(id, profileData);
}

export async function changePassword(id, currentPassword, newPassword) {
  const user = db.getUserById(id);
  if (!user) {
    throw { statusCode: 404, message: 'User not found' };
  }

  if (!user.password) {
    throw { statusCode: 404, message: 'User password hash missing in database' };
  }

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    throw { statusCode: 401, message: 'Incorrect current password' };
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  return db.updateUserPassword(id, hashed);
}