import Validator from './strategy.js';

const options = {
    firstName: 'isNotNullOrEmpty',
    lastName: 'isNotNullOrEmpty',
    age: 'isNumber',
};

const validator = new Validator(options);

let form = document.getElementsByTagName('form')[0],
    title = document.getElementById('title'),
    firstName = document.getElementById('firstName'),
    lastName = document.getElementById('lastName'),
    age = document.getElementById('age'),
    errorMessagesContainer = document.getElementsByClassName(
        'errorMessages'
    )[0];

form && form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    const data = {
        title: title.value,
        firstName: firstName.value,
        lastName: lastName.value,
        age: age.value,
    };

    const isValid = validator.validate(data);

    if (!isValid) {
        displayErrorMessages(validator.errorMessages);
        e.preventDefault();
    }
}

function displayErrorMessages(errorMessages) {
    if (!errorMessages || !errorMessages.length) {
        return;
    }

    let errorList = document.createElement('ul');
    errorMessages.forEach((errorMessage) => {
        let errorItem = document.createElement('li');
        errorItem.textContent = errorMessage;
        errorList.appendChild(errorItem);
    });

    errorMessagesContainer.textContent = '';
    errorMessagesContainer.appendChild(errorList);
    errorMessagesContainer.classList.remove('errorMessages--no-error');
}
