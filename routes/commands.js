import express from 'express';
import * as commands from '../services/commands.js'
const router = express.Router();

/* GET home page. */
router.get('/free', function(req, res, next) {
  res.send(commands.accounts())
});

router.get('/locked', function(req, res, next) {
  res.send(commands.accounts(false))
});

export default router;
