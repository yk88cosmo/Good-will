//"b242508ece89277b9f5565d1841683c9"app"&units=imperial&APPID=b242508ece89277b9f5565d1841683c9"
var weatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherQueryParams = '&units=imperial&APPID=9af9987d0f66079a5baa5b00f7f58162';
function createHTML(cityName, tempValue){
	var bgClass;
	
	var mathResult = Math.max(Math.round(tempValue-32)/1.8).toFixed(1);		//Math.max( Math.round(number * 10) / 10, 2.8 ).toFixed(1)
	
	if (mathResult >= 50){
		bgClass = 'redBg';
		document.getElementById('validMsg').innerHTML = '***************************************************************************Fair and Warm************************************************************************';
		document.getElementById('sec1').style.backgroundImage = "url(WeatherImages/FairWarm.png)";
	}
	else if (mathResult < 50 && mathResult >= 40){
		bgClass = 'orangeBg';
		document.getElementById('validMsg').innerHTML = '*******************************************************************************Fair*****************************************************************************';
		document.getElementById('sec1').style.backgroundImage = "url(WeatherImages/Fair.png)";
	}
	else if (mathResult < 40 && mathResult >= 30){
		bgClass = 'yellowBg';
		document.getElementById('validMsg').innerHTML = '***************************************************************************Partly Cloudy************************************************************************';
		document.getElementById('sec1').style.backgroundImage = "url(WeatherImages/PartCloudy.png)";
	}
	else if (mathResult < 30 && mathResult >= 20){
		bgClass = 'greenBg';
		document.getElementById('validMsg').innerHTML = '******************************************************************************Cloudy****************************************************************************';
		document.getElementById('sec1').style.backgroundImage = "url(WeatherImages/Cloudy.png)";
	}
	else if (mathResult < 20 && mathResult >= 10){
		bgClass = 'blueBg';
		document.getElementById('validMsg').innerHTML = '******************************************************************************Rainy*****************************************************************************';
		document.getElementById('sec1').style.backgroundImage = "url(WeatherImages/Rainy.png)";
	}
	else{
		bgClass = 'grayBg';
		document.getElementById('validMsg').innerHTML = '***************************************************************************Heavy rains**************************************************************************';
		document.getElementById('sec1').style.backgroundImage = "url(WeatherImages/StormyRain.png)";
	}
	var htmlString ='<div class="setBorder ' + bgClass + '">' + '<div class="weatherCity">' + cityName + '</div>' + '<div class="weatherData">' + mathResult + '°C</div>' + '</div>';
	$('#weatherResults').prepend(htmlString);
}

function Reset() {
	location.reload();
}

var searchWeather = function(city){
	var searchURL = weatherBaseURL + city + weatherQueryParams;
	$.ajax({
		url: searchURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("Problem checking with the city.");
			console.log(data.status);
			alert("Oops. Something went wrong...");
		},
		success: function(data){
			console.log("Successful");
			console.log(data);
			if (data.cod === '404'){
				alert("HTTP retrying.");
				return;
			}
			$("#query").val('');
			var theCity = data.name || '????';
			var theTemp = Math.round(data.main.temp) || 70;
			createHTML(theCity, theTemp);
		}
	});
};

$(document).ready(function(){
	console.log("Loaded!");
	$("#search").on('click', function(){
		console.log("Clicked search");
		var newSearchTerm = $("#query").val();
		console.log(newSearchTerm);
		searchWeather(newSearchTerm);
		$("#search").blur();
	});
	$('#query').on('keypress', function(e){
		if (e.which == 13){
			$("#search").trigger('click');
		}
	});
});