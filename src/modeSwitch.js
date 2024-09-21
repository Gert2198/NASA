const checkbox = document.getElementById('toggle');
const body = document.body;

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
});