// Recupero elementi dalla pagina HTML
const htmlElement = document.documentElement
const meteoLocation = document.querySelector('.meteo-location');
const meteoIcona = document.querySelector('.meteo-icona');
const meteoTemeperatura = document.querySelector('.meteo-temperatura');
const meteoSuggerimenti = document.querySelector('.meteo-suggerimenti');

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
}