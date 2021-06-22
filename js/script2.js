let pageItem = document.querySelectorAll('.page__item');

let dataLocalStorage = localStorage.getItem("data");
dataLocalStorage = JSON.parse(dataLocalStorage);

console.log(dataLocalStorage);

getLocalStorage();

function getLocalStorage(){
	for(let i = 0; i < dataLocalStorage.length; i++){
		pageItem[i].textContent = dataLocalStorage[i];
	}
}


