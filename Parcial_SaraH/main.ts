import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getProducts from "./resolvers/getProducts.ts";
import addProducts from "./resolvers/addProducts.ts";
import deleteProduct from "./resolvers/deleteProduct.ts";

import getClients from "./resolvers/getClients.ts";
import addClients from "./resolvers/addClients.ts";
import deleteClient from "./resolvers/deleteClients.ts";

import getInvoice from "./resolvers/getInvoice.ts";
import addInvoice from "./resolvers/addInvoice.ts";

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
  .post("/products", addProducts)
  .get("/products", getProducts)
  .delete("/deleteProduct/:id", deleteProduct)
  .post ("/clients", addClients)
  .get("/clients", getClients)
  .delete("/deleteClient/:id", deleteClient)
  .post("/invoice", addInvoice)
  .get("/invoice/:id", getInvoice)

app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});