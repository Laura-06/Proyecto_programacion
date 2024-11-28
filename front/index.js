// Espera a que el DOM se haya cargado completamente
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario"); // Obtiene el elemento HTML donde se renderizarán los formularios

    // Función para generar un formulario dinámico según la entidad seleccionada
    const generarFormulario = (entidad) => {
        let campos = []; // Array para almacenar los campos que tendrá el formulario
        let formHTML = `<h2>Formulario de ${entidad}</h2><form id="${entidad.toLowerCase()}Form">`; // Inicio del formulario en HTML

        // Define los campos del formulario según la entidad seleccionada
        switch (entidad) {
            case "Estudiantes":
                campos = [
                    { label: "Código", id: "cod_e", type: "text" },
                    { label: "Nombre", id: "nom_e", type: "text" },
                    { label: "Dirección", id: "dir_e", type: "text" },
                    { label: "Teléfono", id: "tel_e", type: "text" },
                    { label: "Fecha de Nacimiento", id: "fech_nac", type: "date" },
                ];
                break;

            case "Profesores":
                campos = [
                    { label: "ID", id: "id_p", type: "text" },
                    { label: "Nombre", id: "nom_p", type: "text" },
                    { label: "Dirección", id: "dir_p", type: "text" },
                    { label: "Teléfono", id: "tel_p", type: "text" },
                    { label: "Profesión", id: "profesion", type: "text" },
                ];
                break;

            case "Asignaturas":
                campos = [
                    { label: "Código", id: "cod_a", type: "text" },
                    { label: "Nombre", id: "nom_a", type: "text" },
                    { label: "Intensidad Horaria", id: "int_h", type: "text" },
                    { label: "Créditos", id: "creditos", type: "text" },
                ];
                break;
        }

        // Genera los campos del formulario en HTML
        campos.forEach((campo) => {
            formHTML += `
                <label for="${campo.id}">${campo.label}:</label>
                <input type="${campo.type}" id="${campo.id}" name="${campo.id}" required>
            `;
        });

        // Agrega el botón para enviar el formulario
        formHTML += `<input type="submit" value="Guardar"></form>`;

        // Agrega un botón para listar las entidades y una sección donde se mostrarán los datos
        formHTML += `
            <button id="listar${entidad}">Listar ${entidad}</button>
            <div id="lista${entidad}" class="lista"></div>
        `;

        formulario.innerHTML = formHTML; // Inserta el formulario en el DOM

        // Evento para enviar los datos del formulario al servidor
        document.getElementById(`${entidad.toLowerCase()}Form`).addEventListener("submit", (e) => {
            e.preventDefault(); // Evita que la página se recargue

            const datos = {}; // Objeto para almacenar los datos ingresados en el formulario
            campos.forEach((campo) => {
                datos[campo.id] = document.getElementById(campo.id).value; // Asigna los valores ingresados al objeto
            });

            // Realiza una solicitud POST al servidor para registrar los datos
            fetch(`http://127.0.0.1:3000/${entidad.toLowerCase()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos), // Envía los datos como JSON
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json(); // Si la solicitud es exitosa, procesa la respuesta
                    } else {
                        throw new Error('Error en la solicitud'); // Si hay un error, lanza una excepción
                    }
                })
                .then(() => {
                    alert('¡Registro exitoso!'); // Muestra un mensaje de éxito
                    document.getElementById(`${entidad.toLowerCase()}Form`).reset(); // Limpia el formulario
                })
                .catch((error) => {
                    console.error('Error:', error); // Muestra el error en la consola
                    alert('Hubo un problema al registrar. Por favor, intenta nuevamente.'); // Muestra un mensaje de error al usuario
                });
        });

        // Evento para listar las entidades desde el servidor
        document.getElementById(`listar${entidad}`).addEventListener("click", () => listarEntidad(entidad));
    };

    // Función para listar las entidades desde el servidor
    const listarEntidad = (entidad) => {
        fetch(`http://127.0.0.1:3000/${entidad.toLowerCase()}`) // Solicita los datos de la entidad
            .then((response) => response.json()) // Convierte la respuesta a JSON
            .then((data) => {
                const lista = document.getElementById(`lista${entidad}`); // Obtiene el contenedor donde se mostrarán los datos
                lista.innerHTML = `
                    <table border="1">
                        <thead>
                            <tr>
                                ${Object.keys(data[0] || {}).map((key) => `<th>${key}</th>`).join("")} <!-- Crea las cabeceras de la tabla -->
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data
                                .map(
                                    (item) => `
                                    <tr>
                                        ${Object.values(item)
                                            .map((value) => `<td>${value}</td>`)
                                            .join("")} <!-- Inserta los valores en las filas de la tabla -->
                                        <td>
                                            <button onclick="editarEntidad('${entidad}', '${item.cod_e || item.id || item.cod_a}')">Editar</button> <!-- Botón para editar -->
                                            <button onclick="eliminarEntidad('${entidad}', '${item.cod_e || item.id || item.cod_a}')">Eliminar</button> <!-- Botón para eliminar -->
                                        </td>
                                    </tr>
                                `
                                )
                                .join("")} <!-- Une todas las filas generadas -->
                        </tbody>
                    </table>
                `;
            })
            .catch((error) => {
                console.error('Error al listar:', error); // Muestra un error si no se puede listar
            });
    };

    // Eventos para generar formularios según la entidad seleccionada
    document.getElementById("btnEstudiantes").addEventListener("click", () => generarFormulario("Estudiantes"));
    document.getElementById("btnProfesores").addEventListener("click", () => generarFormulario("Profesores"));
    document.getElementById("btnAsignaturas").addEventListener("click", () => generarFormulario("Asignaturas"));
});
