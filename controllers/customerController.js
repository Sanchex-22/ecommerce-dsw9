const { User, Order, OrderItem, Product } = require('../models');

const customerController = {
  getDashboard: async (req, res) => {
    try {
      const user = await User.findByPk(req.session.userId);
      const orders = await Order.findAll({
        where: { user_id: user.id },
        include: [{ model: OrderItem, include: [Product] }],
        order: [['createdAt', 'DESC']]
      });
      res.render('customer/dashboard', { title: 'Mi Cuenta', user, orders });
    } catch (err) {
      res.status(500).render('error', { title: 'Error', message: 'Error al cargar el dashboard.' });
    }
  }
};

module.exports = customerController;
