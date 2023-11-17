// PRODUCTS
const productsContainer = document.querySelector('.products-container');
const showMoreBtn = document.querySelector('.btn-load');
const categoriesContainer = document.querySelector('.categories');
const categoriesList = document.querySelectorAll('.category');


// CONTACT
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const opinionInput = document.getElementById('opinion');


// MENU / CARRITO

const menuBtn = document.querySelector('.menu-label');
const cartBtn = document.querySelector('.cart-label');
const barsMenu = document.querySelector('.navbar-list');
const cartMenu = document.querySelector('.cart');
const overlay = document.querySelector('.overlay');
const productsCart = document.querySelector('.cart-container');
const cartBubble = document.querySelector('.cart-bubble');
const cartTotal = document.querySelector('.total');
const buyBtn = document.querySelector('.btn-buy');
const deleteBtn = document.querySelector('.btn-delete');
const successModal = document.querySelector('.add-modal');



// LOGICA DE FORMULARIO

// Restaurar datos del localStorage si existen
const storedContacts = localStorage.getItem('storedContacts');
const storedContactsArray = storedContacts ? JSON.parse(storedContacts) : [];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

console.log('CARRITO ==> ', cart);

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}


// Funciones auxiliares
const isEmpty = (input) => {
    return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
};

const isEmailValid = (input) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(input.value.trim());
};

const showError = (input, msg) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.style.display = 'block';
    error.textContent = msg;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
};

// Funciones de validación
const checkTextInput = (input) => {
    const min = 3;
    const max = 25;

    if (isEmpty(input)) {
        showError(input, 'Este campo es obligatorio');
        return false;
    }

    if (!isBetween(input, min, max)) {
        showError(input, `Este campo debe tener entre ${min} y ${max} caracteres`);
        return false;
    }

    showSuccess(input);
    return true;
};

const checkEmail = (input) => {
    if (isEmpty(input)) {
        showError(input, 'Este campo es obligatorio');
        return false;
    }

    if (!isEmailValid(input)) {
        showError(input, 'El email no es válido');
        return false;
    }

    showSuccess(input);
    return true;
};

const checkOpinion = (input) => {
    const min = 3;
    const max = 25;

    if (isEmpty(input)) {
        showError(input, 'Este campo es obligatorio');
        return false;
    }

    if (!isBetween(input, min, max)) {
        showError(input, `Este campo debe tener entre ${min} y ${max} caracteres`);
        return false;
    }

    showSuccess(input);
    return true;
};

const resetForm = () => {
    nameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    opinionInput.value = '';
};

const saveToLocalStorage = (user) => {
    storedContactsArray.push(user);
    localStorage.setItem('storedContacts', JSON.stringify(storedContactsArray));
};

const validateForm = (e) => {
    e.preventDefault(); // Evitar recargas

    const isNameValid = checkTextInput(nameInput);
    const isLastNameValid = checkTextInput(lastNameInput);
    const isEmailValidValue = checkEmail(emailInput);
    const isOpinionValid = checkOpinion(opinionInput);

    const isValidForm =
        isNameValid &&
        isLastNameValid &&
        isEmailValidValue &&
        isOpinionValid;

    if (isValidForm) {
        const user = {
            name: nameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            opinion: opinionInput.value
        };

        saveToLocalStorage(user);
        resetForm();
        console.log(`El usuario:${user.name} email: ${user.email} Relizo este comentario: ${user.opinion}`); // Imprimir el comentario en la consola
        alert(`¡${user.name}, tu comentario ha sido enviado con éxito!`);
    }
};


    // LOGICA DE PRODUCTOS

    // =======RENDER PRODUCTS========
const createProductTemplate = (product) => {
    const {id, name, bid, category, cardImg} = product;
    return  `
        <div class="product">
            <img src="${cardImg}" alt="${name}"/>
            <div class="product-info">
                <div class="product-top">
                    <h3>${name}</h3>
                </div>
                <div class="product-mid">
                    <span>$${bid}</span>
                </div>
                <div class="product-bot">
                    <button 
                        class="btn-add"
                        data-id="${id}"
                        data-name="${name}"
                        data-bid="${bid}"
                        data-img="${cardImg}"
                        data-category="${category}"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `;
};

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
        .map(createProductTemplate)
        .join('');
};

    // =========VER MAS==========
const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    const { products, currentProductsIndex, productsLimit} = appState;
    renderProducts(products[currentProductsIndex]);
    if(currentProductsIndex === productsLimit - 1){
        showMoreBtn.classList.add('hidden')
    }


}

    //========LOGICA DE FILTROS=======

const isIniactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") && 
        !element.classList.contains('active')
    );
};

const changeBtnActiveState = (filter) => {
  const categories = [...categoriesList];
  categories.forEach((btn) => {
    if(btn.dataset.category !== filter) {
      btn.classList.remove('active');
      return;
    }
    btn.classList.add('active');
  })
}

const setShowMoreVisibility = () => {
  if(!appState.activeFilter) {
    showMoreBtn.classList.remove('hidden');
    return;
  }
  showMoreBtn.classList.add('hidden');
}

const changeFilterState = (element) => {
  appState.activeFilter = element.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility();
}

const renderFilteredProducts = () => {
  const { activeFilter, currentProductsIndex, products } = appState
  productsContainer.innerHTML = '';
  if(!activeFilter) {
    appState.currentProductsIndex = 0;
    renderProducts(products[currentProductsIndex]);
    return;
  }
  const filteredProducts = productsData.filter(
    (product) => product.category === activeFilter
  );
  renderProducts(filteredProducts);
}

const apllyFilter = ({ target }) => {
  if(!isIniactiveFilterBtn(target)) return;
  changeFilterState(target);
  renderFilteredProducts();
}
 


// LOGICA DE MENU
const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu');
    if(cartMenu.classList.contains('open-cart')){
      cartMenu.classList.remove('open-cart');
      return;
    }
    overlay.classList.toggle('show-overlay');
}
  
  const toggleCart = () => {
    cartMenu.classList.toggle('open-cart');
    if(barsMenu.classList.contains('open-menu')){
      barsMenu.classList.remove('open-menu');
      return;
    }
        overlay.classList.toggle('show-overlay');
}

  const closeOnOverlayClick = () => {
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
}
  const closeOnClick = (e) => {
    if(!e.target.classList.contains('navbar-link')) return;
    barsMenu.classList.remove('open-menu');
    overlay.classList.remove('show-overlay');
}

  const closeOnScroll = () => {
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
}

// LOGICA DEL CARRITO

const renderCart = () => {
    if(!cart.length){
      productsCart.innerHTML = `<p class='empty-msg'> No hay productos en el carrito. </p>`
      return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join('');
}
  
const createCartProductTemplate = (e, i) => {
    const { id, name, bid, img, quantity } = e
    return `<div class="cart-item">
              <img src=${img} alt="IMG PRODUCTO" />
              <div class="item-info">
                <h3 class="item-title">${name}</h3>
                <p class="item-bid">Precio</p>
                <span class="item-price">$${bid}</span>
              </div>
              <div class="item-handler">
                <span class="quantity-handler down" data-id=${id}>-</span>
                <span class="item-quantity">${quantity}</span>
                <span class="quantity-handler up" data-id=${id}>+</span>
              </div>
            </div>`;
}
  
const createProductData = (product) => {
    const { bid, id, name, img } = product
    return { bid, id, name, img }
}
  
const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => {
      return cartProduct.id === product.id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct
    })
}
  
const isExistingCartProduct = (product) => {
    return cart.some((item) => item.id === product.id);
}
  
const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }]
}
  
  
  const addProduct = (e) => {
    if(!e.target.classList.contains('btn-add')) return;
    console.log(e.target.dataset);
    const product = createProductData(e.target.dataset);
  
    if(isExistingCartProduct(product)){
      addUnitToProduct(product);
      showSuccessModal('Se agregó una unidad del producto al carrito');
    } else {
      createCartProduct(product);
      showSuccessModal('El producto se ha agregado al carrito');
    }
    updateCartState();
  }

const renderCartBubble = () =>{
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0)
}

const showCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0)
}

const showCartTotal = () => {
    const total = cart.reduce((acc, cur) => 
    acc + Number(cur.bid) * cur.quantity, 0);
    cartTotal.textContent = `$${total}`
}


const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
    renderCartBubble();
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
}
const handleQuantity = (e) =>{
    if(e.target.classList.contains('down')){
        handleMinusBtnEvent(e.target.dataset.id)
    }else if(e.target.classList.contains('up')){
        handlePlusBtnEvent(e.target.dataset.id)
    }
    updateCartState();
}
const handleMinusBtnEvent = (id) => {
    const ExistingCartProduct = cart.find((item) => item.id === id);
    if(ExistingCartProduct.quantity === 1){
        removeProductFromCart(ExistingCartProduct);
        return;
    }
    substractProductUnit(ExistingCartProduct);

}
const removeProductFromCart = (product) => {
    cart = cart.filter((prod) => prod.id !== product.id);
}


const substractProductUnit = (product) => {
    cart = cart.map((prod) => {
    return prod.id === product.id
    ? {...prod, quantity: Number(product.quantity) - 1}
    : prod;   
    })
}



const handlePlusBtnEvent = (id) => {
    const ExistingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(ExistingCartProduct);

}

const deleteCart = () => {
    if(window.confirm('Estás seguro que queres vaciar el carrito?')) {
      resetCartItems();
      alert('tu carrito está vacío')
    }
  }

const resetCartItems = () => {
    cart = [];
    updateCartState();
}

const completeBuy = () => {
    if(window.confirm('¿Quieres finalizar su compra?')){
        resetCartItems();
        alert('Gracias por su compra!')
    }
}


const disableBtn = (btn) => {
    if(cart.length) {
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
  }


const showSuccessModal = (msg) => {
    successModal.classList.add('active-modal');
    successModal.textContent = msg;
    setTimeout(() => {
      successModal.classList.remove('active-modal');
    }, 3000);
  }

const init = () => {

    //FORM
    contactForm.addEventListener('submit', validateForm);
    nameInput.addEventListener('input', () => checkTextInput(nameInput));
    lastNameInput.addEventListener('input', () => checkTextInput(lastNameInput));
    emailInput.addEventListener('input', () => checkEmail(emailInput));
    opinionInput.addEventListener('input', () => checkOpinion(opinionInput));


    //CATEGORIES
    renderProducts(appState.products[appState.currentProductsIndex]);
    showMoreBtn.addEventListener('click', showMoreProducts);
    categoriesContainer.addEventListener('click', apllyFilter);

    // Menu / carrito
    menuBtn.addEventListener('click', toggleMenu);
    cartBtn.addEventListener('click', toggleCart);
    barsMenu.addEventListener('click', closeOnClick);
    overlay.addEventListener('click', closeOnOverlayClick);
    window.addEventListener('scroll', closeOnScroll);
    window.addEventListener('DOMContentLoaded', renderCart);
    window.addEventListener('DOMContentLoaded', showCartBubble);
    window.addEventListener('DOMContentLoaded', showCartTotal);
    productsContainer.addEventListener('click', addProduct);
    productsCart.addEventListener('click', handleQuantity);
    buyBtn.addEventListener('click', completeBuy);
    deleteBtn.addEventListener('click', deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);









};

init();



