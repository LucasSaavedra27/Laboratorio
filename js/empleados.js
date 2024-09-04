document.addEventListener("DOMContentLoaded", function () {

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

});

