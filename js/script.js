let name = document.querySelector('.form-name');
let email = document.querySelector('.form-email');
let phone = document.querySelector('.form-phone');
let address = document.querySelector('.form-address');
let city = document.querySelector('.form-city');
let state = document.querySelector('.form-state');
let zip = document.querySelector('.form-zip');

let nameVal;
let emailVal;
let phoneVal;
let addressVal;
let cityVal;
let stateVal;
let zipVal;

let numMessage = 0;

let inputsItem = document.querySelectorAll('.form__info-block input');

let textError = document.querySelectorAll('.text-error');

let formInfo = document.querySelector('#form-info');
let formPreferences = document.querySelector('#form-preferences');

let formStep = document.querySelector('.form__step');

let formSteps = document.querySelectorAll('.form__step input');
let formStepsLabel = document.querySelectorAll('.form__step label');

let block = document.querySelector('.form__forms');

let btnNext = document.querySelector('.btn-next');
let btnSign = document.querySelector('.btn-sign');

let dataLocalStorage = [];

formStepsLabel[0].classList.add('active');
formStep.addEventListener('click', activeInputStep);

btnSign.addEventListener('click', stepTwo);

btnNext.addEventListener('click', () => {
	validateForm();
});

function validateForm(){
	numMessage = 0

	let numbers = /[0-9]/g;
	let letter = /[a-z]/g;
	let upperCaseLetters = /[A-Z]/g;

	nameVal = name.value.trim();
	emailVal = email.value.trim();
	phoneVal = phone.value.trim();
	addressVal = address.value.trim();
	cityVal = city.value.trim();
	stateVal = state.value.trim();
	zipVal = zip.value.trim();

	// Name
	if(nameVal == '' || nameVal.length < 3){
		formFalse(name, "Name cannot be blank");
		return false
	} else {
		formTrue(name);
	}

	// Email
	if (emailVal == ''){
		formFalse(email, "Email cannot be blank");
		return false
	} else if (!validateEmail(emailVal)) {
		formFalse(email, "Email is not valid"); //
		return false
	} else{
		formTrue(email);
	}

	// Phone
	if(phoneVal == '' || !phoneVal.match(numbers)){
		formFalse(phone, "Phone cannot be blank");
		return false
	} else if (phoneVal.match(letter)) {
		formFalse(phone, "Phone is not has letters");
		return false
	} else if (phoneVal.length != 12 ) {
		formFalse(phone, "Ukrainian phone has 12 numeric");
		return false
	} else {
		formTrue(phone);
	}

	// Address
	if(addressVal == '' || addressVal.length < 3){
		formFalse(address, "Address cannot be blank");
		return false
	} else {
		formTrue(address);
	}

	// City
	if(cityVal == '' || cityVal < 3){
		formFalse(city, "Enter your city");
		return false
	} else {
		formTrue(city);
	}

	// State
	if(stateVal == '' || stateVal < 3){
		formFalse(state, "Enter your city");
		return false
	} else {
		formTrue(state);
	}

	// Zip
	if(zipVal == '' || zipVal.length != 5){
		formFalse(zip, "Zip cannot be blank");
		return false
	} else if (zipVal.match(letter)) {
		formFalse(zip, "Zip is not has letters");
		return false
	} else {
		formTrue(zip);
	}

	setLocalStorageOneStep();

	positionBlock(1, 0, '-100%');
}

function setLocalStorageOneStep(){
	for(let i = 0; i < inputsItem.length; i++){
		dataLocalStorage.push(inputsItem[i].value);
	}
}

function getLocalStorageStepTwo(){
	localStorage.setItem("data", JSON.stringify(dataLocalStorage));
}

function activeInputStep(){
	for(let i = 0; i < formSteps.length; i++){
		if(formSteps[0].checked){
			positionBlock(0, 1, '0px');
		} else if (formSteps[1].checked){
			if (validateForm() == true){
				positionBlock(1, 0, '-100%');
			}
		}
	}
}

let allergies = document.querySelector('.form__allergies');
let frequency = document.querySelectorAll('.form__frequency-item label input');
let frequencyVal = document.querySelectorAll('.form__frequency-item label span')
let packageSize = document.querySelectorAll('.form__package-size-item label input');
let packageSizeVal = document.querySelectorAll('.form__package-size-item label span');

let allergiesVal;

function stepTwo(){
	numMessage = inputsItem.length;

	allergiesVal = allergies.value.trim();

	// food allergies
	if(allergiesVal == ''){
		dataLocalStorage.push('none');
		numMessage++;
	} else {
		dataLocalStorage.push(allergiesVal);
		numMessage++;
	}

	// Frequency
	for(let i = 0; i < frequency.length; i++){
		if(frequency[i].checked){
			dataLocalStorage.push(frequencyVal[i].textContent);
			textError[numMessage].textContent = "";
			numMessage++;
		}
	}

	// Package Size
	for(let i = 0; i < packageSize.length; i++){
		if(packageSize[i].checked){
			dataLocalStorage.push(packageSizeVal[i].textContent);
			textError[numMessage].textContent = "";
			numMessage++;
		}
	}

	getLocalStorageStepTwo();

	location.replace('index2.html');
}

function positionBlock(stepTrue, stepFalse, position){
	formStepsLabel[stepTrue].classList.add('active');
	formStepsLabel[stepFalse].classList.remove('active');
	block.style.marginLeft = position;
}

function formFalse(input, message){
	input.classList.add('error');
	textError[numMessage].textContent = message;
}
function formTrue(input){
	input.classList.remove('error');
	textError[numMessage].textContent = '';
	numMessage++;
}

function validateEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}





