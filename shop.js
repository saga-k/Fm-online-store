
let cartArr = [];

let storedCartArr = JSON.parse(sessionStorage.getItem('cart'));

//Query selectors needed to render UI---------------------------------------------------------------------

const cartItemContainer = document.querySelector('#cartItemContainer');
const cards = document.querySelector('#cards');

//Query selectors end-------------------------------------------------------------------------------------



// Fetch data --------------------------------------------------------------------------------------------
fetch('data.json')
  .then(response => response.json())
  .then(productsArr => {

    // Populate DOM and push products to cart --------------------------------------------------------------
    productsArr.forEach(product => {
      product.class = product.category.normalize('NFD').replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      let card = createCard(product);
      cards.appendChild(card);
      cartArr.push(product);
    });

    // Function to create card ----------------------------------------------------------------------------
    function createCard(product) {
      const category = product.category;
      const name = product.name;
      const imageURL = product.image.desktop;
      const price = product.price;
      const mobileImageUrl = product.image.mobile;
      const productClass = product.class;

      let card = document.createElement('section');
      card.setAttribute('class', 'card');
      card.innerHTML = `
          <img src="${imageURL}" class="cardImage">
          <img src="${mobileImageUrl}" class="cardImageMobile">

          <button class="addToCartButton ${productClass}"><img src="assets/images/icon-add-to-cart.svg"><p>Add to cart</p></button>

          <button class ="activeButton ${productClass}"><div class="incrementIcon ${productClass}"></div>
          <p class="buttonAmount ${productClass}">0</p>
          <div class="decrementIcon ${productClass}"></div></button>

          <p class="cardCategory">${category}</p>
          <h3 class="cardTitle">${name}</h3>
          <strong class="cardPrice">$${price}</strong>`;

      return card;
    }

    // Create card end-------------------------------------------------------------------------------------



    //Create and append all cart UI elements --------------------------------------------------------------

    cartArr.forEach(product => {
      product.amount = 0;
      let cartItem = renderCartItem(product);
      cartItemContainer.appendChild(cartItem);
    })

    function renderCartItem(product) {
      const name = product.name;
      const price = product.price;
      const amount = product.amount;
      const totalPrice = product.price * product.amount;
      const productClass = product.class

      let cartItem = document.createElement('div');
      cartItem.setAttribute('class', 'cartItem');
      cartItem.classList.add(productClass);
      cartItem.innerHTML = `
     <div class="cartItemLeft">
       <p class="cartItemTitle">${name}</p>
       <div class="cartItemPrices">
         <p class="amount">${amount}x</p>
         <p class="price">@$${price}</p>
         <p class="totalPrice">$${totalPrice}</p>
       </div>
     </div>
     <div class="removeIcon ${productClass}"></div>`;
      return cartItem
    }

    //Render cart end----------------------------------------------------------------------------------------



    //Update cartArr from storage----------------------------------------------------------------------------
    if (storedCartArr !== null) {
      for (let i = 0; i < cartArr.length; i++) {
        cartArr[i].amount = storedCartArr[i].amount
      }
    }

    //cartArr from storage end-------------------------------------------------------------------------------



    //Query selectors from card and cartItems----------------------------------------------------------------
    const cartItems = document.querySelectorAll('.cartItem');
    const addToCartButtons = document.querySelectorAll('.addToCartButton');
    const activeButtons = document.querySelectorAll('.activeButton');
    const incrementIcon = document.querySelectorAll('.incrementIcon');
    const decrementIcon = document.querySelectorAll('.decrementIcon');
    const removeIcon = document.querySelectorAll('.removeIcon');
    const desktopImages = document.querySelectorAll('.cardImage');
    const mobileImages = document.querySelectorAll('.cardImageMobile');
    //Query-selectors end-------------------------------------------------------------------------------------



    //Query-selectors from html-document----------------------------------------------------------------------
    const totalItems = document.querySelector('#numberOfItems');
    const orderTotal = document.querySelector('#orderTotalPrice');
    const cartFooter = document.querySelector('#cartFooter');
    const emptyCart = document.querySelector('#emptyCart');
    const confirmOrder = document.querySelector('#confirmOrder');
    const confirmModal = document.querySelector('#modalOverlay');
    const confirmedContainer = document.querySelector('#confirmedContainer');
    const sendButton = document.querySelector('#continueShopping');

    //Query-selectors end-------------------------------------------------------------------------------------



    //Call initial styling functions---------------------------------------------------------------------------
    confirmModal.style.display = 'none';
    updateButton();
    updateCartItems();
    switchButton();
    switchCartItems();
    updateHeading();
    updateOrderTotal();
    checkIfEmpty();
    updateImage();

    //Function call end----------------------------------------------------------------------------------------




    //Array functions Start ------------------------------------------------------------------------------------

    //Add to cart button eventlistener and function-----------------------------

    addToCartButtons.forEach(button => button.addEventListener('click', () => addToCart(button)));

    function addToCart(button) {
      const secondClass = button.classList[1];
      const product = cartArr.find((product) => product.class === secondClass);
      product.amount += 1;
      updateButton();
      updateCartItems();
      switchButton();
      switchCartItems();
      updateHeading();
      updateOrderTotal();
      checkIfEmpty();
      updateImage();

      //Set storage
      sessionStorage.setItem('cart', JSON.stringify(cartArr));
    }

    //Add to cart button end----------------------------------------------------



    //Increment one eventlistener and function----------------------------------

    incrementIcon.forEach(icon => { icon.addEventListener('click', () => incrementOne(icon)) });

    function incrementOne(incrementIcon) {
      const secondClass = incrementIcon.classList[1];
      const product = cartArr.find((product) => product.class === secondClass);
      product.amount += 1;

      updateButton();
      updateCartItems();
      switchButton();
      switchCartItems();
      updateHeading();
      updateOrderTotal();
      checkIfEmpty();
      updateImage();

      //Set storage
      sessionStorage.setItem('cart', JSON.stringify(cartArr));
    }
    //increment one end here----------------------------------------------------



    //Decrement one eventlistener and function----------------------------------

    decrementIcon.forEach(icon => { icon.addEventListener('click', () => decrementOne(icon)) });

    function decrementOne(decrementIcon) {
      const secondClass = decrementIcon.classList[1];
      const product = cartArr.find((product) => product.class === secondClass);

      if (product.amount > 0) {
        product.amount -= 1;
      }
      updateButton();
      updateCartItems();
      switchButton();
      switchCartItems();
      updateHeading();
      updateOrderTotal();
      checkIfEmpty();
      updateImage();

      //Set storage
      sessionStorage.setItem('cart', JSON.stringify(cartArr));
    }

    //Decrement one end here----------------------------------------------------



    //Remove cart item eventlistener and function-------------------------------

    removeIcon.forEach(icon => { icon.addEventListener('click', () => removeItem(icon)) });

    function removeItem(removeIcon) {
      const secondClass = removeIcon.classList[1];
      const product = cartArr.find((product) => product.class === secondClass);
      product.amount = 0;

      updateButton();
      updateCartItems();
      switchButton();
      switchCartItems();
      updateHeading();
      updateOrderTotal();
      checkIfEmpty();
      updateImage();

      //Set storage
      sessionStorage.setItem('cart', JSON.stringify(cartArr));
    }

    //Remove item end here------------------------------------------------------

    //Array functions End ------------------------------------------------------------------------------------



    //Styling functions start --------------------------------------------------------------------------------

    //Update active button amount-----------------------------------------------

    function updateButton() {
      for (let i = 0; i < cartArr.length; i++) {
        let amount = activeButtons[i].querySelector('.buttonAmount');
        amount.textContent = cartArr[i].amount;
      }
    }

    //active button amount end--------------------------------------------------



    //Switch between buttons----------------------------------------------------

    function switchButton() {
      for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].amount === 0) {
          addToCartButtons[i].style.display = 'flex';
          activeButtons[i].style.display = 'none'
        } else {
          addToCartButtons[i].style.display = 'none';
          activeButtons[i].style.display = 'flex'
        }
      }
    }

    //Switch end----------------------------------------------------------------



    //Add dynamic updates to cart-items-----------------------------------------

    function updateCartItems() {
      for (let i = 0; i < cartArr.length; i++) {

        //Update amount
        let amount = cartItems[i].querySelector('.amount');
        amount.textContent = cartArr[i].amount

        //Update price
        let totalPrice = cartItems[i].querySelector('.totalPrice');
        totalPrice.textContent = '$' + cartArr[i].price * cartArr[i].amount
      }
    }
    //dynamic updates to cart-item end------------------------------------------



    //Switch between display and hide cartItems---------------------------------

    function switchCartItems() {
      for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].amount === 0) {
          cartItems[i].style.display = 'none'
        } else {
          cartItems[i].style.display = 'flex'
        }
      }
    }

    //Switch cartItems end------------------------------------------------------



    //Update heading------------------------------------------------------------

    function updateHeading() {
      let numberOfItems = 0;

      for (let i = 0; i < cartArr.length; i++) {
        numberOfItems += cartArr[i].amount;
      }
      totalItems.textContent = `(${numberOfItems})`;
      return numberOfItems
    }


    //Update heading end--------------------------------------------------------



    //Update order total--------------------------------------------------------

    function updateOrderTotal() {
      let price = 0;
      for (let i = 0; i < cartArr.length; i++) {
        price += cartArr[i].amount * cartArr[i].price;
      }
      orderTotal.textContent = `$${price}`;
    }

    //Update order total end----------------------------------------------------



    //Check if cart is empty----------------------------------------------------

    function checkIfEmpty() {
      let numberOfItems = updateHeading();
      if (numberOfItems === 0) {
        emptyCart.style.display = 'flex';
        cartFooter.style.display = 'none';
      } else {
        emptyCart.style.display = 'none';
        cartFooter.style.display = 'flex';
      }
    }

    //Check if empty end--------------------------------------------------------



    //Update Image styling------------------------------------------------------
    function updateImage() {
      for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].amount === 0) {
          desktopImages[i].style.border = 'none';
          mobileImages[i].style.border = 'none';
        } else {
          desktopImages[i].style.border = 'solid 2px hsl(14, 86%, 42%)';
          mobileImages[i].style.border = 'solid 2px hsl(14, 86%, 42%)'
        }
      }
    }
    //Image styling end---------------------------------------------------------

    //Styling functions end-----------------------------------------------------------------------------------



    //Handle order start--------------------------------------------------------------------------------------

    //Event Listener to open modal----------------------------------------------
    confirmOrder.addEventListener('click', () => {
      confirmModal.style.display = 'flex';
      createModal()
    });
    //Event Listener end--------------------------------------------------------



    //Function to create and append items based on cart-------------------------
    function createModal() {

      cartArr.forEach(product => {
        if (product.amount > 0) {
          let confirmedItem = renderConfirmedItem(product);
          confirmedContainer.appendChild(confirmedItem);
        }
      })
    }
    //Append items end----------------------------------------------------------



    //Function to render each item----------------------------------------------
    function renderConfirmedItem(product) {
      const name = product.name;
      const price = product.price;
      const amount = product.amount;
      const totalPrice = product.price * product.amount;
      const productClass = product.class
      const image = product.image.thumbnail

      let cartItem = document.createElement('div');
      cartItem.setAttribute('class', 'confirmItem');
      cartItem.classList.add(productClass);
      cartItem.innerHTML = `
      <img src="${image}" class="confirmImage">

      <div class="confirmCenter">
      <p class="confirmItemTitle">${name}</p>

        <div class="confirmItemPrices">
          <p class="confirmAmount">${amount}x</p>
          <p class="confirmPrice">@$${price}</p>
        </div>
      </div>
    <div class="cartItemRight" ${productClass}"><p class="totalPrice">$${totalPrice}</p></div>`;
      return cartItem
    }
    //Render end----------------------------------------------------------------


    //Eventlistener to POST-----------------------------------------------------
    sendButton.addEventListener('click', postOrder);

    //Function to post order----------------------------------------------------
    function postOrder() {

      let orderedCart = cartArr.filter((product) => product.amount > 0);
      sessionStorage.clear();


      fetch('http://localhost:3000/orders')
        .then(response => response.json())
        .then(result => {
          let id = result.length + 1

          const date = new Date().toISOString().split('T')[0];

          const body = {
            id: id,
            date: date,
            products: []
          }

          for (let i = 0; i < orderedCart.length; i++) {
            delete orderedCart[i].image;
            body.products.push(orderedCart[i])
          }

          const order = JSON.stringify(body);

          fetch('https://saga-k.github.io/Fm-online-store/data.json', {
            body: `${order}`,
            headers: { 'Content-type': 'application.json' },
            method: 'POST'
          })
            .then(response => response.json())
            .then(result => { console.log(result) })
        }
        )
    }
    //Post function end---------------------------------------------------------


    //Handle order end-----------------------------------------------------------------------------------------


  })//End of .then block
