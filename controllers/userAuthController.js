const { User } = require('../models');

const userAuthController = {
  getRegister: (req, res) => {
    res.render('user-auth/register', { title: 'Crear Cuenta', error: null });
  },

  postRegister: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const exists = await User.findOne({ where: { email } });
      if (exists) {
        return res.render('user-auth/register', { title: 'Crear Cuenta', error: 'El correo ya está registrado.' });
      }
      const user = await User.create({ name, email, password_hash: password });
      req.session.userId   = user.id;
      req.session.userName = user.name;
      res.redirect('/customer/dashboard');
    } catch (err) {
      res.render('user-auth/register', { title: 'Crear Cuenta', error: 'Error al registrar. Verifica los datos.' });
    }
  },

  getLogin: (req, res) => {
    res.render('user-auth/login', { title: 'Iniciar Sesión', error: null });
  },

  postLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.validatePassword(password))) {
        return res.render('user-auth/login', { title: 'Iniciar Sesión', error: 'Credenciales incorrectas.' });
      }
      req.session.userId   = user.id;
      req.session.userName = user.name;
      res.redirect('/customer/dashboard');
    } catch (err) {
      res.render('user-auth/login', { title: 'Iniciar Sesión', error: 'Error al iniciar sesión.' });
    }
  },

  logout: (req, res) => {
    req.session.userId   = null;
    req.session.userName = null;
    res.redirect('/user/login');
  }
};

module.exports = userAuthController;
