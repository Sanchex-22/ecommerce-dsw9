const express        = require('express');
const router         = express.Router();
const ctrl           = require('../controllers/storeAdminController');
const { requireStore } = require('../middleware/authMiddleware');

router.get('/dashboard', requireStore, ctrl.getDashboard);

module.exports = router;
