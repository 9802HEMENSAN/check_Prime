// Function to fetch and display wishlisted cars
function fetchWishlistedCars() {
    fetch('http://localhost:8080/wishlist')
      .then(response => response.json())
      .then(data => {
        const wishlistContainer = document.getElementById('wishlistContainer');
        wishlistContainer.innerHTML = ''; // Clear previous content
  
        // Iterate over the wishlisted cars and create card elements
        data.forEach(car => {
          const card = createCarCard(car);
          wishlistContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching wishlisted cars:', error);
        // Handle errors if any
      });
  }
  
  // Function to create a card element for a car
  function createCarCard(car) {
    const card = document.createElement('div');
    card.classList.add('car-card');
  
    const brand = document.createElement('h3');
    brand.textContent = car.brand;
    card.appendChild(brand);
  
    const type = document.createElement('p');
    type.textContent = `Type: ${car.type}`;
    card.appendChild(type);
  
    const year = document.createElement('p');
    year.textContent = `Year: ${car.year}`;
    card.appendChild(year);
  
    const kms = document.createElement('p');
    kms.textContent = `KMs Driven: ${car.kms}`;
    card.appendChild(kms);
  
    const description = document.createElement('p');
    description.textContent = car.description;
    card.appendChild(description);
  
    const price = document.createElement('p');
    price.textContent = `Price: ${car.price}`;
    card.appendChild(price);
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
      deleteFromWishlist(car.id);
    });
    card.appendChild(deleteBtn);
  
    return card;
  }
  
  // Function to delete a car from the wishlist
  function deleteFromWishlist(id) {
    fetch(`http://localhost:8080/wishlist/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Car removed from wishlist successfully');
        fetchWishlistedCars(); // Fetch and display updated wishlist after deletion
      })
      .catch(error => {
        console.error('Error removing car from wishlist:', error);
        // Handle errors if any
      });
  }
  
  // Fetch and display wishlisted cars on page load
  fetchWishlistedCars();
  