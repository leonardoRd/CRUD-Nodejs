import Persona from "../models/personas/persona.model.js";

export const getPersonas = async (req, res) => {
  try {
    const personas = await Persona.find();
    if (!personas) return res.json({ Mensaje: "Sin Personas" });

    res.json(personas);
  } catch (error) {
    console.error("Error al buscar personas", error);
    res.status(500).json({ Mensaje: "Server Error", Detalles: error.message });
  }
};

export const getPersona = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);

    if (!persona) return res.json({ Mensaje: "Persona no encontrada" });

    res.json(persona);
  } catch (error) {
    console.error("Error al obtener persona", error);
    res.status(500).json({ Mensaje: "Error Server", Detalle: error.message });
  }
};

export const createPersona = async (req, res) => {
  const {
    razonSocial = "",
    numeroDocumento = "",
    codigoFiscal = "",
    edad = 0,
    pais = "",
    ciudad = "",
    codigoPostal = "",
    email = "",
    cliente = false,
    proveedor = false,
    telefono = "",
  } = req.body;

  try {
    const newPersona = new Persona({
      razonSocial,
      numeroDocumento,
      codigoFiscal,
      edad,
      pais,
      ciudad,
      codigoPostal,
      email,
      cliente,
      proveedor,
      telefono,
    });

    const personaSaved = await newPersona.save();

    res.json(personaSaved);
  } catch (error) {
    console.error("Error al crear persona", error);
    res.status(500).json({ Mensaje: "Error Server", Detalle: error.message });
  }
};

export const updatePersona = async (req, res) => {
  try {
    const personaActulizada = await Persona.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!personaActulizada)
      return res.json({ Mensaje: "Error al actulizar persona" });

    res.json(personaActulizada);
  } catch (error) {
    console.error("Error al actualizar persona", error);
    res.status(500).json({ Mensaje: "Error Server", Detalle: error.message });
  }
};

export const deletePersona = async (req, res) => {
  try {
    const personaBorrada = await Persona.findByIdAndDelete(req.params.id);

    if (!personaBorrada)
      return res.json({ Mensaje: "Error no se encontró la persona" });

    res.status(200);
  } catch (error) {
    console.error("Error al borrar persona", error);
    res.status(500).json({ Mensaje: "Server Error", Detalle: error.message });
  }
};
