const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');

fetch(`http://localhost:9001/api/planets/${id}`)
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const planet = data;
    document.getElementById('planet-name').textContent = planet.name;
  })


fetch(`http://localhost:9001/api/characters?homeworld=${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const characters = data;
        const characterList = document.getElementById('planet-characters');
        characters.forEach(character => {
        const li = document.createElement('li');
        li.textContent = character.name;
        characterList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

fetch(`http://localhost:9001/api/films_planets?planetId=${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const films = data;
        const filmList = document.getElementById('planet-films');
        const uniqueFilms = Array.from(new Set(films.map(film => film.film_id)))
            .map(film_id => films.find(film => film.film_id === film_id));
        uniqueFilms.forEach(film => {
            getFilmTitle(film.film_id).then(title => {
                const li = document.createElement('li');
                li.textContent = title;
                filmList.appendChild(li);
            });
        });
    })

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