import * as db from '../db.js';

export function placeOrder(orderData) {
  const { user, shippingInfo, cartItems, total } = orderData;
  for (const [product, quantity] of cartItems) {
    const dbProduct = db.getProductStock(product.id);
    if (!dbProduct || dbProduct.stock < quantity) {
      throw new Error('Product "${product.name}" is out of stock or not enough stock available.');
    }
  }

  const orderId = db.insertOrder({
    user_id: user.id || null,
    first_name: shippingInfo.first_name,
    last_name: shippingInfo.last_name,
    email: shippingInfo.email,
    phone: shippingInfo.phone,
    address: shippingInfo.address,
    city: shippingInfo.city,
    zip_code: shippingInfo.zip_code,
    total: total,
  });

for (const [product, quantity] of cartItems) {
  if (quantity > product.stock) {
    throw new Error(`Not enough stock for ${product.name}`);
  }
  db.decreaseProductStock(product.id, quantity);
}

db.insertOrderItems(orderId, cartItems);

  const fullOrder = {
    id: orderId,
    user,
    shippingInfo,
    cartItems,
    total,
  };
  return { success: true, orderId };
}
