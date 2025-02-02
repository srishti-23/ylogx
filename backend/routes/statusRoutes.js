const express = require('express');
const { createStatus, updateStatus, deleteStatus } = require('../controllers/statusController');
const statusRouter = express.Router();

statusRouter.post('/', createStatus);
statusRouter.put('/:id', updateStatus);
statusRouter.delete('/:id', deleteStatus);

module.exports = statusRouter;