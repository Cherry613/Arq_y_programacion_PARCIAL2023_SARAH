import { Request, Response } from "npm:express@4.18.2";
import  MonumentoModel from "../db/monumentos.ts";
import { getData } from "./getData.ts";

//Obtiene información detallada (id, nombre, descripción, páis, ciudad, etc. ) 
//de un monumento según su id - la climatología y la hora deben ser las del momento de realizar la consulta

const getMonumentosid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monumento = await MonumentoModel.findOne({_id: id}).exec()

    if(!monumento){
        res.status(404).send("not found")
    }
    else{
      const datos = await getData(monumento.codigo_postal);
      res.status(200).send({
        id:monumento._id.toString(),
        name: monumento.name,
        description: monumento.description,
        codigo_postal: monumento.codigo_postal,
      /*  pais: datos.pais,
        ciudad: datos.ciudad,
        continente: datos.continente,
        hora: datos.hora_Actual,
        tiempo: datos.tiempo*/
      })
    }

    //res.status(200).send(monumento);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonumentosid;