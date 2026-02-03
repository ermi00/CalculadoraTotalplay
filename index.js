// Formularios
let btnCalcularAjuste = document.getElementById("btnCalcularAjuste");
let inputCostoDelPlanPP = document.getElementById("inputCostoDelPlanPP");
let inputDescuentoDePorVida = document.getElementById(
  "inputDescuentoDePorVida",
);
let btnAgregarAdicional = document.getElementById("btnAgregarAdicional");
let btnFormula1 = document.getElementById("btnFormula1");
let btnFormula2 = document.getElementById("btnFormula2");
let btnFormula3 = document.getElementById("btnFormula3");
let btnFormula4 = document.getElementById("btnFormula4");
let divAdicionales = document.getElementById("divAdicionales");
let divPromociones = document.getElementById("divPromociones");
let divSelectNumeroDeServicios = document.getElementById(
  "divSelectNumeroDeServicios",
);
let divAdicional = document.getElementById("divAdicional");
let divPromocion = document.getElementById("divPromocion");
let selectNumeroDeServicios = document.getElementById(
  "selectNumeroDeServicios",
);
let h2 = document.getElementById("h2");
let sectionFormulario = document.getElementById("sectionFormulario");
let spanTotalAjustar = document.getElementById("spanTotalAjustar");
let formulario = document.getElementById("formulario");

// Variables para las formulas

let adicionales = [];
let promocionesIncluidas = [];
let contador = 0;
let formulaSeleccionada = 0;

// Fallas en todos los servicios sin adicionales contratados

function fallaEnTodosLosServiciosSinAdicionales() {
  let costoDelPlanPP = inputCostoDelPlanPP.value;
  let descuentoDePorVida = inputDescuentoDePorVida.value;
  let diasConFalla = diferenciaDeDias();
  let costoPorDia;
  let totalAjustar;

  costoPorDia = (costoDelPlanPP - descuentoDePorVida) / 30;
  totalAjustar = costoPorDia * diasConFalla;

  spanTotalAjustar.textContent = `TOTAL AJUSTAR $${totalAjustar}`;
  console.log(diasConFalla, costoDelPlanPP, descuentoDePorVida, totalAjustar);
}

// Fallas en todos los servicios con adicionales contratados

function fallaEnTodosLosServiciosConAdicionales() {
  let costoDelPlanPP = inputCostoDelPlanPP.value;
  let descuentoDePorVida = inputDescuentoDePorVida.value;
  let diasConFalla = diferenciaDeDias();
  let costoPorDia;
  let totalAjustar;

  totalMensual =
    costoDelPlanPP + adicionales - (descuentoDePorVida + promocionesIncluidas);
  costoPorDia = totalMensual / 30;
  totalAjustar = costoPorDia * diasConFalla;

  spanTotalAjustar.textContent = `TOTAL AJUSTAR $${totalAjustar}`;
  return totalAjustar;
}

// Falla en un solo servicio sin adicionales contratados

function fallaEnUnSoloServicioSinAdicionalesContratados() {
  costoPorServicio =
    (costoDelPlanPP - (descuentoDePorVida + promocionesIncluidas)) /
    numeroDeServicios;
  costoPorDia = costoPorServicio / 30;
  totalAjustar = costoPorDia * diasConFalla;
  return totalAjustar;
}

// Falla en un solo servicio con adicionales contratados

function fallaEnUnServicioConAdicionalesContratados() {
  costoPorServicio = (costoDelPlanPP - (descuentoDePorVida + promocionesIncluidas)) / numeroDeServicios;
  costoTotalPorServicio = costoPorServicio + adicionalesAfectados;
  costoPorDia = costoTotalPorServicio / 30;
  totalAjustar = costoPorDia * diasConFalla;
}

// Calculo de diferencia de dias

function diferenciaDeDias() {
  let FechaInicial = new Date(document.getElementById("inputFechaInicial").value,);
  let FechaFinal = new Date(document.getElementById("inputFechaFinal").value);
   
  let diferencia = Math.abs(FechaFinal.getTime() - FechaInicial.getTime());
  let dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

  return dias + 1;
}

// Formula Seleccionada

sectionFormulario.style.display = "none";

btnFormula1.addEventListener("click", (e) => {
  e.preventDefault();
  formulario.reset();
  formulaSeleccionada = 1;
  sectionFormulario.style.display = "block";
  h2.innerHTML = "Fallas en todos los servicios SIN adicionales contratados";
  divAdicionales.style.display = "none";
  divPromociones.style.display = "none";
  divSelectNumeroDeServicios.style.display = "none";
});

btnFormula2.addEventListener("click", (e) => {
  e.preventDefault();
  formulario.reset();
  formulaSeleccionada = 2;
  sectionFormulario.style.display = "block";
  h2.innerHTML = "Fallas en todos los servicios CON adicionales contratados";
  divAdicionales.style.display = "block";
  divPromociones.style.display = "block";
  divSelectNumeroDeServicios.style.display = "none";

  let adicionalesExtra = document.querySelectorAll(".adicionalesExtra");

  adicionalesExtra.forEach((div) => {
    div.remove();
  });
});

btnFormula3.addEventListener("click", (e) => {
  e.preventDefault();
  formulario.reset();
  formulaSeleccionada = 3;
  sectionFormulario.style.display = "block";
  h2.innerHTML = "Falla en un solo servicio SIN adicionales contratados";
  divAdicionales.style.display = "none";
  divPromociones.style.display = "block";
  divSelectNumeroDeServicios.style.display = "block";
});

btnFormula4.addEventListener("click", (e) => {
  formulario.reset();
  formulaSeleccionada = 4;
  sectionFormulario.style.display = "block";
  h2.innerHTML = "Falla en un solo servicio CON adicionales contratados";
  divAdicionales.style.display = "block";
  divPromociones.style.display = "block";
  divSelectNumeroDeServicios.style.display = "block";

  let adicionalesExtra = document.querySelectorAll(".adicionalesExtra");

  adicionalesExtra.forEach((div) => {
    div.remove();
  });
});

btnCalcularAjuste.addEventListener("click", () => {
  switch (formulaSeleccionada) {
    case 1:
      console.log("Realizar formula 1");
      fallaEnTodosLosServiciosSinAdicionales();
      break;

    case 2:
      console.log("Realizar formula 2");
      break;

    case 3:
      console.log("Realizar formula 3");
      break;

    case 4:
      console.log("Realizar formula 4");
      break;

    default:
      break;
  }
});

// Creacion de campos de adicionales

btnAgregarAdicional.addEventListener("click", () => {
  let div = document.createElement("div");
  let input = document.createElement("input");
  let boton = document.createElement("button");

  divAdicionales.appendChild(div);
  div.classList.add("adicionalesExtra");
  div.appendChild(input);
  input.type = "number";
  input.placeholder = "Adicional";
  div.appendChild(boton);
  boton.textContent = "Eliminar adicional";
  boton.type = "button";

  boton.addEventListener("click", () => {
    div.remove();
  }); 
});
