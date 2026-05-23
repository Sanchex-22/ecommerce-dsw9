const { Store } = require('../models');

const storeAuthController = {
  getRegister: (req, res) => {
    res.render('store-auth/register', { title: 'Registrar Tienda', error: null });
  },

  postRegister: async (req, res) => {
    try {
      const { name, slug, owner_name, email, password, paypal_email } = req.body;
      const exists = await Store.findOne({ where: { email } });
      if (exists) {
        return res.render('store-auth/register', { title: 'Registrar Tienda', error: 'El correo ya está registrado.' });
      }
      const store = await Store.create({ name, slug, owner_name, email, password_hash: password, paypal_email });
      req.session.storeId   = store.id;
      req.session.storeName = store.name;
      res.redirect('/store-admin/dashboard');
    } catch (err) {
      res.render('store-auth/register', { title: 'Registrar Tienda', error: 'Error al registrar. Verifica los datos.' });
    }
  },

  getLogin: (req, res) => {
    res.render('store-auth/login', { title: 'Iniciar Sesión - Tienda', error: null });
  },

  postLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const store = await Store.findOne({ where: { email } });
      if (!store || !(await store.validatePassword(password))) {
        return res.render('store-auth/login', { title: 'Iniciar Sesión - Tienda', error: 'Credenciales incorrectas.' });
      }
      req.session.storeId   = store.id;
      req.session.storeName = store.name;
      res.redirect('/store-admin/dashboard');
    } catch (err) {
      res.render('store-auth/login', { title: 'Iniciar Sesión - Tienda', error: 'Error al iniciar sesión.' });
    }
  },

  logout: (req, res) => {
    req.session.storeId   = null;
    req.session.storeName = null;
    res.redirect('/store/login');
  }
};

module.exports = storeAuthController;
