document.addEventListener('DOMContentLoaded', function(){

let empleados = [];

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

        actualizarTabla();

        form_emp.reset();

        console.log(empleados);
    });
// Busqueda por DNI

const form_search_dni = document.getElementById('form-search');

form_search_dni.addEventListener('submit', function(event){
    event.preventDefault();

    const dni = document.getElementById('form-search-dni').value.trim();

    if (dni == '') {
        actualizarTabla();
        return;
    }
    if (!(/^\d{1,8}$/.test(dni))) {
        console.log("DNI no valido:", dni);
    }

    const empleadosFiltrados = empleados.filter(empleado => empleado.dni.startsWith(dni));
    mostrarEmpleados(empleadosFiltrados);

    form_search_dni.reset();

});

// Funcion para actualizar tabla principal de empleados
function actualizarTabla() {
    mostrarEmpleados(empleados);
}

// Función para mostrar empleados deseados
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

// Funcion para eliminar empleados
function eliminarEmpleado(index) {
    empleados.splice(index, 1);
    actualizarTabla();
}
// Funcion para eliminar empleados
function editarEmpleado(index) {
    console.log(index);
    const empleado = empleados[index];
    console.log(empleado)
    document.getElementById('dniRegister').value = empleado.dni;
    document.getElementById('nameRegister').value = empleado.nombre;
    document.getElementById('lastnameRegister').value = empleado.apellido;
    document.getElementById('dateRegister').value = empleado.fechaNacimiento;
    document.getElementById('phoneRegister').value = empleado.telefono;
    document.getElementById('userRegister').value = empleado.domicilio;

    empleados.splice(index, 1);
    actualizarTabla();
}

const btn_editar = document.getElementById('btn-editar');

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
    });


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

})