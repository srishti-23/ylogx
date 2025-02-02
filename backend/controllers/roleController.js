const Role = require('../models/role');
const Stage = require('../models/stage');

exports.createRole = async (req, res) => {
  try {
    const { name, stageId, candidates } = req.body;
    const role = await Role.create({ name, stageId, candidates });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    await role.update(req.body);
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    await role.destroy();
    res.json({ message: 'Role deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRolesWithStages = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{ model: Stage, attributes: ['name'] }],
      attributes: ['name', 'candidate'],
    });

    const formattedRoles = roles.reduce((acc, role) => {
      const stageName = role.Stage.name;
      if (!acc[stageName]) acc[stageName] = [];
      acc[stageName].push({ role: role.name, candidates: role.candidates });
      return acc;
    }, {});

    res.json(formattedRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};