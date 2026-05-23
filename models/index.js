const Product   = require('./Products');
const Order     = require('./Order');
const OrderItem = require('./OrderItems');
const Store     = require('./Store');
const User      = require('./User');
const Wishlist  = require('./Wishlist');

// Order ↔ OrderItem
Order.hasMany(OrderItem,    { foreignKey: 'OrderId',    onDelete: 'CASCADE' });
OrderItem.belongsTo(Order,  { foreignKey: 'OrderId' });

// Product ↔ OrderItem
Product.hasMany(OrderItem,    { foreignKey: 'ProductId' });
OrderItem.belongsTo(Product,  { foreignKey: 'ProductId' });

// Store ↔ Product
Store.hasMany(Product,    { foreignKey: 'store_id' });
Product.belongsTo(Store,  { foreignKey: 'store_id' });

// Store ↔ OrderItem
Store.hasMany(OrderItem,    { foreignKey: 'store_id' });
OrderItem.belongsTo(Store,  { foreignKey: 'store_id' });

// User ↔ Order
User.hasMany(Order,    { foreignKey: 'user_id' });
Order.belongsTo(User,  { foreignKey: 'user_id' });

// User ↔ Product (N:M a través de Wishlist)
User.belongsToMany(Product, { through: Wishlist, foreignKey: 'user_id',    otherKey: 'product_id' });
Product.belongsToMany(User, { through: Wishlist, foreignKey: 'product_id', otherKey: 'user_id' });

module.exports = { Product, Order, OrderItem, Store, User, Wishlist };
