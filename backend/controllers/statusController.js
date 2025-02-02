const Stage= require('../models/stage')
const Status= require('../models/status')
exports.createStatus = async (req, res) => {
    try {
      const { name, stageId } = req.body;
  
      // Check if the stage exists
      const stage = await Stage.findByPk(stageId);
      if (!stage) return res.status(404).json({ error: 'Stage not found' });
  
      const status = await Status.create({ name, stageId });
      res.status(201).json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.updateStatus = async (req, res) => {
    try {
      const status = await Status.findByPk(req.params.id);
      if (!status) return res.status(404).json({ error: 'Status not found' });
  
      await status.update(req.body);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.deleteStatus = async (req, res) => {
    try {
      const status = await Status.findByPk(req.params.id);
      if (!status) return res.status(404).json({ error: 'Status not found' });
  
      await status.destroy();
      res.json({ message: 'Status deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  