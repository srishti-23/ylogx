const Stage = require('../models/stage');
const Status = require('../models/status');

exports.createStage = async (req, res) => {
  try {
    const { name, statuses } = req.body;

    // Create the stage
    const stage = await Stage.create({ name });

    console.log("Created Stage:", stage);

    // Ensure statuses is an array
    const statusArray = Array.isArray(statuses) ? statuses : [];

    // Create associated statuses if provided
    if (statusArray.length > 0) {
      const statusRecords = statusArray.map(status => ({
        name: status,
        stageId: stage.id,
      }));

      await Status.bulkCreate(statusRecords);
    }

    res.status(201).json({ stage, statuses: statusArray });

  } catch (error) {
    console.error("Error creating stage:", error);
    res.status(500).json({ error: error.message });
  }
};

// exports.createStage = async (req, res) => {
//     try {
//       const { name, statuses } = req.body;
//       const stage = await Stage.create({ name, statuses });
//       res.status(201).json(stage);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
  exports.updateStage = async (req, res) => {
    try {
      const stage = await Stage.findByPk(req.params.id);
      if (!stage) return res.status(404).json({ error: 'Stage not found' });
      await stage.update(req.body);
      res.json(stage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteStage = async (req, res) => {
    try {
      const stage = await Stage.findByPk(req.params.id);
      if (!stage) return res.status(404).json({ error: 'Stage not found' });
      await stage.destroy();
      res.json({ message: 'Stage deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.getStageDetails = async (req, res) => {
    try {
      const { id } = req.params; // Get stage ID from request params
  
      const stage = await Stage.findByPk(id, {
        include: [{ model: Status, as: "Statuses" }], // ✅ Match alias exactly
      });
  
      if (!stage) {
        return res.status(404).json({ error: "Stage not found" });
      }
  
      res.status(200).json(stage);
    } catch (error) {
      console.error("Error fetching stage details:", error);
      res.status(500).json({ error: error.message });
    }
  };
  exports.getAllStages = async (req, res) => {
    try {
      const stages = await Stage.findAll();
      console.log("Fetched stages:", stages);  // Log the fetched stages
      res.status(200).json(stages);
    } catch (error) {
      console.error("Error fetching stages:", error);  // Log the actual error
      res.status(500).json({ message: "Error fetching stages", error: error.message });
    }
  };