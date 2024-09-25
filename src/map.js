mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW81NTcyIiwiYSI6ImNsbjdxYm5qbzBsYXYycG8ycXliamU3b3kifQ.4j-2bFW0uRXWsk36ji7w_Q';

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map', // Map container ID
  style: 'mapbox://styles/mapbox/streets-v11', // Style URL
  center: [-74.5, 40], // Starting position [lng, lat]
  zoom: 9 // Starting zoom
});

// Add zoom and rotation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// Create a marker
const marker = new mapboxgl.Marker({
  draggable: true
}).setLngLat([-74.5, 40]).addTo(map);

// Handle drag end for the marker
marker.on('dragend', function () {
  const lngLat = marker.getLngLat();
  console.log(`Marker dropped at: ${lngLat.lat}, ${lngLat.lng}`);
});

function searchLocation() {
  const searchText = document.getElementById('search-input').value;

  if (!searchText.trim()) {
    alert('Please enter a location.');
    return;
  }

  // Use Mapbox's Geocoding API to search for the location
  const geocoderUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${mapboxgl.accessToken}`;

  fetch(geocoderUrl)
    .then(response => response.json())
    .then(data => {
      if (data.features.length === 0) {
        alert('No location found. Please try again.');
        return;
      }

      const result = data.features[0];
      const [lng, lat] = result.geometry.coordinates;

      // Move the marker to the searched location and center the map on it
      marker.setLngLat([lng, lat]);
      map.flyTo({ center: [lng, lat], zoom: 14 });

      console.log(`Location found: ${result.place_name}`);
    })
    .catch(err => {
      console.error('Error with geocoding:', err);
    });
}

// Search functionality using Mapbox Geocoding API
document.getElementById('search-btn').addEventListener('click', searchLocation());
// Detect Enter key press in the search input field
document.getElementById('search-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchLocation();
  }
});
