document.addEventListener("DOMContentLoaded", function () {

	const newImage = document.querySelector('.admin__new-news_form-image');
	const containerImage = document.querySelector('.admin__new-news_container-image');

	newImage && newImage.addEventListener('change', function (event) {
		const file = event.target.files[0];

		if (file && file['type'].split('/')[0] !== 'image') {
			containerImage.src = '';
			return 0;
		}
			
		containerImage.src = URL.createObjectURL(file)
	});

});

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