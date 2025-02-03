const express = require('express');
const { createStatus, updateStatus, deleteStatus, getStatusById, getAllStatuses } = require('../controllers/statusController');
const statusRouter = express.Router();

statusRouter.post('/', createStatus);
statusRouter.put('/:id', updateStatus);
statusRouter.delete('/:id', deleteStatus);
statusRouter.get('/:id', getStatusById);
statusRouter.get('/', getAllStatuses);

module.exports = statusRouter;