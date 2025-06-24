const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');

async function getPlanet(id) {
    const response = await fetch(`http://localhost:9001/api/planets/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const planet = await response.json();
    document.getElementById('planet-name').textContent = planet.name;
    return planet;
}

async function getCharacters(id) {
    const response = await fetch(`http://localhost:9001/api/characters?homeworld=${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const characters = await response.json();
    const characterList = document.getElementById('planet-characters');
    
    if (characters.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No characters found for this planet';
        li.style.fontStyle = 'italic';
        li.style.color = '#666';
        characterList.appendChild(li);
    } else {
        characters.forEach(character => {
            const li = document.createElement('li');
            li.addEventListener('click', () => {
                window.location.href = `character.html?id=${character.id}`;
            });
            li.style.cursor = 'pointer';
            li.textContent = character.name;
            characterList.appendChild(li);
        });
    }
}

async function getFilms(id) {
    const response = await fetch(`http://localhost:9001/api/films_planets?planetId=${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const films = await response.json();
    const filmList = document.getElementById('planet-films');
    const uniqueFilms = Array.from(new Set(films.map(film => film.film_id)))
        .map(film_id => films.find(film => film.film_id === film_id));
    
    if (uniqueFilms.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No films found for this planet';
        li.style.fontStyle = 'italic';
        li.style.color = '#666';
        filmList.appendChild(li);
    } else {
        const filmPromises = uniqueFilms.map(film => 
            getFilmTitle(film.film_id).then(title => {
                const li = document.createElement('li');
                li.addEventListener('click', () => {
                    window.location.href = `film.html?id=${film.film_id}`;
                });
                li.style.cursor = 'pointer';
                li.textContent = title;
                filmList.appendChild(li);
            })
        );
        await Promise.all(filmPromises);
    }
}

function getFilmTitle(film_id) {
    return fetch(`http://localhost:9001/api/films/${film_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.title)
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

async function showCharacters() {
    const button = document.getElementById('show-characters');
    const characterList = document.getElementById('planet-characters');
    
    if (button.textContent === 'Show Characters') {
        button.textContent = 'Loading...';
        button.disabled = true;
        
        if (characterList.children.length === 0) {
            try {
                await getCharacters(id);
            } catch (error) {
                console.error('Error loading characters:', error);
                const li = document.createElement('li');
                li.textContent = 'Error loading characters';
                li.style.color = 'red';
                characterList.appendChild(li);
            }
        }
        
        button.textContent = 'Hide Characters';
        button.disabled = false;
        characterList.style.display = 'block';
    } else {
        button.textContent = 'Show Characters';
        characterList.style.display = 'none';
    }
    button.classList.toggle('active');
}

async function showFilms() {
    const button = document.getElementById('show-films');
    const filmList = document.getElementById('planet-films');
    
    if (button.textContent === 'Show Films') {
        button.textContent = 'Loading...';
        button.disabled = true;
        
        if (filmList.children.length === 0) {
            try {
                await getFilms(id);
            } catch (error) {
                console.error('Error loading films:', error);
                const li = document.createElement('li');
                li.textContent = 'Error loading films';
                li.style.color = 'red';
                filmList.appendChild(li);
            }
        }
        
        button.textContent = 'Hide Films';
        button.disabled = false;
        filmList.style.display = 'block';
    } else {
        button.textContent = 'Show Films';
        filmList.style.display = 'none';
    }
    button.classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const planet = await getPlanet(id);
        
        document.getElementById('planet-characters').style.display = 'none';
        document.getElementById('planet-films').style.display = 'none';
        
        document.getElementById('show-characters').addEventListener('click', showCharacters);
        document.getElementById('show-films').addEventListener('click', showFilms);
    } catch (error) {
        console.error('Error fetching planet data:', error);
    }
});