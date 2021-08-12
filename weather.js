const date = new Date();
const hour = Number(date.getHours().toString());

if(Number(date.getHours().toString()) < 12){
    document.getElementById("evemor").textContent = "Morning";
    document.getElementById("tense").textContent = "is";
    document.getElementById("ense").textContent = "is";
}
else if (Number(date.getHours().toString()) > 12 && Number(date.getHours().toString()) < 18){
    document.getElementById("evemor").textContent = "Afternoon";
    document.getElementById("tense").textContent = "was";
    document.getElementById("ense").textContent = "is";
}
else if(Number(date.getHours().toString()) > 17 && Number(date.getHours().toString()) < 21){
    document.getElementById("evemor").textContent = "Evening";
    document.getElementById("tense").textContent = "was";
    document.getElementById("ense").textContent = "is";
}
else if(Number(date.getHours().toString()) >= 21){
    document.getElementById("evemor").textContent = "Evening";
    document.getElementById("tense").textContent = "was";
    document.getElementById("ense").textContent = "was";
}
else{
    document.getElementById("time").textContent = "Hello, ";
}

const timex = document.getElementById("timex");
timex.textContent+= date.getDate().toString()+"/"+date.getMonth().toString()+"/"+date.getFullYear().toString()+" "+date.getHours().toString()+":"+date.getMinutes().toString();
const api = "API_KEY GOES HERE";//API KEY HERE!!!!!!

fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api}&q=London&days=1&aqi=no&alerts=yes`).then((response) => {
    return response.json();})
  .then((data) => {
      functioning(data);
    document.getElementById("snr").textContent = data.forecast.forecastday[0].astro.sunrise;
document.getElementById("snt").textContent = data.forecast.forecastday[0].astro.sunset;
//console.log(data.forecast.forecastday[0].day);
});  
 
var link = document.createElement("link"); 
link.rel = "shortcut icon";
link.type="image/jpg";

document.getElementsByTagName("head")[0].appendChild(link);
function functioning(data){
    const desh2 = document.getElementById("desh2");
    description(desh2, data)
    document.getElementById("wind").textContent = data.forecast.forecastday[0].day.maxwind_mph+" ";
    document.getElementById("tofw").textContent = data.forecast.forecastday[0].day.condition.text;
    document.getElementById("temp").textContent = data.forecast.forecastday[0].day.avgtemp_c.toString()+"°C / " +data.forecast.forecastday[0].day.avgtemp_f.toString()+"°F";
    link.href = "https://"+data.forecast.forecastday[0].day.condition.icon;
  }    

var arr = [];
var g;
function description(parent,info){
    for (var i = 0; i<6; i++){
        g = document.createElement("H3");
        g.id = i;
        arr.push(g)}
    arr.forEach((element)=> document.getElementById("des").appendChild(element));
    document.getElementById("0").textContent = "Chance of rain: "+ info.forecast.forecastday[0].day.daily_chance_of_rain +"%" ;
    document.getElementById("1").textContent = "Chance of snow: "+ info.forecast.forecastday[0].day.daily_chance_of_snow +"%" ;
    document.getElementById("2").textContent = "Highest Temperature: "+ info.forecast.forecastday[0].day.maxtemp_c +"°C / " +info.forecast.forecastday[0].day.maxtemp_f.toString()+"°F";
    document.getElementById("3").textContent = "Lowest Temperature: "+ info.forecast.forecastday[0].day.mintemp_c +"°C / " +info.forecast.forecastday[0].day.mintemp_f.toString()+"°F";
    document.getElementById("4").textContent = "Total rainfall: "+ info.forecast.forecastday[0].day.totalprecip_in +"in / "+ info.forecast.forecastday[0].day.totalprecip_mm +"mm";
    document.getElementById("5").textContent = "UV index: "+ info.forecast.forecastday[0].day.uv;
    document.getElementById("6").textContent = "Current Temperature: "+ info.forecast.forecastday[0].hour[hour].temp_c +"°C / " +info.forecast.forecastday[0].hour[hour].temp_f+"°F";

}

var csslink = document.createElement("link");     
csslink.rel = "stylesheet";
csslink.type="text/css";
if(hour >= 20 || hour == 0 ||hour ==1 ||hour==2||hour==3||hour==4||hour==5){
    csslink.href = "nightweather.css";
}
else{
    csslink.href = "morningweather.css";
}    
document.getElementsByTagName("head")[0].appendChild(csslink);
