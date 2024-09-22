const checkbox = document.getElementById("toggle");
const body = document.body;
let lightMap
let darkMap
let map

fetch('../styles/lightMap.json')
  .then(response => response.json())  // Parsear el JSON automáticamente
  .then(data => {
    map = new mapboxgl.Map({
      container: "map",
      style: data,
      center: [-74.5, 40], // Coordenadas iniciales [longitud, latitud]
      zoom: 9, // Nivel de zoom inicial
    });
    lightMap = data;
  })
  .catch(error => console.error('Error:', error));

fetch('../styles/darkMap.json')
  .then(response => response.json())  // Parsear el JSON automáticamente
  .then(data => {
    darkMap = data;
  })
  .catch(error => console.error('Error:', error));

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    body.classList.add("dark-mode");
    map.setStyle(darkMap)
  } else {
    body.classList.remove("dark-mode")
    map.setStyle(lightMap)
    console.log('NO JSON')
  }
});
