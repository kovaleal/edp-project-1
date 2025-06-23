document.addEventListener('DOMContentLoaded', getFilm)
document.addEventListener('DOMContentLoaded', getCharacters)
document.addEventListener('DOMContentLoaded', getPlanets)

const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');

async function getFilm() {
    let endpoint = 'http://localhost:9001/api/films/' + id;

    const film = await fetch(endpoint)
        .then(res => {
            return res.json();
        })
        .catch(err => console.error('Error: ', err))
    console.log(film)
}

async function getCharacters() {
    let endpoint = 'http://localhost:9001/api/films/' + id + '/characters';

    const characters = await fetch(endpoint)
        .then(res => {
            return res.json();
        })
        .catch(err => console.error('Error: ', err))
    console.log(characters)
}

async function getPlanets() {
    let endpoint = 'http://localhost:9001/api/films/' + id + '/planets';

    const planets = await fetch(endpoint)
        .then(res => {
            return res.json();
        })
        .catch(err => console.error('Error: ', err))
    console.log(planets)
}