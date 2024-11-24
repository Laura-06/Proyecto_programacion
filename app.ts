import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as bodyParser from "body-parser"; //se utiliza para parsear las librerías
import cors from 'cors';

import { db } from "./db"; // importa el archivo db.ts

// Rutas importadas
import { estudianteRouter } from './src/routes/estudianteRouter';
import { profesorRouter } from './src/routes/profesorRouter';
import { asignaturaRouter } from './src/routes/asignaturaRouter';
import { imparteRouter } from './src/routes/imparteRouter';
import { inscribeRouter } from './src/routes/inscribeRouter';

const app = express();

// Configuración del entorno
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas principales
app.get("/", (req: Request, res: Response) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});

// Usar las rutas de los diferentes modelos
app.use('/estudiantes', estudianteRouter);
app.use('/profesores', profesorRouter);
app.use('/asignaturas', asignaturaRouter);
app.use('/imparte', imparteRouter);
app.use('/inscribe', inscribeRouter);

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database Connected');
    }
});

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
    res.status(404).send({ error: 'Not found', message: 'URL not found' });
});

// Arrancar el servidor
app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
});

