const searchingButton = document.querySelector("#searching-button");
const apiCords = document.querySelector(".api-cords");
const problemSpan = document.querySelector(".problemSpan");
searchingButton.addEventListener("click", () => {
    const searchingPlace = document.querySelector("#search-city").value;

    if (searchingPlace=="") {
        problemSpan.textContent="Nie podano miejscowości";
    }
    else {
        getApiData(searchingPlace);
    }

    const divek = document.querySelector(".box");
    divek.classList.add("animation-box")

   
})

//API
const getApiData = (searchingPlace) => {
    const state = null;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchingPlace},${state}&units=metric&appid=16a2314e91b166c8c3c5b3c33539f22b`;
    fetch(url)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            searchWeather(searchingPlace,data);
            setImage(data)
            problemSpan.textContent="";
            console.log(data);
        })
        .catch(error => {
            problemSpan.textContent="Nie znaleziono";
            //  problemSpan.textContent = error);
        })
}


const searchWeather = (searchingPlace,data) => {
    
    document.querySelector(".api-temp").classList.add("animation-api");
    document.querySelector(".api-feels-like").classList.add("animation-api");
    document.querySelector(".api-humidity").classList.add("animation-api");
    document.querySelector(".api-coords").classList.add("animation-api");
    document.querySelector(".left").classList.add("animation-api1");
    document.querySelector(".middle").classList.add("animation-api");
    document.querySelector(".bottom").style.display="inline-flex";
    setTimeout(()=>{
      document.querySelector(".middle").style.opacity="1";
    },700)
    
    document.querySelector(".api-temp").innerHTML = "Temperatura: <b>"+(data.main.temp).toFixed(0)+'&deg;<span style="margin-top: -10px;">C</b></span>';
    document.querySelector(".api-feels-like").innerHTML = "Odczuwalna: <b>"+(data.main.feels_like).toFixed(0)+'&deg;<span style="margin-top: -10px;">C</b></span>';
    document.querySelector(".api-humidity").innerHTML = "Wilgotność: <b>"+(data.main.humidity).toFixed(0)+'%</b>';
    
    const lat1 = data.coord.lat>0 ? 1 : -1;
    const lat2 = data.coord.lat>0 ? "&deg; N" : "&deg; S";
    
    const lon1 = data.coord.lon>0 ? 1 : -1;
    const lon2 = data.coord.lon>0 ? "&deg; E" : "&deg; W";

    document.querySelector(".api-coords").innerHTML = "Koordynaty: <b>"+(data.coord.lat)*lat1+lat2+"   "+(data.coord.lon)*lon1+lon2+"</b>";
    
    // document.querySelector(".left").innerHTML="<img src='sun.svg'>";
}

setImage = (data) => {
    if(data.weather[0].main === "Clear"){
      document.querySelector(".left").innerHTML = "<img src='img/sun.svg'>";
    }
  
    if(data.weather[0].main === "Snow"){
      document.querySelector(".left").innerHTML = "<img src='img/snow.svg'>";
    }
  
    if(data.weather[0].main === "Thunderstorm"){
      document.querySelector(".left").innerHTML = "<img src='img/thunderstorm.svg'>";
    }
  
    if(data.weather[0].main === "Drizzle" || 
      data.weather[0].main === "Mist" ||
      data.weather[0].main === "Smoke" ||
      data.weather[0].main === "Haze" ||
      data.weather[0].main === "Dust" ||
      data.weather[0].main === "Fog" ||
      data.weather[0].main === "Sand" ||
      data.weather[0].main === "Dust" ||
      data.weather[0].main === "Ash" ||
      data.weather[0].main === "Squall" ||
      data.weather[0].main === "Tornado"){
        document.querySelector(".left").innerHTML = "<img src='img/drizzle.svg'>";
    }
  
    if(data.weather[0].main === "Clouds"){
      if(data.weather[0].description === "few clouds")
        document.querySelector(".left").innerHTML = " <img src='img/few_clouds.svg'>";
      else
        document.querySelector(".left").innerHTML = " <img src='img/overcast_clouds.svg'>";
    }
  
    if(data.weather[0].main === "Rain"){
        querySelector(".left").innerHTML = "<img src='img/light_rain.svg'>";
    }    
  }