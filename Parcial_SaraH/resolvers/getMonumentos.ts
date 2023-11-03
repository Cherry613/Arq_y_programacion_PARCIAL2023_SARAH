import { Request, Response } from "npm:express@4.18.2";
import  MonumentoModel from "../db/monumentos.ts";

//Obtiene una lista de todos los monumentos, indicando (solo) id, nombre y país

const getMonumentos = async (req: Request, res: Response) => {
  try {
    const monumento = await MonumentoModel.find().exec();

    res.status(200).send(monumento);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonumentos;