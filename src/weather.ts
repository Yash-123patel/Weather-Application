interface Weather {
    city: string;
    APIKEY: string;
}
 
function getWeather(): void {
    const city = document.getElementById('city') as HTMLInputElement | null;
    if (city) {
        const obj: Weather = { city: city.value, APIKEY: "74cb6038665ddcbb5ca0f618cd0d6a89" };
        getWeatherDetails(obj);
        city.value='';
    }
}
 
async function getWeatherDetails(obj: Weather):Promise<void> {
    const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${obj.city}&appid=${obj.APIKEY}`;
    const displayDav = document.getElementById('weather_details')as HTMLElement|null;
 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City Not Found');
        }
        const data = await response.json();
        console.log(data);
       
        const errorDiv= document.getElementById('error') as HTMLElement|null;
        if(errorDiv){
            errorDiv.classList.add("hidden");
        }
       
       if(displayDav){
        if(displayDav?.children.length>=1){
            displayDav.innerHTML='';
        }
       }
     
 
        const country=document.createElement('p');
        country.textContent="Country: "+data.sys.country
        country.classList.add('text-xl', 'font-bold', 'mb-2','text-black-600');
 
        const city=document.createElement('p');
        city.textContent="City : "+data.name;
        city.classList.add('text-xl', 'font-bold', 'mb-2','text-black-600');
 
        const temperature = document.createElement('p');
        temperature.classList.add('text-xl', 'font-bold', 'mb-2','text-black-600');
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
 
        const humidity = document.createElement('p');
        humidity.classList.add('text-lg', 'font-medium', 'mb-2','text-black-600');
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
 
        const wind: any = document.createElement('p');
        wind.classList.add('text-lg', 'font-medium', 'mb-2','text-black-600');
        wind.textContent = `Wind: ${data.wind.speed} m/s`;
 
        const description: any = document.createElement('p');
        description.classList.add('text-lg', 'italic', 'mb-2', 'text-black-600');
        description.textContent = `Sky: ${data.weather[0].description}`;
 
 
   
        displayDav?.appendChild(country);
        displayDav?.appendChild(city);
        displayDav?.appendChild(temperature);
        displayDav?.appendChild(humidity);
        displayDav?.appendChild(wind);
        displayDav?.appendChild(description);
 
    } catch (error) {
       const errorDiv= document.getElementById('error');
        if(errorDiv){
 
            errorDiv.classList.remove("hidden");
            const msg=document.createElement('p');
            msg.textContent=""+error;
            msg.classList.add('text-lg', 'italic', 'mb-2','text-red-600');
            displayDav?.appendChild(msg);
    }
        }
       
}