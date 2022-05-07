var x0=55.790927;
var y0=49.114453;
var x1=55.791;
var y1=49.115;
var zoom0=18;
var objMap=new Object();
var objPlayer=new Object();

window.onload=initWindowOnload;
ymaps.ready(initYMaps);

function initWindowOnload(){
	console.log("Window onload: OK");
}

function initYMaps(){
	console.log("YMaps init:OK.");
	var map1=new ymaps.Map("map",{center:[x0,y0],zoom:zoom0,type: 'yandex#map'});
	objMap=map1;
	console.log("Center of the map1:["+ x0 + ","+y0+"]");
	map1.events.add('click',onClickMap);
	  var myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "LineString",
                coordinates: [
                    [x0, y0],
                    [x1, y1]
                ]
            },
            properties:{
                hintContent: "Маршрут",
            }
        }, {
            draggable: false,
            strokeColor: "#FFFF00",
            strokeWidth: 10
        });


    // Добавляем линии на карту.
    map1.geoObjects.add(myGeoObject)
	
	
	//Панорама
	if(!ymaps.panorama.isSupported()){
		console.log("API Maps Error 1");
	}
	ymaps.panorama.locate([x0,y0]).done(
	function(panoramas){
		console.log("panoramas:"+panoramas);
		console.log("panoramas[0]:"+panoramas[0]);
		console.log("panoramas length :"+ panoramas.length);
		console.log("panoramas coord :"+ panoramas);
		if(panoramas.length>0){
			var player=new ymaps.panorama.Player(
				'player',panoramas[0],{direction:[140,15]}
				);
		}
		objPlayer=player;
		player.events.add('panoramachange', onPanoramaChange);

	});
}



function onClickMap(e){
	var coordsClick=e.get('coords');
	console.log("Clicked map:coordsClick = [" + coordsClick + "]");
	var placemarkClick = new ymaps.Placemark(coordsClick,{balloonContentHeader: 'User Clicked',balloonContentBody:'LON:'+coordsClick[1]+'<br> LAT : ' + coordsClick[0],balloonContentFooter: 'Kazan City',hintContent:'LON:' +coordsClick[1]+'<br> LAT: '+coordsClick[0]});
	objMap.geoObjects.add(placemarkClick);
	placemarkClick.balloon.open();
	player.moveTo(coordsClick);
}

function onPanoramaChange(){
	var panorama=objPlayer.getPanorama();
	var newPos=panorama.getPosition();
	console.log(newPos);
}