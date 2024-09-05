document.addEventListener("DOMContentLoaded", function () {
    /* 

    --- JS DE LUCAS ---
    
    */

    // deshabilitar fechas posteriores a la actual
    function deshabilitarFechasPasadas() {
        const fechaActual = new Date().toISOString().split("T")[0];
        document.getElementById("dateRegister").setAttribute("max", fechaActual);
    }
    window.onload = deshabilitarFechasPasadas;

    // validación 8 caracteres máximos en DNI
    const form = document.getElementById("form-emp");
    const dni = document.getElementById("dniRegister");
    const dniLabel = document.getElementById("dniLabel");
    const labelName = document.getElementById("nameLabel");
    const labelLastName = document.getElementById("lastNameLabel");
    const name = document.getElementById("nameRegister");
    const lastName = document.getElementById("lastnameRegister");
    const phone = document.getElementById("phoneRegister");
    const labelPhone = document.getElementById("phoneLabel");


    permitirSoloNumeros(dni);
    permitirSoloNumeros(phone);


    function permitirSoloNumeros(elemEntrada) {
        elemEntrada.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, ''); // Elimina cualquier carácter que no sea un número
        });
    }

    function permitirSoloLetras(elemEntrada, label) {
        if (/[^a-zA-Z\s]/.test(elemEntrada.value)) {
            label.innerText = 'Por favor, ingrese solo letras.'
        } else {
            label.innerText = "";
        }
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        if (dni.value.length < 8) {
            dniLabel.innerText = "El DNI debe tener al menos 8 caracteres.";
        } else {
            dniLabel.innerText = "";
        }
        permitirSoloLetras(name, labelName);
        permitirSoloLetras(lastName, labelLastName);
        if (phone.value.length < 10) {
            labelPhone.innerText = "El número de teléfono debe tener al menos 10 dígitos.";
        } else {
            labelPhone.innerText = "";
        }

    });

/* 

--- JS DE CHINO ---

*/

/*let empleados = [];

const form_emp = document.getElementById('form-emp');

form_emp.addEventListener('submit', function(emp){
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();

    emp.preventDefault();

    const dni = document.getElementById('dniRegister').value;
    const nombre = document.getElementById('nameRegister').value;
    const apellido = document.getElementById('lastnameRegister').value;
    const fechaNacimiento = document.getElementById('dateRegister').value;
    const telefono = document.getElementById('phoneRegister').value;
    const domicilio = document.getElementById('userRegister').value;

    const empleado = {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento,
        telefono: telefono,
        domicilio: domicilio
    };

    empleados.push(empleado);
    // Se actualiza la tabla
    actualizarTabla();
    // se resetea el formulario
    form_emp.reset();
});
// Busqueda por DNI
const form_search_dni = document.getElementById('form-search');

form_search_dni.addEventListener('submit', function(event){
    event.preventDefault();
    // obtiene el valor de dni y le quita los espacios
    const dni = document.getElementById('form-search-dni').value.trim();
    // si "dni" es vacio actualiza la tabla y deja los registros vacios
    if (dni == '') {
        // Se actualiza la tabla
        mostrarEmpleados([]);
        return;
    }
    // verifica datos de DNI
    if (!(/^\d{1,8}$/.test(dni))) {
        console.log("DNI no valido:", dni);
        return;
    }
    // filtra a los DNI que comienzan por "dni" y los almacena en "empleadosFiltrados"
    const empleadosFiltrados = empleados.filter(empleado => empleado.dni.startsWith(dni));
    mostrarEmpleados(empleadosFiltrados);
    // resetea el formulario dni despues de cada busqueda
    form_search_dni.reset();
});
// manda el indice para editar o eliminar el registro
document.querySelector('tbody').addEventListener('click', function(event) {
    if (event.target.closest('button')) {
        const button = event.target.closest('button');
        const action = button.getAttribute('data-action');
        const index = button.getAttribute('data-index');

        if (action === 'delete') {
            indexToDelete = index;
        } else if (action === 'edit') {
            editarEmpleado(index);
        }
    }
});
// Evento de boton eliminar en modal
document.getElementById('btn-del').addEventListener('click', function() {
    if (indexToDelete !== null) {

        empleados.splice(indexToDelete, 1);
        // Se actualiza la tabla
        actualizarTabla();

        // Oculta el modal de "advertencia al eliminar"
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        modal.hide();

        // Resetea el indice de eliminacion
        indexToDelete = null;
    }
});

// Funcion para eliminar empleados
function editarEmpleado(index) {
    const empleado = empleados[index];
    document.getElementById('dniRegister').value = empleado.dni;
    document.getElementById('nameRegister').value = empleado.nombre;
    document.getElementById('lastnameRegister').value = empleado.apellido;
    document.getElementById('dateRegister').value = empleado.fechaNacimiento;
    document.getElementById('phoneRegister').value = empleado.telefono;
    document.getElementById('userRegister').value = empleado.domicilio;

    empleados.splice(index, 1);
    // Se actualiza la tabla
    actualizarTabla();
}
// Funcion para actualizar tabla principal de empleados
function actualizarTabla() {
    mostrarEmpleados(empleados);
}
// Funcion para mostrar empleados deseados en tabla principal
function mostrarEmpleados(listaEmpleados) {

    const tbody = document.querySelector('tbody');

    tbody.innerHTML = '';
    listaEmpleados.forEach((empleado, index) => {
        const fila = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${empleado.dni}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.fechaNacimiento}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.domicilio}</td>
                <td>
                    <button class="btn btn-modal" data-action="edit" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square" title="Editar" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </button>
                    <button class="btn btn-modal" data-action="delete" data-index="${index}">
                        <i class="fa-solid fa-trash-can" title="Eliminar" data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

/* const btn_editar = document.getElementById('btn-editar');

    btn_editar.addEventListener('submit', function(emp){
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();

        emp.preventDefault();

        const dni = document.getElementById('dniRegister').value;
        const nombre = document.getElementById('nameRegister').value;
        const apellido = document.getElementById('lastnameRegister').value;
        const fechaNacimiento = document.getElementById('dateRegister').value;
        const telefono = document.getElementById('phoneRegister').value;
        const domicilio = document.getElementById('userRegister').value;

        const empleado = {
            dni: dni,
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento,
            telefono: telefono,
            domicilio: domicilio
        };

        empleados.push(empleado);

        actualizarTabla();

        form.reset();

        console.log(empleados);
    }); */


// Funcion para actualizar tabla principal de empleados (OTRA FORMA)
/* function mostrarEmpleados() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    empleados.forEach((empleado, index) => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${empleado.dni}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.apellido}</td>
            <td>${empleado.fechaNac}</td>
            <td>${empleado.telefono}</td>
            <td>${empleado.domicilio}</td>
            <td>
                <button class="btn btn-modal">
                    <i class="fa-solid fa-pen-to-square" title="Editar"></i>
                </button>
                <button class="btn btn-modal">
                    <i class="fa-solid fa-trash-can" title="Eliminar"></i>
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });
} */

});

