// Create a variable for the API key. This is required to access NASA's API.
const API_KEY = "DEMO_KEY"; //Replace "DEMO_KEY" with your actual API key from https://api.nasa.gov

// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Fetch the data from NASA's APOD API when the page loads, using the default date range
async function fetchAPODData() {
}

// Build the Gallery of images based on the data returned from the API
function buildGallery(data) {

}

// Modal Functionality for Opening and Closing the Explanation Modal
function openModal(item) {

}

function closeModal() {

}

// Add event listeners to the date inputs to fetch new data when the user changes the date range
document.getElementById("getImagesBtn").addEventListener("click", fetchImages);
document.getElementById("modalClose").addEventListener("click", closeModal);

// Close when clicking outside the modal box
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Close with Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});
