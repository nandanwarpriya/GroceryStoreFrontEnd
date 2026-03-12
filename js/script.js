let searchForm = document.querySelector('.search-form');
let  shoppingCart= document.querySelector('.shopping-cart');
let  loginForm= document.querySelector('.login-form');
let  navbar= document.querySelector('.navbar');
const searchInput = document.querySelector("#search-box");

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    searchInput.focus();
}

document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll=()=>{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
      loop:true,
      spaceBetween: 20,
      autoplay:{
        delay:7500,
        disableOnInteraction:false,
      },
      centeredSlides:true,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
        },
        1020: {
          slidesPerView: 3,
        },
      },
    });

var swiper = new Swiper(".review-slider", {
      loop:true,
      spaceBetween: 20,
      autoplay:{
        delay:7500,
        disableOnInteraction:false,
      },
      centeredSlides:true,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
        },
        1020: {
          slidesPerView: 3,
        },
      },
    });
    const cartCount = document.querySelector(".cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartContainer = document.querySelector(".cart-items");
    const totalDisplay = document.querySelector(".total");

    //ADD TO CART BUTTON CLICK
    document.querySelectorAll(".add-to-cart").forEach(btn =>{
      btn.addEventListener("click", e => {
        e.preventDefault();

        const box = btn.closest(".box");

        const name = box.querySelector("h3").innerText;
        const priceText = box.querySelector(".price").innerText;
        const price = parseFloat(priceText.replace("$",""));
        const img = box.querySelector("img").src;

        const existing = cart.find(item => item.name === name);

        if(existing){
          existing.qty += 1;
        } else {
          cart.push({name,price,img,qty:1});
        }
        saveCart();
        renderCart();
        updateCartCount();
      });
    });

    //UPDATE CART COUNT
    
      function updateCartCount(){
        let count=0;
        cart.forEach(item => count += item.qty);
        cartCount.innerText = count;
      }

    //RENDER CART
    function renderCart(){
      //shows message on empty cart
      if (cart.length === 0){
        cartContainer.innerHTML = "<p>Your Cart is empty</p>";
        totalDisplay.innerText = "Total: $0";
        updateCartCount();
        return;
      }
      let html="";
      let total=0;
      cart.forEach((item,index)=>{
        total += item.price * item.qty;

        html += `
        <div class="box">
          <i class="fas fa-trash" data-index="${index}"></i>
          <img src="${item.img}"/>
          <div class="content">
            <h3>${item.name}</h3>
            <span class="price">$${item.price}</span>
            
            <div class="quantity">
              <button class="minus" data-index="${index}">-</button>
              <span>${item.qty}</span>
              <button class="plus" data-index="${index}">+</button>
            </div>
          </div>        
        </div>
        `;
      });
      cartContainer.innerHTML = html;

      totalDisplay.innerText = "total: $"+ total.toFixed(2);
      updateCartCount();

      //DELETE ITEM
      document.querySelectorAll(".fa-trash").forEach(icon =>{
        icon.addEventListener("click",() =>{
          const index = icon.dataset.index;
          cart.splice(index,1);
          saveCart();
          renderCart();
        });
      });

    //  INCREASE QTY
    document.querySelectorAll(".plus").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const index = btn.dataset.index;
        cart[index].qty +=1;
        saveCart();
        renderCart();
      });
    });

    //DECREASE QTY
    document.querySelectorAll(".minus").forEach(btn=>{
      btn.addEventListener("click",()=>{
        const index = btn.dataset.index;

        if(cart[index].qty > 1){
          cart[index].qty -= 1;
        }else{
          cart.splice(index,1); //remove-item splice(startIndex,deleteCount)
        }
        saveCart();
        renderCart();
      });
    });
  } //render cart completed

    //SAVE TO LOCAL STORAGE
    function saveCart(){
      localStorage.setItem("cart",JSON.stringify(cart));
    }

    //LOAD CART ON PAGE LOAD
    renderCart();
    updateCartCount();

    //PRODUCT SEARCH FEATURE
    const noResults = document.querySelector("#no-results");

    //logic to prevent form submit event after pressing enter key from search input box
    searchForm.addEventListener("submit",function(e){
        e.preventDefault();
      });

      searchInput.addEventListener("keydown",function(e){
        if(e.key === "Enter"){
          e.preventDefault();
        }
      });
      
    searchInput.addEventListener("keyup",function(){
      let filter = searchInput.value.toLowerCase();

      //select all product slides from every product slider
      let products = document.querySelectorAll(".product-slider .swiper-slide");
      let found = false;

      products.forEach(slide => {
        let name = slide.querySelector("h3").textContent.toLowerCase();

        if(name.includes(filter)){
          slide.style.display="";
          found=true;
        }else{
          slide.style.display = "none";
        }
      });

      if(found){
        noResults.style.display ="none";
      }else{
        noResults.style.display="block";
      }

     
    });

    

