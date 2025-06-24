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
    if (film.title !== undefined) {
        document.title = `Star Wars: ${film.title}`;
        titleH1 = document.querySelector('h1#title');
        titleH1.textContent = `Star Wars: ${film.title}`;
        renderFilms(film);
    }
}

function renderFilms(film) {
    const release = document.querySelector("#release");
    release.textContent = film.release_date;
    const director = document.querySelector("#director");
    director.textContent = film.director;
    const episode = document.querySelector("#episode");
    episode.textContent = film.episode_id;
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

    const charactersList = document.querySelector("#charList");
    //const br = document.createElement('br');
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