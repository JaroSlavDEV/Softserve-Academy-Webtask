const body = document.querySelector('body');
const fields = document.querySelectorAll('input, textarea');

const burgerButton = document.querySelector('.burger-menu');

const newImageAdmin = document.querySelector('.admin__new-news_form-image');
const containerImageAdmin = document.querySelector('.admin__new-news_container-image');

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

document.addEventListener("DOMContentLoaded", function () {
	// Mobile - toggle menu
	burgerButton.addEventListener('click', toggleMobileMenu);

	// Admin - change image
	newImageAdmin && newImageAdmin.addEventListener('change', changeImageAdmin);

	// Fans - add new appeal
	formAddNewAppealFans && formAddNewAppealFans.addEventListener('submit', addNewAppeal);

	// Admin - add new new
	formAddNewNewsAdmin && formAddNewNewsAdmin.addEventListener('submit', addNewNew)

	// Document deligation
	document.addEventListener('click', documentDeligation);
	
	// Fields validation
	fields.forEach(i => i.addEventListener('input', fieldValidationSuccess))
	fields.forEach(i => i.addEventListener('invalid', fieldValidationFailure));
	
	//Test add new new
	//testAddNewNew();
});

// Admin - change image
const changeImageAdmin = (event) => {
	const file = event.target.files[0];

	if (file && file['type'].split('/')[0] !== 'image') {
		containerImageAdmin.src = '';
		return 0;
	}

	containerImageAdmin.src = URL.createObjectURL(file);
};

// Mobile - toggle menu
const toggleMobileMenu = () => {
	body.classList.toggle('mobile-menu__open');
};

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

	fieldNewNameFans.value = '';
	fieldNewTextFans.value = '';

	snackbarNewAppealSuccess.classList.add('show');
	setTimeout(() => snackbarNewAppealSuccess.classList.remove('show'), 3000);
};

// Admin - add new new
const addNewNew = (event) => {
	event.preventDefault();
	
	if (!fieldNewTitleAdmin.checkValidity() || !fieldNewTextAdmin.checkValidity()) return 0;

	const newImage = fieldNewImageAdmin.value;
	const newTitle = fieldNewTitleAdmin.value;
	const newText = fieldNewTextAdmin.value;

	// const item = document.createElement('a');
	// item.classList = 'news__container_item fadein-opacity';
	// item.href = '#';

	// const image = document.createElement('div');
	// image.classList = 'news__container_item-image';

	// const img = document.createElement('img');
	// img.src = 'https://www.fcbarcelona.com/photo-resources/2020/01/02/4925ad07-1133-4531-bd9c-9713c3dc8bc9/mini__R5I2582.JPG?width=640&height=400';
	// img.alt = 'new';

	// const info = document.createElement('div');
	// info.classList = 'news__container_item-info';

	// const title = document.createElement('h3');
	// title.classList = 'news__container_item-title';
	// title.innerHTML = newTitle;

	// const description = document.createElement('p');
	// description.classList = 'news__container_item-description';
	// description.innerHTML = newText;

	// containerRecordsNews.append(item);
	// item.append(image);
	// item.append(info);
	// image.append(img);
	// info.append(title);
	// info.append(description);

	fieldNewImageAdmin.value = '';
	fieldNewTitleAdmin.value = '';
	fieldNewTextAdmin.value = '';
	containerNewImageAdmin.src = '';

	snackbarNewNewsSuccess.classList.add('show');
	setTimeout(() => snackbarNewNewsSuccess.classList.remove('show'), 3000);
};

const testAddNewNew = () => {
	const item = document.createElement('a');
	item.classList = 'news__container_item fadein-opacity';
	item.href = '#';

	const image = document.createElement('div');
	image.classList = 'news__container_item-image';

	const img = document.createElement('img');
	img.src = 'https://www.fcbarcelona.com/photo-resources/2020/01/02/4925ad07-1133-4531-bd9c-9713c3dc8bc9/mini__R5I2582.JPG?width=640&height=400';
	img.alt = 'new';

	const info = document.createElement('div');
	info.classList = 'news__container_item-info';

	const title = document.createElement('h3');
	title.classList = 'news__container_item-title';
	title.innerHTML = 'Double session on Monday';

	const description = document.createElement('p');
	description.classList = 'news__container_item-description';
	description.innerHTML = `Morning and afternoon workouts at the 
		Ciutat Esportiva Joan Gamper included the return of Neto and 
		the presence of several Barça B players`;

	containerRecordsNews.append(item);
	item.append(image);
	item.append(info);
	image.append(img);
	info.append(title);
	info.append(description);
};

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

	if(target.validity.valueMissing) {
		target.setCustomValidity('This value is required');
	}

	if(target.validity.patternMismatch) {
		if(target === fieldNewNameFans) {
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
