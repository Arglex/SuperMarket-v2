function popAlert() {
    alert("Due to the coranavirus pandemic the SupuerMarket is closed and products can only be ordered online.");
  }


 //-----------------------------------------Cart----------------------------------------------------------------

 let carts = document.querySelectorAll('.add-cart');

 let products = [
    {
        name: "Hamburger",
        price: 5.00,
        inCart: 0
    },
    {
        name: "Kebab",
        price: 4.00,
        inCart: 0
    },   
    {
        name: "Bread",
        price: 2.00,
        inCart: 0
    },
    {
        name: "Tuna Can",
        price: 1.00,
        inCart: 0
    },
    {
        name: "Grill Nachos",
        price: 2.00,
        inCart: 0
    }
 
 ];

 for (let i=0; i < carts.length; i++) {
     carts[i].addEventListener('click', () => {
         alert("Your item as been added to the cart!")
         cartNumbers(products[i]);
         totalCost(products[i])
     })
 }

 function cartNumbers(product) {
     let productNumbers = localStorage.getItem('cartNumbers');
     productNumbers = parseInt(productNumbers);

     if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
     } else {
        localStorage.setItem('cartNumbers', 1);
     }
     setItems(product)
 }

 function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]:product
            }
        }
        cartItems[product.name].inCart +=1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem("productsInCart",  JSON.stringify(cartItems));
 }

 function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
 

    if (cartCost != null) {
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
    localStorage.setItem("totalCost", product.price);
    }
 }

 function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    console.log(cartItems);
    let cartCost = localStorage.getItem("totalCost");

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img class="img-resize" src="./images/${item.name}.jpg">
            <span class="itemName">${item.name}</span>
            </div>
            <div class="productPrice">$${item.price}.00</div>
            <div class="productQuantity">
                <ion-icon name="arrow-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="totalPrice">
                $${item.inCart * item.price}.00
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTittle">
                    BasketTotal: 
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}.00
                </h4>
            </div>
            <button class="clrBasket" onclick="deleteItems()">Clear Basket</button>
 
        `
        
    }
 }
 function deleteItems() {
    localStorage.clear();
    location.reload(true);
  }
 displayCart();