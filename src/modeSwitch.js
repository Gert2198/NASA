const checkbox = document.getElementById("toggle"); // Get the toggle checkbox element
const body = document.body; // Get the body element
let lightMap; // Variable to store the light map style
let darkMap; // Variable to store the dark map style
let map; // Variable to store the map instance

// Fetch the light map style JSON
fetch('../styles/lightMap.json')
  .then(response => response.json()) // Parse the JSON automatically
  .then(data => {
    // Initialize the map with the light style
    map = new mapboxgl.Map({
      container: "map",
      style: data,
      center: [-74.5, 40], // Initial coordinates [longitude, latitude]
      zoom: 9, // Initial zoom level
    });
    lightMap = data; // Store the light map style
  })
  .catch(error => console.error('Error:', error)); // Log any errors

// Fetch the dark map style JSON
fetch('../styles/darkMap.json')
  .then(response => response.json()) // Parse the JSON automatically
  .then(data => {
    darkMap = data; // Store the dark map style
  })
  .catch(error => console.error('Error:', error)); // Log any errors

// Add an event listener for the toggle checkbox
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    body.classList.add("dark-mode"); // Add dark mode class to the body
    map.setStyle(darkMap); // Set the map style to dark mode
  } else {
    body.classList.remove("dark-mode"); // Remove dark mode class from the body
    map.setStyle(lightMap); // Set the map style to light mode
    console.log('NO JSON');
  }
});