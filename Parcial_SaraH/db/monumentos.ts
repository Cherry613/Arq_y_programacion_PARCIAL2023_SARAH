import mongoose from "npm:mongoose@7.6.3";
import { Monumento } from "../types.ts";

const Schema = mongoose.Schema;

const monumentoSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    codigo_postal: { type: String, required: true },
    iso: { type: String, required: true}
  },
  { timestamps: true }
);

export type MonumentoModelType = mongoose.Document & Omit<Monumento, "id">;

export default mongoose.model<MonumentoModelType>("Monumento", monumentoSchema);