import { Request, Response } from "npm:express@4.18.2"; 
import  MonumentoModel from "../db/monumentos.ts";

//Crea un nuevo monumento
//Si ya existe ese nombre, en el mismo código postal, en la DDBB devolverá un error 400.
//Si falta alguno de los datos o algún dato es erróneo devolverá un error 500

const addMonumentos = async (req: Request, res: Response) => {
  try {
    const { name, description, codigo_postal, iso } = req.body;
    if (!name || !description || !codigo_postal || !iso) {
      res.status(500).send("Se deben añadir todos los parametros");
      return;
    }
    //comprobacion que sean los tipos que esperamos
    if (typeof name !== "string" || typeof description !== "string" ||typeof codigo_postal !== "number" || typeof iso !== "string") {
        res.status(500).send("Invalid data type");
        return;
    }

    //no añadiremos un monumento que ya exista en la base de datos
    const alreadyExists = await MonumentoModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Ese monumento ya existe");
      return;
    }

    const newMonumento = new MonumentoModel({ name, description, codigo_postal, iso });
    await newMonumento.save();

    res.status(200).send({
      name: newMonumento.name,
      description: newMonumento.description,
      codigo_postal: newMonumento.codigo_postal,
      iso: newMonumento.iso,
      id: newMonumento._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMonumentos;