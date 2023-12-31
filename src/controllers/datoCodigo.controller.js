import DatoCodigo from "../models/datoCodigo.model.js";

// Obtener todos los datos codigos
export const getDatoCodigos = async (req, res) => {
  const { datoComun, datoCodigo } = req.query;
  let query = {};
  if (datoComun) query.datoComun = datoComun;
  if (datoCodigo) query.datoCodigo = datoCodigo;

  try {
    const datoCodigos = await DatoCodigo.find(query);
    res.json(datoCodigos);
  } catch (error) {
    res.status(500).json({ mensaje: "No se encontraron datos codigos" });
  }
};

export const getDatoCodigoDesc = async (req, res) => {
  const { descrip } = req.query;

  try {
    const datosCodigosDesc = await DatoCodigo.find({
      descripcion: new RegExp(descrip, "i"),
    });

    res.json(datosCodigosDesc);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "No se encontraron los datos solicitados" });
  }
};

// Obtiene los datos codigos por condicion
export const getDatoCodigo = async (req, res) => {
  const { datoComun } = req.query;

  try {
    const datoCodigoFind = await DatoCodigo.find({
      datoComun: datoComun,
    });

    res.json(datoCodigoFind);
  } catch (error) {
    res.status(500).json({ mensaje: "No se encontró el Dato Código" });
  }
};

// crea un nuevo dato codigo
export const createDatoCodigo = async (req, res) => {
  const {
    datoComun,
    datoCodigo,
    valorTexto,
    valorNumerico,
    valorBoolean,
    descripcion,
  } = req.body;

  let bool = false;
  if (valorBoolean) bool = true;

  try {
    const newDatoCodigo = new DatoCodigo({
      datoComun,
      datoCodigo,
      valorTexto,
      valorNumerico,
      valorBoolean: bool,
      descripcion,
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
