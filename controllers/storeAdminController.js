const { Store, Product, Order, OrderItem } = require('../models');

const storeAdminController = {
  getDashboard: async (req, res) => {
    try {
      const store = await Store.findByPk(req.session.storeId);
      const products = await Product.findAll({ where: { store_id: store.id } });
      const orderItems = await OrderItem.findAll({
        where: { store_id: store.id },
        include: [{ model: Order, where: { status: 'paid' }, required: false }]
      });
      const totalSales = orderItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
      res.render('store-admin/dashboard', {
        title: 'Panel de Tienda',
        store,
        products,
        totalSales: totalSales.toFixed(2),
        productCount: products.length
      });
    } catch (err) {
      res.status(500).render('error', { title: 'Error', message: 'Error al cargar el dashboard.' });
    }
  }
};

module.exports = storeAdminController;
