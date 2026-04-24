/* script.js */

/* Sample products */
const products = [
  {id:1, name:"Hydrating Face Cream", price:25, category:"Skincare", brand:"GlowBeauty", image:"data:image/png;base64,iVBORw0KGgoAAAANS..."},
  {id:2, name:"Vitamin C Serum", price:30, category:"Skincare", brand:"PureSkin", image:"data:image/png;base64,iVBORw0KGgoAAAANS..."},
  {id:3, name:"Matte Lipstick", price:15, category:"Makeup", brand:"LuxeCos", image:"data:image/png;base64,iVBORw0KGgoAAAANS..."},
  {id:4, name:"Eyeliner Pen", price:12, category:"Makeup", brand:"GlowBeauty", image:"data:image/png;base64,iVBORw0KGgoAAAANS..."},
  {id:5, name:"Night Repair Cream", price:28, category:"Skincare", brand:"PureSkin", image:"data:image/png;base64,iVBORw0KGgoAAAANS..."},
  {id:6, name:"Face Mask Set", price:20, category:"Skincare", brand:"LuxeCos", image:"data:image/png;base64,iVBORw0KGgoAAAANS..."},
];

/* CART */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter();
}

function addToCart(id, quantity=1){
  const product = products.find(p=>p.id===id);
  const cartItem = cart.find(item=>item.id===id);
  if(cartItem){
    cartItem.quantity += quantity;
  } else {
    cart.push({...product, quantity});
  }
  saveCart();
  alert(`${product.name} added to cart`);
}

function removeFromCart(id){
  cart = cart.filter(item=>item.id!==id);
  saveCart();
}

function updateCartCounter(){
  const counter = document.getElementById('cart-counter');
  if(counter) counter.textContent = cart.reduce((sum,i)=>sum+i.quantity,0);
}

/* Filters */
function filterProducts({category, brand, minPrice, maxPrice}={}){
  let filtered = [...products];
  if(category) filtered = filtered.filter(p=>p.category===category);
  if(brand) filtered = filtered.filter(p=>p.brand===brand);
  if(minPrice!==undefined) filtered = filtered.filter(p=>p.price>=minPrice);
  if(maxPrice!==undefined) filtered = filtered.filter(p=>p.price<=maxPrice);
  return filtered;
}

/* Checkout */
function checkoutFormSubmit(event){
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if(!name || !email || !address || !phone){
    alert('Please fill all required fields');
    return;
  }
  alert('Order Placed Successfully');
  cart = [];
  saveCart();
  window.location.href = 'index.html';
}

/* Cookie Banner */
window.addEventListener('load', ()=>{
  updateCartCounter();
  if(!localStorage.getItem('cookieConsent')){
    const banner = document.createElement('div');
    banner.id='cookie-banner';
    banner.style.cssText="position:fixed;bottom:0;width:100%;background:#ffe4e1;padding:15px;text-align:center;z-index:1000;";
    banner.innerHTML=`We use cookies to improve experience. <button id="accept-cookie">Accept</button>`;
    document.body.appendChild(banner);
    document.getElementById('accept-cookie').onclick = ()=>{
      localStorage.setItem('cookieConsent','true');
      banner.remove();
    }
  }
});