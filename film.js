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
        .catch(err => console.error('Error reading film: ', err))
    console.log(film)
}

async function getCharacters() {
    let endpoint = 'http://localhost:9001/api/films/' + id + '/characters';

    const characters = await fetch(endpoint)
        .then(res => {
            return res.json();
        })
        .catch(err => console.error('Error reading characters: ', err))
    
    console.log(characters);
    renderCharacters(characters);
}

function renderCharacters(characters) {
    const divs = characters.map(character => {
        const elem = document.createElement('div');
        elem.addEventListener('click', () => {
            window.location = `/character.html?id=${character.id}`
        });
        elem.textContent = character.name;
        return elem;
    })

    const charactersList = document.querySelector("#charactersList");
    charactersList.append(...divs);
}

async function getPlanets() {
    let endpoint = 'http://localhost:9001/api/films/' + id + '/planets';

    const planets = await fetch(endpoint)
        .then(res => {
            return res.json();
        })
        .catch(err => console.error('Error reading planets: ', err))
    
    console.log(planets)
    renderPlanets(planets);
}

function renderPlanets(planets) {
    const divs = planets.map(planet => {
        const elem = document.createElement('div');
        elem.addEventListener('click', () => {
            window.location = `/planet.html?id=${planet.id}`
        });
        elem.textContent = planet.name;
        return elem;
    })

    const planetsList = document.querySelector("#planetsList");
    planetsList.append(...divs);
}