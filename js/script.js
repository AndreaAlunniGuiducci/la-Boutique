const overlay = document.querySelector('.overlay');
const cart = document.querySelector('.cart');
const modal = document.querySelector('.modal');
const cartBtn = document.querySelector('.emojiCart');
const cartProductsNum = document.querySelector('.cartProductsNumber');
let totalCart = 0;
let userCart = [];
if (userCart.length !== 0) {
  let cartItems = JSON.parse(localStorage.getItem("userCart"));
  userCart = cartItems;
  cartItems = JSON.parse(localStorage.getItem("userCart"));
  modal.innerText = cartItems.join(`\n`) + `\n` + `Totale ${Math.round(100 * totalCart) / 100} €`;
}
cartProductsNum.innerText = `Numero prodotti: ${localStorage.getItem('totCartItems')}`;

// bottone carrello ---------------------------------------------------
cartBtn.addEventListener('click', () => {
  if (modal.style.display !== 'block') {
    modal.style.display = 'block';
    let cartItems = JSON.parse(localStorage.getItem("userCart"));
    modal.innerText = cartItems.join(`\n`) + `\n` + `Totale ${Math.round(100 * totalCart) / 100} €`;
  }
  else if (modal.style.display !== 'none') {
    modal.style.display = 'none';
  }
})

function createProduct(parent, imgUrl, productTitle, textPrice) {
  const products = document.createElement("div");
  products.className = "product";

  createImg(products, imgUrl, productTitle);
  createText(products, productTitle, textPrice);
  parent.appendChild(products);

  // aggiunta carrello -------------------------------------------------------------------
  products.addEventListener('click', () => {

    totalCart += textPrice;
    cart.innerText = `Totale carrello ${Math.round(100 * totalCart) / 100}€`;

    userCart.push(productTitle, `${textPrice} €`, `\n`);

    let cartItems = JSON.parse(localStorage.getItem("userCart"));
    modal.innerText = userCart.join(`\n`) + `\n` + `Totale ${Math.round(100 * totalCart) / 100} €`;

    localStorage.setItem('userCart', JSON.stringify(userCart));
    localStorage.setItem('totCartItems', `${userCart.length / 3}`);
    cartProductsNum.innerText = `Numero prodotti: ${localStorage.getItem('totCartItems')}`
    console.log(userCart)
  })
}


function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}

// fetch("https://fakestoreapi.com/products") // <== importare la lista prodotti in modo remoto
//   .then((response) => response.json())
//   .then((data) => {
//     products = data;
//     renderProducts();
//   });

const wrapperProducts = document.querySelector(".wrapper__products");

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price);
  });
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return renderProducts(data);
};

getProductsList();

// background hero dinamica -------------------------------------------
setInterval(() => {
  setTimeout(() => {
    overlay.style.backgroundImage = "url('https://media.istockphoto.com/photos/fits-perfect-picture-id938463764')"
  }, 3000);
  setTimeout(() => {
    overlay.style.backgroundImage = "url('https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80')"
  }, 6000);
  setTimeout(() => {
    overlay.style.backgroundImage = "url('https://images.unsplash.com/photo-1537832816519-689ad163238b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80')"
  }, 9000);
}, 9000)
