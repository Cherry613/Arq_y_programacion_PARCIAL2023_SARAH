import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getPersonajes from "./resolvers/getPersonajes.ts";
import addPersonaje from "./resolvers/addPersonaje.ts";
import deletePersonaje from "./resolvers/deletePersonaje.ts";
import getPersonajesId from "./resolvers/getPersonajesId.ts";
import updatePersonaje from "./resolvers/updatePersonaje.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

//const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");  //busca en el archivo .end || busca si en el sist. op haya una variable de entorno q se llame asi 
//const PORT = env.PORt || Deno.env.get("MONGO_URL") || 3000;
//esto es lo mio pero ahi todo el mundo ve mi contraseña y usuario
const MONGO_URL = "mongodb+srv://shernandezj1:123@cluster0.jgjnh41.mongodb.net/bd_tierramedia?retryWrites=true&w=majority";

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
  await mongoose.connect(MONGO_URL);
  console.info("Mongo connected")
  const app = express();
  app.use(express.json());
  app
  // prueba de q funcione - aunq no lo copie bn porq da error xd-->.get("/test", (req: Request, res: Response => res.send ("working!")))
  .get("/api/tierramedia/personajes", getPersonajes)
  .get("/api/tierramedia/personajes/:id", getPersonajesId)
  .post("/api/tierramedia/personajes", addPersonaje)
  .put("/api/tierramedia/personajes/:id", updatePersonaje)
  .delete("/api/tierramedia/personajes/:id", deletePersonaje)  

app.listen(3000 /*PORT*/, () => {
  console.log("Server listening on port 3000");
});

}catch(e){
  console.error(e)
}



