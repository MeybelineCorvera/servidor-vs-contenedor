//Contenedor Dinámico: la respuesta cambia según la hora del día y el nombre recibido
import * as http from "http";
import { URL } from "url";

const Contenedor = http.createServer((req: any, res: any) => {
    //Convierte la URL de la petición en un objeto URL para poder leer sus parámetros
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
   
    //Solo responde si la ruta pedida es exactamente /hora-saludo
    if (url.pathname === "/hora-saludo") {

        //Toma el parámetro "nombre" de la URL, si no viene usa "visitante"
        const nombre = url.searchParams.get("nombre") ?? "visitante";

        //hora actual del servidor
        const hora = new Date().getHours();
        //Saludo según el rango horario
        const saludo = hora < 12 ? "Buenos dias"
                       : hora < 19 ? "Buenas tardes"
                       : "Buenas noches";
        
        //Se responde con HTML generado dinámicamente (cambia según hora y nombre)
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<h1>${saludo}, ${nombre}!</h1>`);
        return;
    }

    //Si la ruta no coincide con /hora-saludo devuelve error 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("No se encuentra la ruta solicitada");
});

//Se corre el servido enn el puerto 3006
Contenedor.listen(3006,() => console.log(`Servidor escuchando en http://localhost:3006`))