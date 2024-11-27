document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");

    // Función para generar un formulario dinámico
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
        formulario.innerHTML = formHTML;

        // Agregar evento al formulario para manejar el envío
        document.getElementById(`${entidad.toLowerCase()}Form`).addEventListener("submit", (e) => {
            e.preventDefault();

            // Captura los datos del formulario
            const datos = {};
            campos.forEach((campo) => {
                datos[campo.id] = document.getElementById(campo.id).value;
            });

            // Enviar datos mediante fetch
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
                .then((data) => {
                    console.log(data);
                    alert('¡Registro exitoso!');
                    document.getElementById(`${entidad.toLowerCase()}Form`).reset(); // Limpia el formulario
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Hubo un problema al registrar. Por favor, intenta nuevamente.');
                });
        });
    };

    // Botones para cargar los formularios
    document.getElementById("btnEstudiantes").addEventListener("click", () => generarFormulario("Estudiantes"));
    document.getElementById("btnProfesores").addEventListener("click", () => generarFormulario("Profesores"));
    document.getElementById("btnAsignaturas").addEventListener("click", () => generarFormulario("Asignaturas"));
});
