
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW81NTcyIiwiYSI6ImNsbjdxYm5qbzBsYXYycG8ycXliamU3b3kifQ.4j-2bFW0uRXWsk36ji7w_Q';

// Inicializar el mapa
const map = new mapboxgl.Map({
  container: 'map',
  center: [-74.5, 40], // Coordenadas iniciales [longitud, latitud]
  zoom: 9 // Nivel de zoom inicial
});

// Añadir controles de navegación (zoom y rotación)
map.addControl(new mapboxgl.NavigationControl());

// Crear un elemento HTML para el marcador
const marker = new mapboxgl.Marker({
  draggable: true // Hacer que el marcador sea draggable
})
.setLngLat([-74.5, 40]) // Posición inicial del marcador
.addTo(map);



// Obtener el elemento donde mostraremos las coordenadas
const coordinates = document.getElementById('coordinates');

// Función para actualizar las coordenadas en el DOM
function onDragEnd() {
  const lngLat = marker.getLngLat();
  console.log(`Latitud: ${lngLat.lat.toFixed(5)}, Longitud: ${lngLat.lng.toFixed(5)}`)
}

map.on('click', (e)=>{
    console.log("Soy solo click")
    marker.setLngLat(e.lngLat)
})
// Escuchar el evento de arrastre final del marcador
marker.on('dragend', onDragEnd);
