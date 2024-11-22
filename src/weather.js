"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getWeather() {
    const city = document.getElementById('city');
    if (city) {
        const obj = { city: city.value, APIKEY: "74cb6038665ddcbb5ca0f618cd0d6a89" };
        getWeatherDetails(obj);
        city.value = '';
    }
}
function getWeatherDetails(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${obj.city}&appid=${obj.APIKEY}`;
        const displayDav = document.getElementById('weather_details');
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error('City Not Found');
            }
            const data = yield response.json();
            console.log(data);
            const errorDiv = document.getElementById('error');
            if (errorDiv) {
                errorDiv.classList.add("hidden");
            }
            if (displayDav) {
                if ((displayDav === null || displayDav === void 0 ? void 0 : displayDav.children.length) >= 1) {
                    displayDav.innerHTML = '';
                }
            }
            const country = document.createElement('p');
            country.textContent = "Country: " + data.sys.country;
            country.classList.add('text-xl', 'font-bold', 'mb-2', 'text-black-600');
            const city = document.createElement('p');
            city.textContent = "City : " + data.name;
            city.classList.add('text-xl', 'font-bold', 'mb-2', 'text-black-600');
            const temperature = document.createElement('p');
            temperature.classList.add('text-xl', 'font-bold', 'mb-2', 'text-black-600');
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            const humidity = document.createElement('p');
            humidity.classList.add('text-lg', 'font-medium', 'mb-2', 'text-black-600');
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            const wind = document.createElement('p');
            wind.classList.add('text-lg', 'font-medium', 'mb-2', 'text-black-600');
            wind.textContent = `Wind: ${data.wind.speed} m/s`;
            const description = document.createElement('p');
            description.classList.add('text-lg', 'italic', 'mb-2', 'text-black-600');
            description.textContent = `Sky: ${data.weather[0].description}`;
            displayDav === null || displayDav === void 0 ? void 0 : displayDav.appendChild(country);
            displayDav === null || displayDav === void 0 ? void 0 : displayDav.appendChild(city);
            displayDav === null || displayDav === void 0 ? void 0 : displayDav.appendChild(temperature);
            displayDav === null || displayDav === void 0 ? void 0 : displayDav.appendChild(humidity);
            displayDav === null || displayDav === void 0 ? void 0 : displayDav.appendChild(wind);
            displayDav === null || displayDav === void 0 ? void 0 : displayDav.appendChild(description);
        }
        catch (error) {
            const errorDiv = document.getElementById('error');
            if (errorDiv) {
                errorDiv.classList.remove("hidden");
                const msg = document.createElement('p');
                msg.textContent = "" + error;
                msg.classList.add('text-lg', 'italic', 'mb-2', 'text-red-600');
                displayDav === null || displayDav === void 0 ? void 0 : displayDav.appendChild(msg);
            }
        }
    });
}
