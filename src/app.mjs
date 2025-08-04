
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import {connectDB} from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
// Rutas para vistas renderizadas con EJS (ej. dashboard)
import viewsRoutes from './routes/viewsRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos enviados por formularios HTML (urlencoded)
app.use(express.urlencoded({ extended: true }));

// Middleware para interpretar _method como el método HTTP real (PUT, DELETE, etc.)
app.use(methodOverride('_method'));

// Conexión a MongoDB
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Configurar express-ejs-layouts
app.use(expressLayouts);
app.set ('layout', 'layouts/main'); //Archivo base de layout

app.use((req, res, next) => {
  res.locals.title = "App de Superhéroes";
  next();
});

// Configuración de rutas
app.use('/', viewsRoutes);
app.use('/api', superHeroRoutes);


// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({mensaje: "Ruta no encontrada"});   
});

// Iniciar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});