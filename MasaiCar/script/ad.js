document.getElementById('adForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form values
    const brand = document.getElementById('brand').value;
    const type = document.getElementById('type').value;
    const year = document.getElementById('year').value;
    const kms = document.getElementById('kms').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
  
    // Create a new car object
    const newCar = {
      brand: brand,
      type: type,
      year: parseInt(year),
      kms: parseInt(kms),
      description: description,
      price: parseInt(price)
    };
  
    // Send a POST request to JSON Server to store the new car ad
    fetch('http://localhost:8080/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCar)
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    alert("Car Added Successfully !")
    console.log('Car ad posted successfully:', data);
    // You can add further logic or DOM manipulation here if needed
  })
  .catch(error => {
    console.error('Error posting car ad:', error);
    // Handle errors if any
  });


}) 