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

/* try {
    // Recoger id de la ruta
    const id = req.params.id;
    // Consultar API
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    if (response.status !== 200) {
      res.status(response.status).send(response.statusText);
      return;
    }

    // Crear objeto Character con datos JSON
    const character: CharacterFromAPI = await response.json();

    const name = character.name; //[Nombre: Rick]
*/