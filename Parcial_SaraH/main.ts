import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getMonumentos from "./resolvers/getMonumentos.ts";
import getMonumentosid from "./resolvers/getMoumentosid.ts";
import addMonumentos from "./resolvers/addMonumentos.ts";
import updateMonumentos from "./resolvers/updateMonumentos.ts";
import deleteMonumentos from "./resolvers/deleteMonumentos.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
const PORT = env.PORT || Deno.env.get("MONGO_URL") || 3000; 

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try {
  await mongoose.connect(MONGO_URL);
} catch (error) {
  console.log(error.message)
}

const app = express();
app.use(express.json());
app
  .get("/api/monumentos", getMonumentos)  //Obtiene una lista de todos los monumentos, indicando (solo) id, nombre y país
  .get("/api/monumentos/:id", getMonumentosid) //Obtiene información detallada (id, nombre, descripción, páis, ciudad, etc. ) de un monumento según su id - la climatología y la hora deben ser las del momento de realizar la consulta
  .post ("/api/monumentos", addMonumentos)  //Crea un nuevo monumento
  .put("/api/monumentos/:id", updateMonumentos) //Actualiza la información de un contacto por su id
  .delete("/api/monumentos/:id", deleteMonumentos)  //Borra un monumento por su id

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});