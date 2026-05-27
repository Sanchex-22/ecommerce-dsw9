const Product   = require('./Products');
const Order     = require('./Order');
const OrderItem = require('./OrderItems');
const Store     = require('./Store');
const User      = require('./User');
const Wishlist  = require('./Wishlist');

// Order ↔ OrderItem
Order.hasMany(OrderItem,   { foreignKey: 'OrderId', as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'OrderId', as: 'order' });

// Product ↔ OrderItem
Product.hasMany(OrderItem,    { foreignKey: 'ProductId', as: 'orderItems' });
OrderItem.belongsTo(Product,  { foreignKey: 'ProductId', as: 'product' });

// Store ↔ Product
Store.hasMany(Product,   { foreignKey: 'store_id', as: 'products' });
Product.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });

// Store ↔ OrderItem
Store.hasMany(OrderItem,    { foreignKey: 'store_id', as: 'orderItems' });
OrderItem.belongsTo(Store,  { foreignKey: 'store_id', as: 'store' });

// User ↔ Order
User.hasMany(Order,    { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User,  { foreignKey: 'user_id', as: 'user' });

// Wishlist ↔ User y Product
Wishlist.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Wishlist.belongsTo(User,    { foreignKey: 'user_id',    as: 'user' });
User.hasMany(Wishlist,      { foreignKey: 'user_id',    as: 'wishlist' });
Product.hasMany(Wishlist,   { foreignKey: 'product_id', as: 'wishlist' });

module.exports = { Product, Order, OrderItem, Store, User, Wishlist };
