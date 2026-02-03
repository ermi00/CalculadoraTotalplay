const limiteDinamico = 12;

function cambiarFormulario() {
    const tipo = document.getElementById('tipoFalla').value;
    const form = document.getElementById('formCalculadora');
    const res = document.getElementById('resultado');
    
    // Resetear formulario y resultado
    form.reset();
    res.innerText = "";
    document.getElementById('displayDias').innerText = "0";
    document.getElementById('contenedorPromociones').innerHTML = "";
    document.getElementById('contenedorAdicionales').innerHTML = "";

    if (tipo === "") {
        form.classList.add('hidden');
        return;
    }

    form.classList.remove('hidden');

    // Control de visibilidad de secciones según tu requerimiento
    document.getElementById('seccionServicios').classList.toggle('hidden', !tipo.startsWith('uno'));
    document.getElementById('seccionPromociones').classList.toggle('hidden', tipo === 'todos_sin');
    document.getElementById('seccionAdicionales').classList.toggle('hidden', !tipo.endsWith('_con'));
}

function agregarCampo(tipo) {
    const contenedor = document.getElementById(`contenedor${tipo}`);
    const actualCount = contenedor.children.length;

    if (actualCount < limiteDinamico) {
        const div = document.createElement('div');
        div.className = 'dinamico-item';
        div.innerHTML = `
            <input type="number" class="val-${tipo.toLowerCase()}" value="0" min="0" step="0.01">
            <button type="button" onclick="this.parentElement.remove()">x</button>
        `;
        contenedor.appendChild(div);
    } else {
        alert(`Límite de ${limiteDinamico} campos alcanzado.`);
    }
}

function calcularDias() {
    const inicio = new Date(document.getElementById('fechaInicio').value);
    const fin = new Date(document.getElementById('fechaFinal').value);
    
    if (inicio && fin && fin >= inicio) {
        const diferencia = fin - inicio;
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24)) + 1; // Incluye el día inicial
        document.getElementById('displayDias').innerText = dias;
        return dias;
    }
    return 0;
}

function realizarCalculo() {
    const tipo = document.getElementById('tipoFalla').value;
    const costoPlan = parseFloat(document.getElementById('costoPlan').value) || 0;
    const descVida = parseFloat(document.getElementById('descVida').value) || 0;
    const diasFalla = calcularDias();

    if (diasFalla <= 0) return alert("Verifique las fechas.");

    // Sumar inputs dinámicos
    const sumarInputs = (clase) => Array.from(document.querySelectorAll(clase))
                                      .reduce((acc, el) => acc + (parseFloat(el.value) || 0), 0);

    const totalPromociones = sumarInputs('.val-promociones');
    const totalAdicionales = sumarInputs('.val-adicionales');
    const numServicios = parseInt(document.getElementById('numServicios').value) || 1;

    let costoPorDia = 0;

    switch (tipo) {
        case 'todos_sin':
            // Fórmula: (Costo - Descuento) / 30
            costoPorDia = (costoPlan - descVida) / 30;
            break;

        case 'todos_con':
            // Fórmula: (Costo + Adicionales - (DescVida + Promos)) / 30
            costoPorDia = (costoPlan + totalAdicionales - (descVida + totalPromociones)) / 30;
            break;

        case 'uno_sin':
            // Fórmula: ((Costo - (DescVida + Promos)) / NumServicios) / 30
            let costoPorServicioSin = (costoPlan - (descVida + totalPromociones)) / numServicios;
            costoPorDia = costoPorServicioSin / 30;
            break;

        case 'uno_con':
            // Fórmula: (((Costo - (DescVida + Promos)) / NumServicios) + AdicionalesAfectados) / 30
            let costoBaseServicio = (costoPlan - (descVida + totalPromociones)) / numServicios;
            costoPorDia = (costoBaseServicio + totalAdicionales) / 30;
            break;
    }

    const totalAjustar = costoPorDia * diasFalla;
    document.getElementById('resultado').innerText = `TOTAL A AJUSTAR: $${totalAjustar.toFixed(2)} MXN`;
}