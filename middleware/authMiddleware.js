const requireStore = (req, res, next) => {
  if (!req.session.storeId) return res.redirect('/store/login');
  next();
};

const requireUser = (req, res, next) => {
  if (!req.session.userId) return res.redirect('/user/login');
  next();
};

module.exports = { requireStore, requireUser };
