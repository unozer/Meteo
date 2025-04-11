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
function on_success(position) {
    console.log("ok tutto apposto");
}