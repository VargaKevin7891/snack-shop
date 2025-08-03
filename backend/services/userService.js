import bcrypt from 'bcrypt';
import * as db from '../db.js';

export async function loginUser(usernameGiven, passwordGiven) {
  const user = db.getUserByUsername(usernameGiven);
  if (!user) return null;

  const valid = await bcrypt.compare(passwordGiven, user.password);
  if (!valid) return null;

  const { password, ...simpleUser} = user;
  return { ...simpleUser };
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