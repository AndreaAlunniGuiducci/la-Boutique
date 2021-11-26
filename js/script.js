const overlay = document.querySelector('.overlay');
const cart = document.querySelector('.cart');
const modal = document.querySelector('.modal');
const cartBtn = document.querySelector('.emojiCart');
const cartProductsNum = document.querySelector('.cartProductsNumber');
const deleteCart = document.querySelector('.deleteCart');
let totalCart = 0;
let userCart = [];
let productsList = [];

if (userCart.length !== 0) {
  let cartItems = JSON.parse(localStorage.getItem("userCart"));
  userCart = cartItems;
  cartItems = JSON.parse(localStorage.getItem("userCart"));
  modal.innerText = cartItems.join(`\n`) + `\n` + `Totale ${Math.round(100 * totalCart) / 100} €`;
}

// mostra numero prodotti e carrello al caricamento della pagina -------------------------------------------------------------------------------
cartProductsNum.innerText = `Numero prodotti: ${localStorage.getItem('totCartItems') || 0}`;

// funzione per mostrare i prodotti salvati nel carrello --------------------------------------------------------------------------
function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${localStorage.getItem("totCartItems")
    } `;
}
// bottone carrello ---------------------------------------------------
cartBtn.addEventListener('click', () => {
  if (modal.style.display !== 'block') {
    modal.style.display = 'block';
    setCartProductsNum();
  }
  else if (modal.style.display !== 'none') {
    modal.style.display = 'none';
  }
})

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const products = document.createElement("div");
  products.setAttribute("id", idProduct);
  products.className = "product";

  createImg(products, imgUrl, productTitle);
  createText(products, productTitle, textPrice);
  parent.appendChild(products);

  // aggiunta carrello -------------------------------------------------------------------
  products.addEventListener('click', (e) => {

    totalCart += textPrice;
    cart.innerText = `Totale carrello ${Math.round(100 * totalCart) / 100}€`;

    userCart.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      ));



    localStorage.setItem("totCartItems", parseInt(localStorage.getItem("totCartItems")) + 1);


    setCartProductsNum();
    let product = JSON.parse(localStorage.getItem('userCart')).join(`\n`);

    modal.innerText = product + `\n` + `Totale ${Math.round(100 * totalCart) / 100} €`;
    console.log(userCart);
    console.log(product[0]);

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
    createProduct(wrapperProducts, product.image, product.title, product.price, product.id);
  });
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;
  return renderProducts(data);
};

getProductsList();

deleteCart.addEventListener("click", () => {
  totalCart = 0;
  userCart.length = 0;
  localStorage.setItem("totCartItems", userCart.length);
  localStorage.setItem("userCart", 'Carrello Vuoto');
  setCartProductsNum();
});

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
