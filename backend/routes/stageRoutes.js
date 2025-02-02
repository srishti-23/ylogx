const express = require('express');
const { createStage, updateStage, deleteStage, getStageDetails ,getAllStages} = require('../controllers/stageController');
const stageRouter = express.Router();

stageRouter.post('/create', createStage);
stageRouter.put('/:id', updateStage);
stageRouter.delete('/:id', deleteStage);
stageRouter.get('/:id', getStageDetails);
stageRouter.get('/', getAllStages);

module.exports = stageRouter;