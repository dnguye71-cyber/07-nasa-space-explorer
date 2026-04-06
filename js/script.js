// Create a variable for the API key. This is required to access NASA's API.
const API_KEY = "dXJERxDggNCTFsdzfDOO7KCgJY5j5LNO9jp2kNAL"; //Replace "DEMO_KEY" with actual API key from https://api.nasa.gov

// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Fetch the data from NASA's APOD API when the page loads, using the default date range
async function fetchImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!startDate || !endDate) {
    alert("Please select both a start and end date.");
    return;
  }
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = `<p class="loading-msg">🔄 Loading space photos…</p>`;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    displayGallery(Array.isArray(data) ? data : [data]);
  } catch (error) {
    gallery.innerHTML = `<p class="error-msg">❌ Something went wrong: ${error.message}</p>`;
  }
}

// Build the Gallery of images based on the data returned from the API
function displayGallery(data) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; // Clear existing content

  if (data.length === 0) {
    gallery.innerHTML = `<p class="loading-msg">No images found for that date range.</p>`;
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("gallery-item");

    card.innerHTML = `
      <img src="${item.url}" alt="${item.title}" />
      <p><strong>${item.title}</strong></p>
      <p>${item.date}</p>
    `;

    card.addEventListener("click", () => openModal(item));
    gallery.appendChild(card);
  });
}

// Modal Functionality for Opening and Closing the Explanation Modal
function openModal(item) {
  document.getElementById("modalImg").src = item.hdurl || item.url;
  document.getElementById("modalImg").alt = item.title;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalDate").textContent = item.date;
  document.getElementById("modalExplanation").textContent = item.explanation;

  document.getElementById("modal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
  document.body.style.overflow = "";
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
