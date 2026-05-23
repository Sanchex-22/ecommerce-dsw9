const express         = require('express');
const router          = express.Router();
const ctrl            = require('../controllers/customerController');
const { requireUser } = require('../middleware/authMiddleware');

router.get('/dashboard', requireUser, ctrl.getDashboard);

module.exports = router;
