document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");

    const generarFormulario = (entidad) => {
        let campos = [];
        let formHTML = `<h2>Formulario de ${entidad}</h2><form id="${entidad.toLowerCase()}Form">`;

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

        campos.forEach((campo) => {
            formHTML += `
                <label for="${campo.id}">${campo.label}:</label>
                <input type="${campo.type}" id="${campo.id}" name="${campo.id}" required>
            `;
        });

        formHTML += `<input type="submit" value="Guardar"></form>`;
        formHTML += `
            <button id="listar${entidad}">Listar ${entidad}</button>
            <div id="lista${entidad}" class="lista"></div>
        `;
        formulario.innerHTML = formHTML;

        document.getElementById(`${entidad.toLowerCase()}Form`).addEventListener("submit", (e) => {
            e.preventDefault();

            const datos = {};
            campos.forEach((campo) => {
                datos[campo.id] = document.getElementById(campo.id).value;
            });

            fetch(`http://127.0.0.1:3000/${entidad.toLowerCase()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error en la solicitud');
                    }
                })
                .then(() => {
                    alert('¡Registro exitoso!');
                    document.getElementById(`${entidad.toLowerCase()}Form`).reset();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Hubo un problema al registrar. Por favor, intenta nuevamente.');
                });
        });

        document.getElementById(`listar${entidad}`).addEventListener("click", () => listarEntidad(entidad));
    };

    const listarEntidad = (entidad) => {
        fetch(`http://127.0.0.1:3000/${entidad.toLowerCase()}`)
            .then((response) => response.json())
            .then((data) => {
                const lista = document.getElementById(`lista${entidad}`);
                lista.innerHTML = `
                    <table border="1">
                        <thead>
                            <tr>
                                ${Object.keys(data[0] || {}).map((key) => `<th>${key}</th>`).join("")}
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
                                            .join("")}
                                        <td>
                                            <button onclick="editarEntidad('${entidad}', '${item.cod_e || item.id || item.cod_a}')">Editar</button>
                                            <button onclick="eliminarEntidad('${entidad}', '${item.cod_e || item.id || item.cod_a}')">Eliminar</button>
                                        </td>
                                    </tr>
                                `
                                )
                                .join("")}
                        </tbody>
                    </table>
                `;
            })
            .catch((error) => {
                console.error('Error al listar:', error);
            });
    };

    window.editarEntidad = (entidad, id) => {
        // Obtén los datos actuales del registro desde el servidor
        fetch(`http://127.0.0.1:3000/${entidad.toLowerCase()}/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                // Generar un formulario para editar
                const formularioEdicion = document.createElement("div");
                formularioEdicion.innerHTML = `
                    <h3>Editando ${entidad} con ID ${id}</h3>
                    <form id="formEditar${entidad}">
                        ${Object.entries(data)
                            .map(([key, value]) => {
                                // Crea un input por cada propiedad del objeto
                                if (key === "id") {
                                    return `<input type="hidden" id="${key}" value="${value}">`;
                                }
                                return `
                                    <label for="${key}">${key}</label>
                                    <input type="text" id="${key}" value="${value}">
                                `;
                            })
                            .join("")}
                        <input type="submit" value="Guardar Cambios">
                    </form>
                `;
    
                // Inserta el formulario en la página
                const formulario = document.getElementById("formulario");
                formulario.innerHTML = "";
                formulario.appendChild(formularioEdicion);
    
                // Agrega el evento para enviar los datos
                document
                    .getElementById(`formEditar${entidad}`)
                    .addEventListener("submit", (e) => {
                        e.preventDefault();
    
                        // Captura los datos del formulario
                        const nuevosDatos = {};
                        Object.keys(data).forEach((key) => {
                            nuevosDatos[key] = document.getElementById(key).value;
                        });
    
                        // Envía los datos editados al servidor
                        fetch(`http://127.0.0.1:3000/${entidad.toLowerCase()}/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(nuevosDatos),
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(`Error al guardar los cambios: ${response.statusText}`);
                                }
                                return response.json();
                            })
                            .then(() => {
                                alert("¡Cambios guardados exitosamente!");
                                listarEntidad(entidad); // Refresca la lista
                            })
                            .catch((error) => {
                                console.error("Error al guardar los cambios:", error);
                                alert("Hubo un problema al guardar los cambios.");
                            });
                    });
            })
            .catch((error) => {
                console.error("Error al cargar los datos para editar:", error);
                alert("No se pudieron cargar los datos para editar.");
            });
    };
    

    window.eliminarEntidad = (entidad, id) => {
        if (confirm(`¿Estás seguro de eliminar este ${entidad} con ID ${id}?`)) {
            fetch(`http://127.0.0.1:3000/${entidad.toLowerCase()}/${id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    alert('¡Eliminación exitosa!');
                    listarEntidad(entidad);
                })
                .catch((error) => {
                    console.error('Error al eliminar:', error);
                });
        }
    };

    document.getElementById("btnEstudiantes").addEventListener("click", () => generarFormulario("Estudiantes"));
    document.getElementById("btnProfesores").addEventListener("click", () => generarFormulario("Profesores"));
    document.getElementById("btnAsignaturas").addEventListener("click", () => generarFormulario("Asignaturas"));
});
