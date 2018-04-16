const express = require("express");
const router = express.Router();

const clientController = require('../controllers/client');



router.get('/', clientController.get_all)
router.get('/create', clientController.createClient)
router.get('/delete', clientController.deleteClient)
router.get('/:id', clientController.get)
router.post('/create', clientController.create)
router.post('/delete', clientController.delete)

module.exports = router;