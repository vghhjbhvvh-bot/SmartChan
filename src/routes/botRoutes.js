const express = require('express');
const router = express.Router();
const { startBot } = require('../controllers/botController');

router.get('/', (req, res) => {
  startBot();
  res.send('Bot started');
});

module.exports = router;