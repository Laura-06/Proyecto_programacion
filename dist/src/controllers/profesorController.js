"use strict";
// Este archivo maneja las operaciones CRUD para la entidad "Profesor" en la base de datos
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.findById = exports.findAll = exports.create = void 0;
// Importación de la conexión a la base de datos
const db_1 = require("../../db"); // Importa la conexión a la base de datos desde el archivo db.ts
// FUNCIONALIDAD 1: Crear un nuevo profesor en la tabla 'profesores'
// Función para crear un nuevo profesor en la base de datos
const create = (profesor, callback) => {
    // Cadena SQL para insertar un nuevo profesor
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';
    // Ejecuta la consulta SQL para insertar los datos de un nuevo profesor
    db_1.db.query(queryString, [profesor.id_p, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion], // Datos del profesor a insertar
    (err) => {
        if (err) { // Si ocurre un error, lo pasa al callback
            callback(err);
        }
        else {
            // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
            callback(null, {
                statusCode: 201, // Código de estado 201: Creación exitosa
                message: 'Profesor creado exitosamente', // Mensaje de éxito
                data: { id_p: profesor.id_p } // Datos del profesor creado
            });
        }
    });
};
exports.create = create;
// FUNCIONALIDAD 2: Consultar todos los profesores en la base de datos
// Función para obtener todos los profesores
const findAll = (callback) => {
    // Cadena SQL para obtener todos los profesores
    const queryString = 'SELECT * FROM profesores';
    // Ejecuta la consulta SQL para obtener los resultados
    db_1.db.query(queryString, (err, results) => {
        if (err) {
            callback(err); // Si hay un error, lo pasa al callback
            return;
        }
        callback(null, results); // Si la consulta es exitosa, pasa los resultados al callback
    });
};
exports.findAll = findAll;
// FUNCIONALIDAD 3: Consultar un profesor por su ID
// Función para obtener un profesor por su ID
const findById = (id, callback) => {
    // Cadena SQL para obtener un profesor específico por su ID
    const queryString = 'SELECT * FROM profesores WHERE id_p = ?';
    // Ejecuta la consulta SQL para obtener los resultados
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err); // Si hay un error, lo pasa al callback
            return;
        }
        // Verifica si se encontraron resultados
        if (results.length === 0) { // Si no se encuentra el profesor, pasa el error
            callback(new Error('Profesor no encontrado'));
            return;
        }
        callback(null, results[0]); // Si se encuentra el profesor, pasa los resultados al callback
    });
};
exports.findById = findById;
// FUNCIONALIDAD 4: Actualizar los datos de un profesor
// Función para actualizar los datos de un profesor por su ID
const update = (id, profesor, callback) => {
    // Cadena SQL para actualizar los datos de un profesor
    const queryString = 'UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?';
    // Ejecuta la consulta SQL para actualizar los datos del profesor
    db_1.db.query(queryString, [profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.profesion, id], // Datos del profesor a actualizar
    (err, results) => {
        if (err) {
            callback(err); // Si ocurre un error, lo pasa al callback
            return;
        }
        // Verifica si se afectaron filas
        if (results.affectedRows === 0) { // Si no se afectaron filas, significa que el profesor no fue encontrado
            callback(new Error('Profesor no encontrado'));
            return;
        }
        // Si la actualización fue exitosa, pasa el mensaje de éxito al callback
        callback(null, {
            statusCode: 200, // Código de estado 200: Actualización exitosa
            message: 'Profesor actualizado exitosamente', // Mensaje de éxito
        });
    });
};
exports.update = update;
// FUNCIONALIDAD 5: Eliminar un profesor por su ID
// Función para eliminar un profesor por su ID
const deleteById = (id, callback) => {
    // Cadena SQL para eliminar un profesor por su ID
    const queryString = 'DELETE FROM profesores WHERE id_p = ?';
    // Ejecuta la consulta SQL para eliminar el profesor
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err); // Si ocurre un error, lo pasa al callback
            return;
        }
        // Verifica si se afectaron filas
        if (results.affectedRows === 0) { // Si no se afectaron filas, significa que el profesor no fue encontrado
            callback(new Error('Profesor no encontrado'));
            return;
        }
        // Si la eliminación fue exitosa, pasa el mensaje de éxito al callback
        callback(null, {
            statusCode: 200, // Código de estado 200: Eliminación exitosa
            message: 'Profesor eliminado exitosamente', // Mensaje de éxito
        });
    });
};
exports.deleteById = deleteById;
