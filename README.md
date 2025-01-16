# Online Store with Cart and Sales Overview

This is a solution to the [Frontend Mentor - Product list with cart challenge](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). The project is an online store where users can add items to a cart, manage quantities, and place an order. Additionally, a sales overview is available, showcasing the orders placed, utilizing Chart.js to display the data.

## Table of contents

- Overview
  - The challenge
  - Screenshot
- My process
  - Built with
  - What I learned
  - Continued development
  - Useful resources

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- The cart state is saved using web storage, and it will persist when the page is reloaded
- Orders are sent to a local JSON file using JSON server and can be viewed on a separate page through Chart.js

### Screenshot

![Project Screenshot](./screenshot.jpg)



## Installation

To run this project locally on your machine:

1. **Clone the repository**
2. **Install json server**
 ```
npm install json-server
```
3. **Run json server on port 3000**
 ```
json-server --watch cart.json
```

4. **Install live server** <br>
   It's available under vs code extenstions

5. **Run the code from index.html**
6. **View the sales portal** <br>
   This page isnt't linked to the other pages, view it by changing the url slug to: 
 ```
sales.html
```

## My Process

### Built with

- HTML
- CSS
- JavaScript
- JSON Server (for storing the cart data)
- Chart.js (for the sales overview)
- Web Storage (to store cart data and persist across page reloads)

### What I Learned

This project was my first experience with JavaScript, and it taught me how to put all the concepts I’ve studied into practice. I learned to work with the DOM, event handling, and form submissions, as well as how to integrate external tools like JSON Server and Chart.js. Additionally, I gained a better understanding of how to store and manage data using web storage.

One of the key lessons was how to make changes in one part of the application (like the cart) affect other elements, such as button states. I had to learn how to make the cart and buttons interact smoothly, ensuring that the UI updated correctly when the cart changed. Another challenge was working with the POST request and preventing the default behavior of the form, which I later figured out was being blocked by live-server. As a quck workaround i decided to call the POST function from the confirmation modal but this would not work IRL as the user might close the window rather than clicking the button. 

Another important takeaway was the importance of planning ahead. Because I added the web storage functionality later in the project, I had to rebuild my entire logic to make it work. This project tought me the importance of keeping all requirements in mind from the start to avoid unnecessary complexity and to make future additions smoother.

### Continued Development

In future projects, I want to focus on writing cleaner, simpler code. I’ve learned that breaking down the problem into smaller chunks and tackling them one by one can help avoid the complexity that I initially faced. I’d like to keep improving my JavaScript skills, especially when it comes to handling more advanced functionality and asynchronous operations.

Additionally, I want to dive deeper into using frameworks like React and Vue in future projects, as I think they will help me build more dynamic and efficient web applications.

### Useful Resources

- [Chart.js Documentation](https://www.chartjs.org/docs/latest/) - This documentation helped me implement the sales overview chart in my project. It has clear examples and guides on how to use the library.
- [JSON Server Documentation](https://github.com/typicode/json-server) - This resource was essential in helping me understand how to use JSON Server to simulate a backend API for storing and retrieving cart data.
