const { crearRol } = require('../services/rol.service');


async function crearRolController(req, res) {
  try {
    const { id, nombre } = req.body;
    if (!id || !nombre) {
      return res.status(400).json({ error: 'Faltan campos id o nombre' });
    }

    const rolCreado = await crearRol({ id, nombre });
    res.status(201).json(rolCreado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol', details: error.message });
  }
}

module.exports = { crearRolController };
