if (localStorage.getItem("listado") === null) {
  localStorage.setItem("listado", JSON.stringify([]));
}
let ListaPersonas = [];
const personas = {
  id: ``,
  Nombre: ``,
  Correo: ``,
  Telefono: ``,
};

let editar = null;

const formulario = document.querySelector("#form2");
const nombreA = document.querySelector("#nombre");
const correoA = document.querySelector("#correo");
const telefonoA = document.querySelector("#telefono");
const btnAgregar = document.querySelector("#boton");

formulario.addEventListener(`submit`, validarF);

function validarF(element) {
  element.preventDefault();
  if (nombreA.value === "" || correoA.value === "" || telefonoA.value === "") {
    alert("Todos los campos son obligatorios");
    return;
  }
  personas.Nombre = nombreA.value;
  personas.Correo = correoA.value;
  personas.Telefono = telefonoA.value;
  if (editar) {
    editarPersona();
    editar = null;
  } else {
    personas.id = Date.now();

    agregarPersona();
  }
}

function agregarPersona() {
  const listado = JSON.parse(localStorage.getItem("listado"));
  listado.push(personas);
  localStorage.setItem("listado", JSON.stringify(listado));
  mostrarPersonas();
  nombreA.value = "";
  correoA.value = "";
  telefonoA.value = "";
}
function editarPersona() {
  const listado = JSON.parse(localStorage.getItem("listado"));
  const index = listado.findIndex((persona) => {
    return persona.id === editar;
  });
  listado[index].Nombre = personas.Nombre;
  listado[index].Correo = personas.Correo;
  listado[index].Telefono = personas.Telefono;
  localStorage.setItem("listado", JSON.stringify(listado));
  mostrarPersonas();
  nombreA.value = "";
  correoA.value = "";
  telefonoA.value = "";
}
function mostrarPersonas() {
  const divPersonas = document.querySelector(".div-personas");
  const listado = JSON.parse(localStorage.getItem("listado"));
  divPersonas.innerHTML = "";
  listado.forEach((persona) => {
    const { id, Nombre, Correo, Telefono } = persona;

    const parrafo = document.createElement("p");
    parrafo.textContent = `${Nombre}
    ${Correo} 
     ${Telefono}`;
    parrafo.dataset.id = id;

    const editarBoton = document.createElement(`button`);
    editarBoton.textContent = "Editar";
    editarBoton.addEventListener("click", () => {
      nombreA.value = Nombre;
      correoA.value = Correo;
      telefonoA.value = Telefono;
      editar = id;
    });
    //  editarBoton.classList.add()
    parrafo.append(editarBoton);

    const EliminarBoton = document.createElement(`button`);
    EliminarBoton.textContent = "Eliminar";
    EliminarBoton.addEventListener("click", () => {
      const listado = JSON.parse(localStorage.getItem("listado"));
      const index = listado.findIndex((persona) => {
        return persona.id === id;
      });
      listado.splice(index, 1);
      localStorage.setItem("listado", JSON.stringify(listado));
      mostrarPersonas();
    });

    //  editarBoton.classList.add()
    parrafo.append(EliminarBoton);

    const hr = document.createElement(`hr`);

    divPersonas.appendChild(parrafo);
    divPersonas.appendChild(hr);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  mostrarPersonas();
});
