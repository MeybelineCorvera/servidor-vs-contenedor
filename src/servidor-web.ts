//// Servidor Estático: siempre entrega el mismo archivo HTML
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Obtenemos la ruta del archivo actual y su carpeta
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Servidor HTTP
const Servidor = http.createServer((req: any, res:any) => {
    //Ruta unica hacia el archivo html
    const archivo= path.join(__dirname, "..", "publico", "saludo.html");
    
    //Lee el archivo del disco de manera asincrona
    fs.readFile(archivo, (error, contenido) => {

        //Si el archivo no existe o no se puede leer se responde con error 404
        if (error) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Archivo no encontrado");
            return;
        }

        //Se ejecuta corretamente solo lee y entrega el HTML que esta guardado
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(contenido);
    })
});

//Se corre el servido enn el puerto 3005
Servidor.listen(3005, () => console.log("Estoy corriendo en http://localhost:3005/"))
