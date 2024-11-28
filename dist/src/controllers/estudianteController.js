"use strict";
// Este archivo maneja las operaciones CRUD para la entidad "Estudiante" en la base de datos
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.findById = exports.findAll = exports.create = void 0;
// Importación de la conexión a la base de datos
const db_1 = require("../../db"); // Importa la conexión a la base de datos desde el archivo db.ts
// Función para crear un nuevo estudiante en la base de datos
const create = (estudiante, callback) => {
    // Cadena SQL para insertar un nuevo estudiante
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';
    // Ejecuta la consulta SQL para insertar el estudiante
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], // Parámetros a insertar
    (err) => {
        if (err) {
            callback(err);
        } // Si hay un error, llama al callback con el error
        // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
        callback(null, {
            statusCode: 201, // Código de estado 201: Creación exitosa
            message: 'Estudiante creado exitosamente', // Mensaje de éxito
            data: {
                cod_e: estudiante.cod_e // Devuelve el código del estudiante creado
            }
        });
    });
};
exports.create = create;
// Función para obtener todos los estudiantes de la base de datos
const findAll = (callback) => {
    // Cadena SQL para seleccionar todos los estudiantes
    const queryString = 'SELECT * FROM estudiantes';
    // Ejecuta la consulta SQL para obtener todos los estudiantes
    db_1.db.query(queryString, (err, results) => {
        if (err) {
            callback(err); // Si hay un error, llama al callback con el error
            return;
        }
        callback(null, results); // Si no hay error, llama al callback con los resultados
    });
};
exports.findAll = findAll;
// Función para encontrar un estudiante por su código
const findById = (id, callback) => {
    // Cadena SQL para seleccionar un estudiante por su código
    const queryString = 'SELECT * FROM estudiantes WHERE cod_e = ?';
    // Ejecuta la consulta SQL para encontrar el estudiante por su código
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err); // Si hay un error, llama al callback con el error
            return;
        }
        // Verifica si el estudiante fue encontrado
        if (results.length === 0) {
            callback(new Error('Estudiante no encontrado')); // Si no se encuentra el estudiante, llama al callback con un error
            return;
        }
        // Si el estudiante es encontrado, llama al callback con los detalles del estudiante
        callback(null, results[0]);
    });
};
exports.findById = findById;
// Función para actualizar los datos de un estudiante en la base de datos
const update = (id, estudiante, callback) => {
    // Cadena SQL para actualizar un estudiante
    const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';
    // Ejecuta la consulta SQL para actualizar el estudiante
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], // Parámetros a actualizar
    (err, results) => {
        if (err) {
            callback(err); // Si hay un error, llama al callback con el error
            return;
        }
        // Verifica si el estudiante fue actualizado
        if (results.affectedRows === 0) {
            callback(new Error('Estudiante no encontrado')); // Si no se actualiza ninguna fila, llama al callback con un error
            return;
        }
        // Si el estudiante fue actualizado, llama al callback con un mensaje de éxito
        callback(null, {
            statusCode: 200, // Código de estado 200: Actualización exitosa
            message: 'Estudiante actualizado exitosamente', // Mensaje de éxito
        });
    });
};
exports.update = update;
// Función para eliminar un estudiante por su código
const deleteById = (id, callback) => {
    // Cadena SQL para eliminar un estudiante por su código
    const queryString = 'DELETE FROM estudiantes WHERE cod_e = ?';
    // Ejecuta la consulta SQL para eliminar el estudiante
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err); // Si hay un error, llama al callback con el error
            return;
        }
        // Verifica si el estudiante fue eliminado
        if (results.affectedRows === 0) {
            callback(new Error('Estudiante no encontrado')); // Si no se elimina ninguna fila, llama al callback con un error
            return;
        }
        // Si el estudiante fue eliminado, llama al callback con un mensaje de éxito
        callback(null, {
            statusCode: 200, // Código de estado 200: Eliminación exitosa
            message: 'Estudiante eliminado exitosamente', // Mensaje de éxito
        });
    });
};
exports.deleteById = deleteById;
