"use strict";
// Este archivo maneja las operaciones CRUD para la entidad "Asignatura" en la base de datos
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.findById = exports.findAll = exports.create = void 0;
// Importación de la conexión a la base de datos
const db_1 = require("../../db"); // Importa la conexión a la base de datos desde el archivo db.ts
// Función para crear una nueva asignatura en la base de datos
const create = (asignatura, callback) => {
    // Cadena SQL para insertar una nueva asignatura
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos) VALUES (?, ?, ?, ?)';
    // Ejecuta la consulta SQL para insertar la asignatura
    db_1.db.query(queryString, [asignatura.cod_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos], (err) => {
        if (err) {
            callback(err);
        } // Si hay un error, llama al callback con el error
        // Si la inserción fue exitosa, llama al callback con un mensaje de éxito
        callback(null, {
            statusCode: 201, // Código de estado 201: Creación exitosa
            message: 'Asignatura creada exitosamente', // Mensaje de éxito
            data: { cod_a: asignatura.cod_a } // Devuelve el código de la asignatura creada
        });
    });
};
exports.create = create;
// Función para obtener todas las asignaturas de la base de datos
const findAll = (callback) => {
    // Cadena SQL para seleccionar todas las asignaturas
    const queryString = 'SELECT * FROM asignaturas';
    // Ejecuta la consulta SQL para obtener todas las asignaturas
    db_1.db.query(queryString, (err, results) => {
        if (err) {
            callback(err); // Si hay un error, llama al callback con el error
            return;
        }
        callback(null, results); // Si no hay error, llama al callback con los resultados
    });
};
exports.findAll = findAll;
// Función para encontrar una asignatura por su código
const findById = (id, callback) => {
    // Cadena SQL para seleccionar una asignatura por su código
    const queryString = 'SELECT * FROM asignaturas WHERE cod_a = ?';
    // Ejecuta la consulta SQL para encontrar la asignatura por su código
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err); // Si hay un error, llama al callback con el error
            return;
        }
        // Verifica si la asignatura fue encontrada
        if (results.length === 0) {
            callback(new Error('Asignatura no encontrada')); // Si no se encuentra la asignatura, llama al callback con un error
            return;
        }
        // Si la asignatura es encontrada, llama al callback con los detalles de la asignatura
        callback(null, results[0]);
    });
};
exports.findById = findById;
// Función para actualizar una asignatura en la base de datos
const update = (id, asignatura, callback) => {
    // Cadena SQL para actualizar una asignatura
    const queryString = 'UPDATE asignaturas SET nom_a = ?, int_h = ?, creditos = ? WHERE cod_a = ?';
    // Ejecuta la consulta SQL para actualizar la asignatura
    db_1.db.query(queryString, [asignatura.nom_a, asignatura.int_h, asignatura.creditos, id], (err, results) => {
        if (err) {
            callback(err); // Si hay un error, llama al callback con el error
            return;
        }
        // Verifica si la asignatura fue actualizada
        if (results.affectedRows === 0) {
            callback(new Error('Asignatura no encontrada')); // Si no se actualiza ninguna asignatura, llama al callback con un error
            return;
        }
        // Si la asignatura fue actualizada, llama al callback con un mensaje de éxito
        callback(null, {
            statusCode: 200, // Código de estado 200: Actualización exitosa
            message: 'Asignatura actualizada exitosamente', // Mensaje de éxito
        });
    });
};
exports.update = update;
// Función para eliminar una asignatura por su código
const deleteById = (id, callback) => {
    // Cadena SQL para eliminar una asignatura por su código
    const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';
    // Ejecuta la consulta SQL para eliminar la asignatura
    db_1.db.query(queryString, [id], (err, results) => {
        if (err) {
            callback(err); // Si hay un error, llama al callback con el error
            return;
        }
        // Verifica si la asignatura fue eliminada
        if (results.affectedRows === 0) {
            callback(new Error('Asignatura no encontrada')); // Si no se elimina ninguna asignatura, llama al callback con un error
            return;
        }
        // Si la asignatura fue eliminada, llama al callback con un mensaje de éxito
        callback(null, {
            statusCode: 200, // Código de estado 200: Eliminación exitosa
            message: 'Asignatura eliminada exitosamente', // Mensaje de éxito
        });
    });
};
exports.deleteById = deleteById;
