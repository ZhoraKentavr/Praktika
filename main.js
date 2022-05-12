var x=x0;
var y=y0;
var x0=55.790927;
var y0=49.114453;
var zoom0=18;
var objMap=new Object();
var objPlayer=new Object();
var objArray=new Object();
var cnt=0;

window.onload=initWindowOnload;
ymaps.ready(initYMaps);

function initWindowOnload(){
	console.log("Window onload: OK");
	coordinates.textContent="Текущие координаты : [" + x0 + "],[" + y0 + "]";
	let coordArray = new Array();
	objArray=coordArray;
}

//Создание карты
function initYMaps(){
	console.log("YMaps init:OK.");
	var map1=new ymaps.Map("map",{center:[x0,y0],zoom:zoom0,type: 'yandex#map'});
	objMap=map1;
	console.log("Center of the map1:["+ x0 + ","+y0+"]");
	map1.events.add('click',onClickMap);
	
	
	//Начальное местоположение
	var myGeoObject4 = new ymaps.GeoObject({
            geometry: {
                type: "LineString",
                coordinates: [
                    [x0,y0],
                    [x0,y0]
                ]
            },
            properties:{
                hintContent: "Начальное местоположение",
            }
        }, {
            draggable: false,
            strokeColor: "#0000FF",
            strokeWidth: 20
        });
		map1.geoObjects.add(myGeoObject4)
	
	
	//Панорама
	if(!ymaps.panorama.isSupported()){
		console.log("API Maps Error 1");
	}
	ymaps.panorama.locate([x0,y0]).done(
	function(panoramas){
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
	console.log('coords');
	console.log("Clicked map:coordsClick = [" + coordsClick + "]");
	player=objPlayer;
	player.moveTo([coordsClick[0],coordsClick[1]]);
}


//При перемещение по панораме
function onPanoramaChange(){
	var panorama=objPlayer.getPanorama();
	var newPos=panorama.getPosition();
	var x1=newPos[0];
	var y1=newPos[1];
	var map1=objMap;
	
	coordArray=objArray;
	coordArray.push([x1,y1]);
	console.log("перемещение");
	console.log(coordArray);
	
	//1
		 var myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "LineString",
                coordinates: [
                    [x0, y0],
                    [newPos[0],newPos[1]]
                ]
            },
            properties:{
                hintContent: "Маршрут",
            }
        }, {
            draggable: false,
            strokeColor: "#000000",
            strokeWidth: 10,
        });
		
	//2
		var myGeoObject2 = new ymaps.GeoObject({
            geometry: {
                type: "LineString",
                coordinates: [
                    [x0, y0],
                    [newPos[0],newPos[1]]
                ]
            },
            properties:{
                hintContent: "Маршрут",
            }
        }, {
            draggable: false,
            strokeColor: "#FFFFFF",
            strokeWidth: 5
        }); 
		
	//3
	    var myGeoObject3 = new ymaps.GeoObject({
            geometry: {
                type: "LineString",
                coordinates: [
                    [newPos[0],newPos[1]],
                    [newPos[0],newPos[1]]
                ]
            },
            properties:{
                hintContent: "Текущее местоположение",
            }
        }, {
            draggable: false,
            strokeColor: "#FF0000",
            strokeWidth: 20
        });


    // Добавляем линии на карту.
    map1.geoObjects.add(myGeoObject)
				   .add(myGeoObject2)
				   .add(myGeoObject3)
				   .splice(3,1,myGeoObject3);
				   
	x0=newPos[0];
	y0=newPos[1];
	
	//Счётчик маршрута (Сделал условие, что текущие координаты Больше ИЛИ Меньше предыдущих)
	if (newPos[0]>newPos[1])
	{
		cnt++;
		console.log("Шагов панорамы сделано: "+cnt);
	} else if (newPos[0]<newPos[1])
	{
		cnt++;
		console.log("Шагов панорамы сделано: "+cnt);
	}
	counter.textContent="Счётчик шагов : "+cnt;
	coordinates.textContent="Текущие координаты : [" + newPos[0] + "],[" + newPos[1] + "]";
}

//При нажатии на кнопку "Обновить"
function onClickUpdate(){
	//cnt - Счётчик, обнуляется при обновлении маршрута
	cnt=0;
	var map1=objMap;
	map1.geoObjects.removeAll();
	
		var myGeoObject4 = new ymaps.GeoObject({
            geometry: {
                type: "LineString",
                coordinates: [
                    [x0,y0],
                    [x0,y0]
                ]
            },
            properties:{
                hintContent: "Начальное местоположение",
            }
        }, {
            draggable: false,
            strokeColor: "#0000FF",
            strokeWidth: 20
        });
		map1.geoObjects.add(myGeoObject4)
		
		counter.textContent="Счётчик шагов : 0";
		
		coordArray=objArray;
		for(var i=coordArray.length;i>0;i--){
			coordArray.pop();}

}
function onClickBack(){
	coordArray=objArray;
	player=objPlayer;
	map=objMap;
	player.moveTo(coordArray[coordArray.length-2]);
	if(coordArray.length>1){
		coordArray.splice(coordArray.length-2,2);
		}
		else{
			player.moveTo([x,y]);
		}
	cnt-=2;
	console.log("кнопка");
	console.log(coordArray);
}
//Для гиперссылок на города
function kyrov(){
player=objPlayer;
map=objMap;
player.moveTo([58.602685, 49.630212]);
map.setCenter([58.602685, 49.630212]);
}

function Perm(){
player=objPlayer;
map=objMap;
player.moveTo([58.009554, 56.226651]);
map.setCenter([58.009554, 56.226651]);
}

function Izhevsk(){
player=objPlayer;
map=objMap;
player.moveTo([56.850195, 53.203126]);
map.setCenter([56.850195, 53.203126]);
}
