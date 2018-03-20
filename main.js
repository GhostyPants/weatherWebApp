// openweathermap api key: ada0a156b990123df254d41a556a7a77
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const lat = 18.451029;
const lon = -69.658889;
let currentDay = new Date().getDay();
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=ada0a156b990123df254d41a556a7a77`;
const currentDayWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=ada0a156b990123df254d41a556a7a77`;

function fetchApi(url, f) {
    fetch(url)
     .then(r => r.json())
     .then(f)
     .catch(er => console.log(`Error => ${er}`));
}

fetchApi(currentDayWeatherUrl, data => {
    // console.log(data);
    document.querySelector('#cityName').innerText = `${data.name}, ${data.sys.country}`;

    document.querySelector('#currentDayName').innerText = `${days[currentDay]}`;

    document.querySelector("#currentTemperature").innerText = `${Math.floor(data.main.temp)}`;

    document.querySelector('#currentState').innerText = `${data.weather[0].description}`;

    document.querySelectorAll('.nextDay').forEach((day) => {
             if (currentDay + 1 > 6) {
                currentDay = 0;
                console.log(currentDay)
                day.firstElementChild.innerText = days[currentDay].substr(0, 3);
            } else {
                day.firstElementChild.innerText = days[currentDay + 1].substr(0, 3);
            }
            currentDay++;
    }, this);
})

fetchApi(forecastUrl, data => {
    let iterator = 3;

    console.log(data)
    document.querySelectorAll('.nextDay').forEach((day) => {
        day.children.item(2).innerText = data.list[iterator].main.temp;

        if (data.list[iterator].weather[0].main === 'Rain') {
            day.children.item(1).src = 'png/rain.png';
        } else if (data.list[iterator].weather[0].main === 'Clear') {
            day.children.item(1).src = 'png/Sun.png';
        } else if (data.list[iterator].weather[0].main === 'Clouds') {
            day.children.item(1).src = 'png/Cloudy.png';
        }

        iterator += 8;
    });
    
})