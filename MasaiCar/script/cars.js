function fetchAds() {
    fetch('http://localhost:8080/cars')
      .then(response => response.json())
      .then(data => {
         Display(data)
      })
      .catch(error => {
        console.error('Error fetching ads:', error);
        // Handle errors if any
      });
  }
  
  // Call the fetchAds function to display the ads on page load
  fetchAds();


  function Display(data){
    const adsContainer = document.getElementById('adsContainer');
    adsContainer.innerHTML = '';

    data.forEach(ad => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Add card content (brand, type, year, kms, description, price)
      const brand = document.createElement('p');
      brand.textContent = 'Brand: ' + ad.brand;
      card.appendChild(brand);

      const type = document.createElement('p');
      type.textContent = 'Type: ' + ad.type;
      card.appendChild(type);

      const year = document.createElement('p');
      year.textContent = 'Year: ' + ad.year;
      card.appendChild(year);

      const kms = document.createElement('p');
      kms.textContent = 'KMS Driven: ' + ad.kms;
      card.appendChild(kms);

      const description = document.createElement('p');
      description.textContent = 'Description: ' + ad.description;
      card.appendChild(description);

      const price = document.createElement('p');
      price.textContent = 'Price: ' + ad.price;
      card.appendChild(price);

      // Add edit, delete, and wishlist icons
      const iconsContainer = document.createElement('div');
      iconsContainer.classList.add('icons');

      const editIcon = document.createElement('button');
      editIcon.innerText="Edit"
      editIcon.addEventListener('click', () => editAd(ad.id));
      iconsContainer.appendChild(editIcon);

      const deleteIcon = document.createElement('button');
      deleteIcon.textContent="Delete"
      deleteIcon.addEventListener('click', () => deleteAd(ad.id));
      iconsContainer.appendChild(deleteIcon);

      const wishlistIcon = document.createElement('button');
      wishlistIcon.innerText="WishList"
      wishlistIcon.addEventListener('click', () => addToWishlist(ad.id));
      iconsContainer.appendChild(wishlistIcon);

      card.appendChild(iconsContainer);

      adsContainer.appendChild(card);
    });
  }

  // Function to delete an ad
function deleteAd(id) {
    fetch(`http://localhost:8080/cars/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Car ad deleted successfully');
        fetchAds(); // Fetch and display updated ads after deletion
      })
      .catch(error => {
        console.error('Error deleting car ad:', error);
        // Handle errors if any
      });
  }
  
  

// Variables to store the current sort and filter options
let currentSort = null;
let currentFilter = null;

// Function to sort and filter the ads based on the selected options
function sortAndFilterAds() {
  fetch('http://localhost:8080/cars')
    .then(response => response.json())
    .then(data => {
      // Apply the current filter
      let filteredAds = data;
      if (currentFilter) {
        filteredAds = filteredAds.filter(ad => ad.brand === currentFilter);
      }
      console.log(filteredAds)
      Display(filteredAds)
    //   // Apply the current sort
  
    })
    .catch(error => {
      console.error
      console.error('Error fetching ads:', error);
      // Handle errors if any
    });
}

// Function to handle sorting option changes
function handleSortChange() {
  const sortSelect = document.getElementById('sortSelect');
  currentSort = sortSelect.value;
  sortAndFilterAds();
}

// Function to handle filter option changes
function handleFilterChange() {
  const filterSelect = document.getElementById('filterSelect');
  currentFilter = filterSelect.value;
  sortAndFilterAds();
}

// Add event listeners to the sort and filter select elements
document.getElementById('sortSelect').addEventListener('change', handleSortChange);
document.getElementById('filterSelect').addEventListener('change', handleFilterChange);



// Variables to store the current ad being edited and the modal elements
let currentAd = null;
const modal = document.getElementById('modal');
const editForm = document.getElementById('editForm');

// Function to open the modal and populate the form with ad details
function editAd(id) {
  currentAd = id;

  fetch(`http://localhost:8080/cars/${id}`)
    .then(response => response.json())
    .then(data => {
      // Populate the form with the ad details
      editForm.brand.value = data.brand;
      editForm.type.value = data.type;
      editForm.year.value = data.year;
      editForm.kms.value = data.kms;
      editForm.description.value = data.description;
      editForm.price.value = data.price;

      // Open the modal
      modal.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching ad details:', error);
      // Handle errors if any
    });
}

// Function to handle form submission for editing an ad
editForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const brand = editForm.brand.value;
  const type = editForm.type.value;
  const year = editForm.year.value;
  const kms = editForm.kms.value;
  const description = editForm.description.value;
  const price = editForm.price.value;

  // Create updated car object
  const updatedCar = {
    brand: brand,
    type: type,
    year: parseInt(year),
    kms: parseInt(kms),
    description: description,
    price: parseInt(price)
  };

  // Send a PUT request to update the ad in JSON Server
  fetch(`http://localhost:8080/cars/${currentAd}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCar)
  })
    .then(() => {
      console.log('Car ad updated successfully');
      fetchAds(); // Fetch and display updated ads after editing
      modal.style.display = 'none'; // Close the modal
    })
    .catch(error => {
      console.error('Error updating car ad:', error);
      // Handle errors if any
    });
});

// Function to close the modal when the close button is clicked
// Function to close the modal when the close button is clicked
document.getElementById('closeModal').addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Function to close the modal when the user clicks outside the modal
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  