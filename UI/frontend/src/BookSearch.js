// ERROR 1: Missing 'use strict' directive
// ERROR 2: No file-level documentation/comments

// ERROR 3: Global variable pollution - should be scoped properly
var searchResults = [];
var currentUser = null;
var API_KEY = "sk_live_51234567890abcdef"; // ERROR 4: Hardcoded API key

// ERROR 5: Function naming - should be camelCase (searchBooks)
// ERROR 6: No JSDoc documentation
function Search_Books() {
    // ERROR 7: Using var instead of const/let
    var searchTerm = document.getElementById('searchBox').value;
    
    // ERROR 8: No input validation or sanitization
    // ERROR 9: Hardcoded API endpoint - should use environment variable
    var apiUrl = 'http://localhost:8080/api/search?query=' + searchTerm + '&key=' + API_KEY;
    
    // ERROR 10: No error handling for null element
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            searchResults = data;
            DisplayResults(data); // ERROR 11: Inconsistent naming - should be displayResults
        })
        // ERROR 12: Empty catch block - swallowing errors
        .catch(error => {});
}

// ERROR 13: Missing semicolons (not following convention)
function DisplayResults(books) {
    // ERROR 14: No null/undefined check for books parameter
    let container = document.getElementById('resultsContainer')
    container.innerHTML = '' // ERROR 15: Using innerHTML clearing (potential memory leak)
    
    // ERROR 16: No check if books is an array
    books.forEach(function(book) {
        // ERROR 17: XSS vulnerability - using innerHTML with unsanitized user data
        var bookCard = `
            <div class="book-card" data-id="${book.id}">
                <h3>${book.title}</h3>
                <p>By: ${book.author}</p>
                <p>Price: $${book.price}</p>
                <button onclick="addToCart(${book.id}, '${book.title}')">Add to Cart</button>
            </div>
        `;
        // ERROR 18: Concatenating innerHTML in loop (performance issue)
        container.innerHTML += bookCard
    })
}

// ERROR 19: Function name inconsistency - should be addToCart (camelCase start)
// ERROR 20: No parameter validation
function AddToCart(bookId, bookTitle) {
    // ERROR 21: Using var in modern JavaScript
    var user = localStorage.getItem('user');
    
    // ERROR 22: No try-catch for JSON parsing
    var userData = JSON.parse(user);
    
    // ERROR 23: SQL-like string concatenation in request body (if backend is vulnerable)
    var requestBody = {
        query: "INSERT INTO cart VALUES (" + userData.id + ", " + bookId + ")"
    };
    
    // ERROR 24: Hardcoded URL again
    fetch('http://localhost:8080/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // ERROR 25: Sending API key in header (security issue)
            'X-API-Key': API_KEY
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        // ERROR 26: Using alert (poor UX)
        alert('Book added to cart!')
    })
    // ERROR 27: No error handling
    .catch(err => console.log(err))
}

// ERROR 28: Inconsistent arrow function vs function declaration
const getUserCart = () => {
    // ERROR 29: No authentication check
    // ERROR 30: Accessing localStorage without try-catch
    let userId = JSON.parse(localStorage.getItem('user')).id;
    
    // ERROR 31: URL construction vulnerability
    fetch(`http://localhost:8080/api/cart/${userId}`)
        .then(res => res.json())
        .then(cart => {
            // ERROR 32: Direct DOM manipulation without framework
            document.getElementById('cartCount').innerText = cart.length
        })
}

// ERROR 33: Event listener added without checking if DOM is ready
document.getElementById('searchBtn').addEventListener('click', Search_Books)

// ERROR 34: No module export/proper code organization
// ERROR 35: Missing comments explaining complex logic
