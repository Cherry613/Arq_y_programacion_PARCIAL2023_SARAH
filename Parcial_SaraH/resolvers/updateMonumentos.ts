import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/monumentos.ts";

//Actualiza la información de un monumento por su id
//En caso de no existir el monumento con id indicado, devolverá un error 404

const updateMonumentos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, codigo_postal, iso } = req.body;
    if (!name || !description || !codigo_postal || !iso) {
      res.status(500).send("Faltan datos");
      return;
    }

    const updateMonumentos = await MonumentoModel.findOneAndUpdate(
      { _id : id },
      { name, description, codigo_postal, iso  },
      { new: true }
    ).exec();

    if (!updateMonumentos) {
      res.status(404).send("Monumento not found");
      return;
    }

    res.status(200).send({
        name: updateMonumentos.name,
        description: updateMonumentos.description,
        codigo_postal: updateMonumentos.codigo_postal,
        iso: updateMonumentos.iso,
        id: updateMonumentos._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMonumentos;