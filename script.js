// Recupero elementi dalla pagina HTML
const htmlElement = document.documentElement
const meteoLocation = document.querySelector('.meteo-location');
const meteoIcona = document.querySelector('.meteo-icona');
const meteoTemeperatura = document.querySelector('.meteo-temperatura');
const meteoSuggerimenti = document.querySelector('.meteo-suggerimenti');

// dichiaro array di suggerimenti
const suggestions = {
    '01d': 'Ricordati la crema solare!',
    '01n': 'Buonanotte!',
    '02d': 'Oggi il sole va e viene...',
    '02n': 'Attenti ai lupi mannari...',
    '03d': 'Luce perfetta per fare foto!',
    '03n': 'Dormi sereno :)',
    '04d': 'Che cielo grigio :(',
    '04n': 'Non si vede nemmeno la luna!',
    '09d': 'Prendi l\'ombrello',
    '09n': 'Copriti bene!',
    '10d': 'Prendi l\'ombrello',
    '10n': 'Copriti bene!',
    '11d': 'Attento ai fulmini!',
    '11n': 'I lampi accendono la notte!',
    '13d': 'Esci a fare un pupazzo di neve!',
    '13n': 'Notte perfetta per stare sotto il piumone!',
    '50d': 'Accendi i fendinebbia!',
    '50n': 'Guida con prudenza!'
};
  

// Provo a recuperare la posizione
navigator.geolocation.getCurrentPosition(on_success, on_error);

// Funzione che viene chiamata in caso di errore della geolocalizzazione
function on_error() {
    meteoLocation.innerText = ''; // pulisco messaggio 'Calcolo posizione...'
    meteoIcona.src = "images/geolocation_disabled.png"; // cambio icona
    meteoIcona.alt = "Geolocalizzazione disattivata"; // modifico messaggio alternativo
    meteoSuggerimenti.innerText = 'Attivare la geolocalizzazione'; // dò suggerimento
    
    // disattiva il loading
    htmlElement.className = '';
}

// Funzione che viene chiamata in caso di successo della geolocalizzazione
async function on_success(position) {
    // Recupero lat e long dall'oggetto position
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    // Predispongo chiamata API OpenWeatherMap
    const API_KEY = 'bd832622acc99b03e95f5648052a97cf';
    const units = 'metric';
    const lang = 'it';
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${units}&lang=${lang}`;

    // Chiamo API OpenWeatherMap
    const response = await fetch(endpoint);
    const data = await response.json();

    console.log(data);

    // Recupero dei dati dalla response
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;

    // Binding dati sulla UI
    meteoLocation.innerText = data.name;
    meteoIcona.src = `images/${icon}.png`;
    meteoIcona.alt = description;
    meteoTemeperatura.innerText = Math.floor(data.main.temp) + "°C";
    meteoSuggerimenti.innerText = suggestions[icon];

    // disattiva il loading
    htmlElement.className = '';
}