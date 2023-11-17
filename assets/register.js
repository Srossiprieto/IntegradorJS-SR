const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');


// Obtiene los usuarios del almacenamiento local y, si no hay ningún dato, inicializa 'users' como un array vacío.
const users = JSON.parse(localStorage.getItem('users')) || [];

const saveLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users))
}

console.log('users ==>', users)

// Funciones auxiliares 

const isEmpty = (input) => {
    return !input.value.trim().length;
}


const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
}
 

// email
// regex = regular phrase (re).

const isEmailValid = (input) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(input.value.trim());
}

const isExistingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim());
}

// password 
const isPasswordSecure = (input) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(input.value.trim());
}

// phone
const isPhoneValid = (input) => {
    const re = /^\d{7,15}$/;
    return re.test(input.value.trim());
}

// error
const showError = (input, msg) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.style.display = 'block';
    error.textContent = msg;
}
// valido
const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
}

// Funciones validacion  

const checkTextInput = (input) => {
    // Que no este vacio
    // Que contenga entre 3 y 25 caracteres

    const min = 3;
    const max = 25;

    if(isEmpty(input)){
        showError(input, 'Este campo es obligatorio');
        return false;
    }


    if(!isBetween(input, min, max)){
        showError(input,
            `Este campo debe tener entre ${min} y ${max} caracteres`
            );        
        return false;

    }

    showSuccess(input)
    return true;

}

const checkEmail = (input) => {
    if(isEmpty(input)){
        showError(input, 'Este campo es obligatorio');
        return false;
    }

    if(!isEmailValid(input)){
        showError(input, 'El email no es valido');
        return false;
    }
    if(isExistingEmail(input)){
        showError(input, 'El email ya tiene una cuenta vinculada');
        return false;
    }
    
    
    showSuccess(input)
    return true


}

const checkPassword = (input) => {

    if(isEmpty(input)){
      showError(input, "Este campo es obligatorio");
      return false;
    }
  
    if(!isPasswordSecure(input)){
      showError(input,
        `La contraseña debe tener al menor 8 caracteres, una mayúscula, una minuscula y un número`
      )
      return false;
    }
  
    showSuccess(input);
    return true;
}

const checkPhone = (input) => {

    if(isEmpty(input)){
      showError(input, "Este campo es obligatorio");
      return false;
    }
  
    if(!isPhoneValid(input)){
      showError(input,
        `El teléfono no es valido (7-15 números)`
      )
      return false;
    }
  
    showSuccess(input);
    return true;
}




const validateForm = (e) => {
    e.preventDefault(); //Evito recargas
    
    // Validar que los inputs sean validos
    
    const isNameValid = checkTextInput(nameInput)
    const isLastNameValid = checkTextInput(lastNameInput)
    const isEmailValid = checkEmail(emailInput);
    const isPasswordValid = checkPassword(passwordInput);
    const isPhoneValid = checkPhone(phoneInput)
    
    const isValidForm =
    isNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPhoneValid;
    // Si son validos guardo en el LS
    if(isValidForm){
        const user = {
            name: nameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            phone: phoneInput.value
        }
        users.push(user)
        saveLocalStorage(users);
        alert(`Te has registrado con éxito, bienvenido ${user.name}`)
    }
    
    
    
    // Enviarlo a la pag login
    window.location.href = '/pages/login.html';

    
}



const init = () => {
    registerForm.addEventListener('submit', validateForm);
    // validate in real time
    nameInput.addEventListener('input', () => checkTextInput(nameInput));
    lastNameInput.addEventListener('input', () => checkTextInput(lastNameInput));
    emailInput.addEventListener('input', () => checkEmail(emailInput));
    passwordInput.addEventListener('input', () => checkPassword(passwordInput));
    phoneInput.addEventListener('input', () => checkPhone(phoneInput));
    
}


init();




















