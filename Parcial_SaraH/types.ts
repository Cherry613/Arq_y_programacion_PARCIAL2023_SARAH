export enum RAZAS {
    Humanos = "Humanos",
    Elfos = "Elfos",
    Enanos = "Enanos",
    Hobbits = "Hobbits",
    Ents = "Ents",
}

export type Personaje = {
    //id: string;
    name: string;
    raza: string;
    description: string;
    skills: string;
    //raza: RAZAS
  };
