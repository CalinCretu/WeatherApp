const search = document.querySelector('.search-box');
const input = document.querySelector('.input');
const weatherImage = document.querySelector('.image-card img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity .text span');
const wind = document.querySelector('.wind .text span');

search.addEventListener('click', () => {
  const APIkey = '2d7208c724a4e8c9e1031a3a659092b0';
  const city = input.value;

  if (city === '') return;

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
      const lat = json[0].lat;
      const lon = json[0].lon;

      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`)
        .then(response => response.json())
        .then(weatherData => {
          switch (weatherData.weather[0].main) {
            case 'Clear':
              weatherImage.src = 'image/Sunny.jpeg';
              break;
            case 'Rain':
              weatherImage.src = 'image/Rain.jpeg';
              break;
            case 'Snow':
              weatherImage.src = 'image/Snow.jpeg';
              break;
            case 'Clouds':
              weatherImage.src = 'image/Cloud.jpeg';
              break;
            case 'Mist':
            case 'Haze':
              weatherImage.src = 'image/Mist.jpeg';
              break;
            default:
              weatherImage.src = 'image/Cloud.jpeg';
          }

          temperature.innerHTML = `${parseInt(weatherData.main.temp)}<span>°C</span>`;
          description.textContent = weatherData.weather[0].description;
          humidity.textContent = `${weatherData.main.humidity}%`;
          wind.textContent = `${weatherData.wind.speed} Km/h`;
        })
        .catch(error => {
          console.error('Errore nella richiesta dati meteorologici:', error);
        });
    })
    .catch(error => {
      console.error('Errore nella richiesta API di geocoding:', error);
    });
});