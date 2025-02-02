const express = require('express');
const { createRole, updateRole, deleteRole, getRolesWithStages } = require('../controllers/roleController');
const roleRouter = express.Router();

roleRouter.post('/', createRole);
roleRouter.put('/:id', updateRole);
roleRouter.delete('/:id', deleteRole);
roleRouter.get('/swimline', getRolesWithStages);

module.exports = roleRouter;