// index.js

// Function to fetch and display books
async function displayBooks() {
    try {
      const response = await fetch('book.json'); // Assuming 'books.json' is in the same directory
      const data = await response.json();
  
      const bookContainer = document.getElementById('book-container');
  
      // Iterate through the book data
      data.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('col-md-3', 'mb-2');
        bookCard.innerHTML = `
          <div class="card">
            <img src="${book.cover_image}" class="card-img-top" alt="${book.title}" style="max-height: 500px; object-fit: cover;">  <!-- Adjusted image size -->
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">Author: ${book.author}</p>
              <p class="card-text">Price: $${book.price.toFixed(2)}</p>
              <button class="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        `;
  
        // Append the book card to the container
        bookContainer.appendChild(bookCard);
      });
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }
  
  // Function to add an item to the cart
  function addToCart(title, author, price) {
    const cartItem = {
      title: title,
      author: author,
      price: price,
      quantity: 1,
    };
  
    // Retrieve existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item) => item.title === title);
  
    if (existingItem) {
      existingItem.quantity += 1; // Increment the quantity
    } else {
      cartItems.push(cartItem); // Add the new item to the cart
    }
  
    // Update the cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    // Alert the user that the item has been added to the cart (you can customize this)
    alert(`${title} has been added to the cart!`);
  }
  
  // Call the function to display books
  displayBooks();
  