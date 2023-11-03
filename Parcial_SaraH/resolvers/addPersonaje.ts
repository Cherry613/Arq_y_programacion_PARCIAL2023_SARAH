//@ts-ignore    -->porq el deno.2 al final da error y el req y el resp es para q no ponga el req y el res en rojo pero no pasa nada xd
import { Request, Response } from "npm:express@4.18.2";
import PersonajeModel from "../db/personajes.ts";
import { RAZAS } from "../types.ts";

/*POST /api/tierramedia/personajes: Crea un nuevo personaje épico.
Si la raza no se encuentra entre las existentes devolverá un error 500.
Si falta alguno de los datos devolverá un error 500*/

const addPersonaje = async (req: Request, res: Response) => {
  try {
    const { name, raza, description, skills } = req.body;
    if (!name || !raza || !description|| !skills) {
      res.status(500).send("Name, raza, description and skills are required");
      return;
    }
    if (raza !== "Hobbits" && raza !== "Humanos" && raza !== "Elfos" && raza !== "Enanos" && raza !== "Ents") {
      res.status(500).send("raza tiene que ser o hobbits, humanos, elfos, enanos o ents ");
      return;
    }

    //con la enum de razas
   /* if(!Object.values(RAZAS).includes(raza)){
      res.status(500).send("Invalid race");
      return;
    }*/

    //hay q comprobar q si tengan los tipos de datos q esperamos
    if (typeof name !== "string" || typeof raza !== "string" || typeof description !== "string" || typeof skills !== "string") {
      res.status(500).send("Invalid data type");
      return;
    }
    
    const exists = await PersonajeModel.findOne({name}).exec();
    if(exists){
      res.status(400).send("Character exists");
      return;
    }
    

    const newPersonaje = new PersonajeModel({ name, raza, description, skills });
    await newPersonaje.save();

    res.status(200).send({
      name: newPersonaje.name,
      raza: newPersonaje.raza,
      description: newPersonaje.description,
      skills: newPersonaje.skills,
      id: newPersonaje._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addPersonaje;