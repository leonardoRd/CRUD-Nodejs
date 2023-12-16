import DatoCodigo from "../models/datoCodigo.model.js";

// Obtener todos los datos codigos
export const getDatoCodigos = async (req, res) => {
  try {
    const datoCodigos = await DatoCodigo.find();
    res.json(datoCodigos);
  } catch (error) {
    res.status(500).json({ mensaje: "No se encontraron datos codigos" });
  }
};

// Obtiene los datos codigos por condicion
export const getDatoCodigo = async (req, res) => {
  const { datoComun, datoCodigo } = req.query;
  try {
    const datoCodigoFind = await DatoCodigo.find({
      datoComun: datoComun,
      datoCodigo: datoCodigo,
    });

    res.json(datoCodigoFind);
  } catch (error) {
    res.status(500).json({ mensaje: "No se encontró el Dato Código" });
  }
};

// crea un nuevo dato codigo
export const createDatoCodigo = async (req, res) => {
  const { datoComun, datoCodigo, valorTexto, valorNumerico, valorBoolean } =
    req.body;
  console.log(req.body);
  try {
    const newDatoCodigo = new DatoCodigo({
      datoComun,
      datoCodigo,
      valorTexto,
      valorNumerico,
      valorBoolean,
    });

    const datoCodigoSaved = await newDatoCodigo.save();
    res.json(datoCodigoSaved);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo crear el Dato Código" });
  }
};

// Borra todos los datos codigos por condicion
export const deleteDatoCodigo = async (req, res) => {
  const { datoComun, datoCodigo } = req.query;
  try {
    const result = await DatoCodigo.deleteMany({
      datoComun: datoComun,
      datoCodigo: datoCodigo,
    });
    res.status(200).json({ mensaje: "Borrado Exitosamente!" });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo borrar el Dato Código" });
  }
};

// Actualiza los datos codigos por condicion
export const uploadDatoCodigo = async (req, res) => {
  const { datoComun, datoCodigo } = req.query;
  try {
    const datoCodigoActualizado = await DatoCodigo.updateMany(
      { datoComun: datoComun, datoCodigo: datoCodigo },
      { $set: req.body },
      { new: true }
    );

    res.json(datoCodigoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo actualizar el Dato Código" });
  }
};
