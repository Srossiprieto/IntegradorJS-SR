const loginForm = document.getElementById('login--form');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const errorMessage = document.getElementById('form__error');

const users = JSON.parse(localStorage.getItem('users')) || [];

const saveToSessionStorage = (user) => {
  sessionStorage.setItem('activeUser', JSON.stringify(user));
}

const activeUser = JSON.parse(sessionStorage.getItem('activeUser'));

console.log('users ==> ',  users);
console.log(activeUser);

const isEmpty = (input) => {
  return !input.value.trim().length;
}

const isEmailValid = (input) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(input.value.trim());
}

const showError = (msg) => {
  errorMessage.textContent = msg
}

const isExistingEmail = (input) => {
  return users.some(user => user.email === input.value.trim());
}
const isMatchingPassword = (input) => {
  const user = users.find(user => user.email === emailInput.value.trim());
  return user.password  === input.value.trim();
}

const isValidAccount = () => {
  if(!isExistingEmail(emailInput)){
    showError('El usuario no existe');
    return false;
  }
  if(!isMatchingPassword(passwordInput)){
    showError('Los datos ingresados son incorrectos');
    loginForm.reset();
    return false;
  }

  alert('Ya estas en linea');
  errorMessage.textContent = '';
  // loginForm.reset();
  return true;
}

const login = (e) => {
  e.preventDefault();
  if(isValidAccount()){
    const user = users.find(user => {
      return user.email === emailInput.value.trim()
    });
    saveToSessionStorage(user);
    window.location.href = '/pages/home.html'
  }
}

const logoutButton = document.getElementById('logoutButton');

const logout = () => {
  // Elimina el usuario activo de sessionStorage
  sessionStorage.removeItem('activeUser');
  // Redirige al usuario a la página de inicio de sesión
  window.location.href = '/index.html'; // Reemplaza 'index.html' con la URL correcta de tu página de inicio de sesión
};




const init = () => {
    loginForm.addEventListener('submit', login);
    logoutButton.addEventListener('click', logout);


  if (activeUser) {
    window.location.href = '/pages/home.html'; // Redirige a la página de inicio si hay una sesión activa
  }
};

init();


