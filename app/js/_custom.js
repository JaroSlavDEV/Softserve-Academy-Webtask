const body = document.querySelector('body');
const fields = document.querySelectorAll('input, textarea');

const burgerButton = document.querySelector('.burger-menu');

const fieldNewNameFans = document.querySelector('.fans__new-appeal_form-name');
const fieldNewTextFans = document.querySelector('.fans__new-appeal_form-text');
const formAddNewAppealFans = document.querySelector('.fans__new-appeal_form');
const containerRecordsFans = document.querySelector('.fans__container');
const snackbarNewAppealSuccess = document.querySelector('.snackbar__new-appeal_success');

const fieldNewImageAdmin = document.querySelector('.admin__new-news_form-image');
const fieldNewTitleAdmin = document.querySelector('.admin__new-news_form-title');
const fieldNewTextAdmin = document.querySelector('.admin__new-news_form-text');
const formAddNewNewsAdmin = document.querySelector('.admin__new-news_form');
const containerRecordsNews = document.querySelector('.news__container');
const containerNewImageAdmin = document.querySelector('.admin__new-news_container-image');
const snackbarNewNewsSuccess = document.querySelector('.snackbar__new-news_success');

// Check for network access
const isOnline = () => window.navigator.onLine;

// Check if we should use local storage or IndexedDB
const useLocalStorage = false;

document.addEventListener("DOMContentLoaded", function () {
	// Mobile - toggle menu
	burgerButton.addEventListener('click', toggleMobileMenu);

	// Admin - change image
	fieldNewImageAdmin && fieldNewImageAdmin.addEventListener('change', changeNewImageAdmin);

	// Fans - add new appeal
	formAddNewAppealFans && formAddNewAppealFans.addEventListener('submit', addNewAppeal);

	// Admin - add new news
	formAddNewNewsAdmin && formAddNewNewsAdmin.addEventListener('submit', addNewNews)

	// Document deligation
	document.addEventListener('click', documentDeligation);

	// Fields validation
	fields.forEach(item => item.addEventListener('input', fieldValidationSuccess));
	fields.forEach(item => item.addEventListener('invalid', fieldValidationFailure));

	// Change network access
	window.addEventListener('online', changeNetworkToOnline);

	// Network access 'online'
	if(isOnline()) {
		// Send info to server
		changeNetworkToOnline();
	} else {
		// Get appeals and news on load page
		containerRecordsFans && getAppeals();
		containerRecordsNews && getNews();
	}
});

// Admin - change image
const changeNewImageAdmin = (event) => {
	const file = event.target.files[0];

	if (file && file['type'].split('/')[0] !== 'image') {
		containerNewImageAdmin.src = '';
		return 0;
	}

	containerNewImageAdmin.src = URL.createObjectURL(file);
};

// Mobile - toggle menu
const toggleMobileMenu = () => {
	body.classList.toggle('mobile-menu__open');
};

// Class for indexedDb
class IndexedDB {
	constructor(nameDB, storesDB) {
		this.nameDB = nameDB;
		this.storesDB = storesDB;
	}

	async init() {
		try {
			this.db = await idb.open(this.nameDB, 1, upgradeDB => {
				this.storesDB.forEach(store => {
					if (!upgradeDB.objectStoreNames.contains(store)) {
						upgradeDB.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
					}
				});
			});

		} catch (e) {
			console.log("Error", e);
		}
	}

	getStore(name) {
		try {
			const transaction = this.db.transaction(name);
			const store = transaction.objectStore(name);
			const result = store.getAll();

			return result;

		} catch (e) {
			console.log("Error", e);
		}
	}

	addItemToStore(name, item) {
		try {
			const transaction = this.db.transaction(name, 'readwrite');
			const store = transaction.objectStore(name);
			store.add(item);

		} catch (e) {
			console.log("Error", e);
		}
	}

	clearStore(name) {
		try {
			const transaction = this.db.transaction(name, 'readwrite');
			const store = transaction.objectStore(name);
			store.clear();

		} catch (e) {
			console.log("Error", e);
		}
	}
}

// Create database in indexedDb
const database = new IndexedDB('FCBarcelonaDB', ['appeals', 'news']);

// Api REST for interaction client and server
const api = function () {
	// const url = 'http://localhost:3012/api';
	const url = 'https://fathomless-meadow-46405.herokuapp.com/api';
	let response;

	const getAppeals = async function () {
		response = await fetch(`${url}/appeals`);

		return await response.json();
	}

	const postAppeal = async function (body) {
		response = await fetch(`${url}/appeals`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(body)
		});

		return await response.json();
	}

	const getNews = async function () {
		response = await fetch(`${url}/news`);

		return await response.json();
	}

	const postNew = async function (body) {
		response = await fetch(`${url}/news`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(body)
		});

		return await response.json();
	}

	return {
		getAppeals,
		postAppeal,
		getNews,
		postNew
	}
}

// Change network from offline to online
const changeNetworkToOnline = async () => {
	let appeals, news;

	if (useLocalStorage) {
		appeals = JSON.parse(localStorage.getItem('appeals')) || [];
		news = JSON.parse(localStorage.getItem('news')) || [];

	} else {
		await database.init();
		appeals = await database.getStore('appeals');
		news = await database.getStore('news');
	}

	appeals.length && await fetch('http://localhost:3012/api/appeals', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify(appeals)
	});

	news.length && await fetch('http://localhost:3012/api/news', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify(news)
	});

	if (useLocalStorage) {
		localStorage.removeItem('appeals');
		localStorage.removeItem('news');

	} else {
		await database.init();
		await database.clearStore('appeals');
		await database.clearStore('news');
	}
	
	containerRecordsFans && getAppeals();
	containerRecordsNews && getNews();
};

// Fans - set new appeal
const setNewAppeal = (newName, newText, newDate) => {
	const item = document.createElement('div');
	item.classList = 'fans__container_item fadein-opacity';

	const info = document.createElement('p');
	info.classList = 'fans__container_item-info';
	info.innerHTML = newText;

	const footer = document.createElement('div');
	footer.classList = 'fans__container_item-footer';

	const date = document.createElement('span');
	date.classList = 'fans__container_item-date';
	date.innerHTML = newDate;

	const name = document.createElement('span');
	name.classList = 'fans__containe_item-name';
	name.innerHTML = newName;

	containerRecordsFans.append(item);
	item.append(info);
	item.append(footer);
	footer.append(date);
	footer.append(name);
}

// Fans - add new appeal
const addNewAppeal = (event) => {
	event.preventDefault();

	if (!fieldNewNameFans.checkValidity() || !fieldNewTextFans.checkValidity()) return 0;

	const time = new Date();
	const timeOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	};

	const newName = fieldNewNameFans.value;
	const newText = fieldNewTextFans.value;
	const newDate = time.toLocaleDateString(undefined, timeOptions);

	postAppeal(newName, newText, newDate);
	setNewAppeal(newName, newText, newDate);

	fieldNewNameFans.value = '';
	fieldNewTextFans.value = '';

	snackbarNewAppealSuccess.classList.add('show');
	setTimeout(() => snackbarNewAppealSuccess.classList.remove('show'), 3000);
};

// Fans - get appeals
const getAppeals = async () => {
	let appeals;
	containerRecordsFans.innerHTML = '';

	if (isOnline()) {
		appeals = await api().getAppeals();

	} else {
		if (useLocalStorage) {
			appeals = JSON.parse(localStorage.getItem('appeals')) || [];

		} else {
			await database.init();
			appeals = await database.getStore('appeals');
		}
	}

	appeals.forEach(item => {
		const { name, text, date } = item;
		setNewAppeal(name, text, date);
	});
}

// Fans - post appeal
const postAppeal = async (name, text, date) => {
	const newAppeal = { name, text, date };

	if (isOnline()) {
		await api().postAppeal(newAppeal);

	} else {
		if (useLocalStorage) {
			const appeals = JSON.parse(localStorage.getItem('appeals')) || [];
			appeals.push(newAppeal);
			localStorage.setItem('appeals', JSON.stringify(appeals));

		} else {
			await database.init();
			await database.addItemToStore('appeals', newAppeal);
		}
	}
}

// Admin - set new news
const setNewNews = (newImage, newTitle, newText) => {
	const item = document.createElement('a');
	item.classList = 'news__container_item fadein-opacity';
	item.href = '#';

	const image = document.createElement('div');
	image.classList = 'news__container_item-image';

	const img = document.createElement('img');
	img.src = newImage;
	img.alt = 'new';

	const info = document.createElement('div');
	info.classList = 'news__container_item-info';

	const title = document.createElement('h3');
	title.classList = 'news__container_item-title';
	title.innerHTML = newTitle;

	const description = document.createElement('p');
	description.classList = 'news__container_item-description';
	description.innerHTML = newText;

	containerRecordsNews.append(item);
	item.append(image);
	item.append(info);
	image.append(img);
	info.append(title);
	info.append(description);
}

// Admin - add new news
const addNewNews = (event) => {
	event.preventDefault();

	if (!fieldNewTitleAdmin.checkValidity() || !fieldNewTextAdmin.checkValidity()) return 0;

	const newImage = containerNewImageAdmin;
	const newTitle = fieldNewTitleAdmin.value;
	const newText = fieldNewTextAdmin.value;

	postNew(newImage, newTitle, newText);

	fieldNewImageAdmin.value = '';
	fieldNewTitleAdmin.value = '';
	fieldNewTextAdmin.value = '';
	containerNewImageAdmin.src = '';

	snackbarNewNewsSuccess.classList.add('show');
	setTimeout(() => snackbarNewNewsSuccess.classList.remove('show'), 3000);
};

// Admin - get news
const getNews = async () => {
	let news;
	containerRecordsNews.innerHTML = '';

	if (isOnline()) {
		news = await api().getNews();

	} else {
		if (useLocalStorage) {
			news = JSON.parse(localStorage.getItem('news')) || [];

		} else {
			await database.init();
			news = await database.getStore('news');
		}
	}

	news.forEach(item => {
		const { image, title, text } = item;
		setNewNews(image, title, text);
	});
}

// Admin - convert new image to base64
const getBase64Image = img => {
	const imgCanvas = document.createElement("canvas");
	const imgContext = imgCanvas.getContext("2d");

	imgCanvas.width = img.width;
	imgCanvas.height = img.height;

	imgContext.drawImage(img, 0, 0, img.width, img.height);

	const imgAsDataURL = imgCanvas.toDataURL("image/png");

	return imgAsDataURL;
}

// Admin - post new
const postNew = async (image, title, text) => {
	const newNews = { image: getBase64Image(image), title, text };

	if (isOnline()) {
		await api().postNew(newNews);

	} else {
		if (useLocalStorage) {
			const news = JSON.parse(localStorage.getItem('news')) || [];
			news.push(newNews);
			localStorage.setItem('news', JSON.stringify(news));

		} else {
			await database.init();
			await database.addItemToStore('news', newNews);
		}
	}
}

// Document deligation
const documentDeligation = (event) => {
	const current = event.target;

	// Mobile menu
	if (body.classList.contains('mobile-menu__open') && current.classList.contains('link')) {
		event.preventDefault();

		if (!current.nextElementSibling) {
			setTimeout(function () {
				window.location.replace(current.href);
			}, 700);
		}

		if (current.nextElementSibling && current.nextElementSibling.classList.contains('dropdown-list')) {
			current.nextElementSibling.classList.toggle('active');
		}
	}
};

// Fields validation success
const fieldValidationSuccess = (event) => {
	const { target } = event;

	target.setCustomValidity('');
	target.checkValidity();
};

// Fields validation failure
const fieldValidationFailure = (event) => {
	const { target } = event;

	if (target.validity.valueMissing) {
		target.setCustomValidity('This value is required');
	}

	if (target.validity.patternMismatch) {
		if (target === fieldNewNameFans) {
			target.setCustomValidity('This value must begin from latin letter and include only latin letters, numbers or symbols - _ \\ .');
		}
	}
};

// Contacts - map
let map, marker;
const mapStyles = [
	{
		"featureType": "landscape",
		"stylers": [
			{
				"hue": "#FFBB00"
			},
			{
				"saturation": 43.400000000000006
			},
			{
				"lightness": 37.599999999999994
			},
			{
				"gamma": 1
			}
		]
	},
	{
		"featureType": "road.highway",
		"stylers": [
			{
				"hue": "#FFC200"
			},
			{
				"saturation": -61.8
			},
			{
				"lightness": 45.599999999999994
			},
			{
				"gamma": 1
			}
		]
	},
	{
		"featureType": "road.arterial",
		"stylers": [
			{
				"hue": "#FF0300"
			},
			{
				"saturation": -100
			},
			{
				"lightness": 51.19999999999999
			},
			{
				"gamma": 1
			}
		]
	},
	{
		"featureType": "road.local",
		"stylers": [
			{
				"hue": "#FF0300"
			},
			{
				"saturation": -100
			},
			{
				"lightness": 52
			},
			{
				"gamma": 1
			}
		]
	},
	{
		"featureType": "water",
		"stylers": [
			{
				"hue": "#0078FF"
			},
			{
				"saturation": -13.200000000000003
			},
			{
				"lightness": 2.4000000000000057
			},
			{
				"gamma": 1
			}
		]
	},
	{
		"featureType": "poi",
		"stylers": [
			{
				"hue": "#00FF6A"
			},
			{
				"saturation": -1.0989010989011234
			},
			{
				"lightness": 11.200000000000017
			},
			{
				"gamma": 1
			}
		]
	}
];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 41.379120, lng: 2.119980 },
		zoom: 11,
		styles: mapStyles,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: true,
		streetViewControl: false,
		rotateControl: true,
		fullscreenControl: false
	});

	marker = new google.maps.Marker({
		position: { lat: 41.379120, lng: 2.119980 },
		map: map
	});
};
