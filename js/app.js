const LLAVE_API = 'DEMO_KEY';
let paginaActual = 1;
let fechaActualTierra = '2015-07-02';

async function buscarFotos() {
  const fechaTierra = document.getElementById('fechaTierra').value;
  fechaActualTierra = fechaTierra;
  paginaActual = 1;
  cargarFotos();
}

async function cargarFotos() {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${fechaActualTierra}&page=${paginaActual}&api_key=${LLAVE_API}`;
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  mostrarFotos(datos.photos);
}

function mostrarFotos(fotos) {
  const cuerpoTabla = document.getElementById('tablaFotos').getElementsByTagName('tbody')[0];
  cuerpoTabla.innerHTML = ''; // Limpiar tabla antes de cargar nuevos datos
  fotos.forEach(foto => {
    const fila = cuerpoTabla.insertRow();
    fila.innerHTML = `
      <td>${foto.id}</td>
      <td>${foto.rover.name}</td>
      <td>${foto.camera.name}</td>
      <td><button class="btn" onclick="mostrarDetalleFoto(${foto.id}, '${foto.img_src}', ${foto.sol}, '${foto.earth_date}')">Más</button></td>
    `;
  });
  if (fotos.length > 0) mostrarDetalleFoto(fotos[0].id, fotos[0].img_src, fotos[0].sol, fotos[0].earth_date);
}

function mostrarDetalleFoto(id, imgSrc, sol, fechaTierra) {
  document.getElementById('imagenFoto').src = imgSrc;
  document.getElementById('idFoto').textContent = id;
  document.getElementById('solFoto').textContent = sol;
  document.getElementById('fechaFoto').textContent = fechaTierra;
}

function paginaAnterior() {
  if (paginaActual > 1) {
    paginaActual--;
    cargarFotos();
  }
}

function paginaSiguiente() {
  paginaActual++;
  cargarFotos();
}

// Cargar las primeras fotos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarFotos();
});