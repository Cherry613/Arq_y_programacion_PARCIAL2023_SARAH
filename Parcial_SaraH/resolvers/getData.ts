type Data = {
    ciudad: string,
    pais: string,
    continente: string,
    hora_Actual: string,
    tiempo: string;
}

export const getData =async (ciudad: string): Promise<Data> => {  
    const BASE_URL = "http://api.weatherapi.com/v1";       
    const API_KEY = "69de3a91bd4a47f8aea92140230610";
    const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${ciudad}&aqi=no`;
    const data = await fetch(url);

    if(data.status !== 200){
        throw new Error("nop");
    }

    const json = await data.json(); //los datos
    return{
        ciudad: json.location.name,
        pais: json.location.country,
        continente: json.location.tz_id,
        hora_Actual: json.location.localtime,
        tiempo: json.current.condition.text,
    } 

}

/*
id (_id de MongoDB)
Nombre
Descripción
Código Postal
Ciudad dónde se encuentra
País donde se encuentra
Continente donde se encuentra.
Hora actual en el lugar donde se encuentra.
Condiciones metereológicas del lugar donde se encuentra.
*/